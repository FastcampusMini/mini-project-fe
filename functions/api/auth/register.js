const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';
const TOKEN_EXPIRATION = '24h';

const register = async (req, res) => {
  console.log('/signup 테스트');
  const userData = {
    email: 'default@default.com',
    password: 'default',
    name: 'Anonymous',
    phone: '00000000000',
    salary: 3000,
    job: '개발자',
    availableAmount: 50000,
    birth: '2000-10-10',
  };
  const { email, password, name, phone, salary, job, birth } = req.body;

  if (!email || !password || !salary) {
    return res.status(400).json({
      code: 400,
      message: '필수 요청 바디 속성이 누락되었습니다.',
    });
  }

  Object.assign(
    userData,
    email && { email: email.trim() },
    password && { password: password.trim() },
    name && { name: name.trim() },
    phone && { phone: phone.trim() },
    salary !== undefined && { salary: Number(salary) },
    job && { job: job.trim() },
    birth && { birth: birth.trim() }
  );
  try {
    console.log('userRecord 시작');
    const userRecord = await admin.auth().createUser({ email, password });

    console.log('userRecord 끝');
    const uid = userRecord.uid;
    console.log('uid', uid);
    Object.assign(userData, { userId: uid });

    await firestore.collection('users').doc(uid).set(userData);

    const token = jwt.sign({ uid }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: { user: userData, accessToken: token },
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: '요청에 실패하였습니다.',
      error: error.message,
    });
  }
};

module.exports = register;
