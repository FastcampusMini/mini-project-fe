const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';

const deleteOrders = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({
      code: 400,
      mesage: 'orderId와 함께 요청해주세요',
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
    const userRef = firestore.collection('users').doc(userId);
    const orderRef = userRef.collection('orders').doc(orderId);
    const snapshot = await orderRef.get();

    if (!snapshot.exists) {
      throw new Error(`<${orderId}>의 주문 정보를 찾을 수 없습니다.`);
    }

    const totalPrice = snapshot.data().totalPrice;

    // availableAmount 업데이트
    await firestore.runTransaction(async (transaction) => {
      const userSnapshot = await transaction.get(userRef);
      if (!userSnapshot.exists) {
        throw new Error('유저가 존재하지 않습니다.');
      }

      const userData = userSnapshot.data();
      const availableAmount = userData.availableAmount;

      transaction.update(userRef, {
        availableAmount: totalPrice + availableAmount,
      });
      transaction.delete(orderRef);
    });

    return res.status(200).json({
      code: 200,
      message: `[totalPrice: ${totalPrice}, orderId: ${orderId}] 주문이 삭제되었습니다.`,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = deleteOrders;
