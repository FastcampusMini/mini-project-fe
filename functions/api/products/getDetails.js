const admin = require('firebase-admin');

const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';

const getDetails = async (req, res) => {
  const productId = req.query.product_id;
  if (!productId) {
    return res.status(400).json({
      code: 400,
      message: '쿼리 파라미터(product_id)가 없습니다.',
    });
  }
  console.log(productId);

  try {
    const snapshot = await firestore
      .collection('products')
      .doc(productId)
      .get();

    if (snapshot.empty) {
      return res.json(404).json({
        code: 404,
        message: '해당 상품이 존재하지 않습니다.',
      });
    }

    const data = snapshot.data();

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = getDetails;
