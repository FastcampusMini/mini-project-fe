const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
// 헤더에 있는 토큰을 그대로 되돌려주는 코드입니다.
const postRefresh = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: '헤더가 존재하지 않습니다.',
    });
  }
  const token = authHeader.split(' ')[1];
  res.status(200).json({
    code: 200,
    message: 'Refresh 토큰을 통한 Access Token 생성이 완료되었습니다',
    data: {
      accessToken: token,
      refreshToken: token,
    },
  });
};

module.exports = postRefresh;
