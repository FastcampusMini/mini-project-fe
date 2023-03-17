const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';
const TOKEN_EXPIRATION = '24h';

const getUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ code: 401, error: 'Authorization header가 존재하지 않습니다.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const userSnapshot = await firestore.collection('users').doc(userId).get();
    const userData = userSnapshot.data();

    if (!userData) {
      return res.status(404).json({ code: 404, error: 'User not found' });
    }

    return res
      .status(200)
      .json({ code: 200, message: SUCCESS_MSG, data: userData });
  } catch (error) {
    return res
      .status(401)
      .json({ code: 401, error: 'Invalid or expired token' });
  }
};

module.exports = getUser;
