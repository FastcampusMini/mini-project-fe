const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';
const TOKEN_EXPIRATION = '24h';

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: 'email 혹은 password 가 없습니다.',
      data: undefined,
    });
  }

  try {
    const { uid } = await admin.auth().getUserByEmail(email);
    const userSnapshot = await firestore.collection('users').doc(uid).get();
    const userData = userSnapshot.data();
    if (userData.password !== password)
      return res.status(400).json({ code: 400, message: '비밀번호 불일치' });
    if (!userData) {
      return res.status(404).json({
        code: 404,
        message: '존재하지 않는 회원입니다.',
      });
    }
    const token = jwt.sign({ userId: uid }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: {
        user: userData,
        accessToken: token,
        refreshToken: token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};
module.exports = login;
