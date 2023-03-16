const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';

const deleteUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      message: 'email 혹은 password 가 없습니다.',
    });
  }

  try {
    const { userId } = jwt.verify(token, SECRET_KEY);

    await admin.auth().deleteUser(userId);
    await firestore.collection('users').doc(userId).delete();

    return res.status(200).json({
      code: 200,
      message: `${userId} 계정이 성공적으로 삭제됐습니다.`,
    });
  } catch (error) {
    return res.status(400).json({ code: 400, error: error.message });
  }
};
module.exports = deleteUser;
