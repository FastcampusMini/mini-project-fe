const admin = require('firebase-admin');
const generateRandomProduct = require('../../utils');
const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';

const postProducts = async (req, res) => {
  let number = 1;
  try {
    for (let i = 0; i < number; i++) {
      const productData = generateRandomProduct();
      await firestore
        .collection('products')
        .doc(productData.productId)
        .set(productData);
    }

    return res.status(200).json({
      code: 200,
      message: `${number}개의 상품 정보가 성공적으로 저장되었습니다.`,
      // data: productData,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = postProducts;
