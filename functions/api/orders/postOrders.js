const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';

function generateId(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const postOrders = async (req, res) => {
  const { products_id_list } = req.body;
  if (!Array.isArray(products_id_list) || products_id_list.length === 0) {
    return res.status(400).json({
      code: 400,
      message: '유효한 products_id_list가 아닙니다.',
    });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      code: 400,
      message: 'header 가 없음',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({
      code: 400,
      message: 'token 없음',
    });
  }

  try {
    const { userId } = jwt.verify(token, SECRET_KEY);

    let totalPrice = 0;
    const purchasedProductList = [];

    for (const productId of products_id_list) {
      const productRef = firestore.collection('products').doc(productId);
      const productDoc = await productRef.get();
      if (!productDoc.exists) {
        throw new Error(`${productId} 상품이 존재하지 않습니다.`);
      }

      const productData = productDoc.data();
      totalPrice += Number(productData.price);

      purchasedProductList.push({
        purchasedProductId: productId,
        purchasedProductPrice: productData.price,
        purchasedProductBrand: productData.brand,
        purchasedProductLogo: productData.logo,
        purchasedProductName: productData.name,
        purchasedProductRate: productData.rate,
        purchasedProductDetail: productData.detail,
        originalProductId: productData.productId,
      });
    }

    // 주문 유효성 검사
    const userRef = firestore.collection('users').doc(userId);

    await firestore.runTransaction(async (transaction) => {
      const userSnapshot = await transaction.get(userRef);
      if (!userSnapshot.exists) {
        throw new Error('유저가 존재하지 않습니다.');
      }

      const userData = userSnapshot.data();
      const availableAmount = userData.availableAmount;
      if (!availableAmount) {
        throw new Error(
          `availableAmount가 존재하지 않습니다.<${availableAmount}>`
        );
      }
      if (totalPrice > availableAmount) {
        throw new Error('한도 초과입니다.');
      }

      // availableAmount 업데이트
      transaction.update(userRef, {
        availableAmount: availableAmount - totalPrice,
      });
    });

    const orderId = generateId(25);

    const orderData = {
      purchasedProductList,
      purchaseDate: new Date().toISOString(),
      orderId,
      totalPrice,
    };

    // DB에 주문 업데이트
    const orderRef = firestore
      .collection(`users/${userId}/orders`)
      .doc(orderId);
    await orderRef.set(orderData);

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: orderData,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = postOrders;
