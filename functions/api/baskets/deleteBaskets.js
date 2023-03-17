const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';
const TOKEN_EXPIRATION = '24h';

const deleteBaskets = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: 'Authorization 헤더가 존재하지 않습니다.',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: 'token 이 존재하지 않습니다.',
    });
  }
  const productId = req.body.productId;
  if (!productId) {
    return res.status(400).json({
      code: 400,
      message: 'productId 가 없습니다.',
    });
  }

  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const userRef = firestore.collection('users').doc(userId);
    const basketsProductRef = userRef.collection('baskets').doc(productId);

    await basketsProductRef.delete();

    const snapshot = await userRef.collection('baskets').get();
    const baskets = snapshot.docs.map((doc) => doc.data());
    return res.status(200).json({
      code: 200,
      message: `${productId} 상품이 baskets 에서 삭제됐습니다.`,
      data: baskets,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = deleteBaskets;
