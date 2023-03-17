const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';

const getOrders = async (req, res) => {
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

    const userRef = firestore.collection('users').doc(userId);
    const ordersRef = userRef.collection('orders');
    const ordersSnapshot = await ordersRef.get();
    if (ordersSnapshot.empty) {
      throw new Error('주문 내역이 없습니다.');
    }
    const ordersList = ordersSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: ordersList,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = getOrders;
