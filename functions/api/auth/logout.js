const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'my-secret-key';

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ code: 401, error: '요청헤더에 Authorization가 없습니다.' });
  }

  // 일반적으로 서버는 JWT 토큰을 직접 만료시키지 않습니다.
  const token = authHeader.split(' ')[1];
  const payload = jwt.verify(token, SECRET_KEY);
  console.log(payload);

  try {
    jwt.verify(token, SECRET_KEY); // 토큰이 유효한지 확인
    return res
      .status(200)
      .json({ code: 200, message: '로그아웃에 성공했습니다.' });
  } catch (error) {
    return res
      .status(401)
      .json({ code: 401, error: '토큰이 유효하지 않습니다.' });
  }
};
module.exports = logout;
