const admin = require('firebase-admin');

const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';

const getProducts = async (req, res) => {
  try {
    const snapshot = await firestore.collection('products').get();

    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = getProducts;
