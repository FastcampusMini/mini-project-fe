const functions = require('firebase-functions');
const admin = require('firebase-admin'); // 내 fb 관리자
admin.initializeApp();

const express = require('express');
const api = require('./api');
const app = express();

const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';

app.use(express.json()); // JSON body를 파싱하기 위한 middleware

// wishlists 추가하기
app.post('/wishlists', async (req, res) => {
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
    const productRef = firestore.collection('products').doc(productId);
    const wishlistRef = userRef.collection('wishlists').doc(productId);

    const productSnapshot = await productRef.get();
    if (!productSnapshot.exists) {
      res
        .status(404)
        .json({ code: 404, message: `${productId} 상품이 존재하지 않습니다.` });
      return;
    }

    const productData = productSnapshot.data();
    await wishlistRef.set(productData);

    res.status(200).json({
      code: 200,
      message: '상품이 wishlist에 추가되었습니다.',
      data: productData,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// baskets 추가하기
app.post('/baskets', async (req, res) => {
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
    return res.code(400).json({
      code: 400,
      message: 'productId 가 없습니다.',
    });
  }

  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const userRef = firestore.collection('users').doc(userId);
    const productRef = firestore.collection('products').doc(productId);
    const baseketsRef = userRef.collection('baskets').doc(productId);

    const productSnapshot = await productRef.get();
    if (!productSnapshot.exists) {
      res
        .status(404)
        .json({ code: 404, message: `${productId} 상품이 존재하지 않습니다.` });
      return;
    }

    const productData = productSnapshot.data();
    await baseketsRef.set(productData);

    res.status(200).json({
      code: 200,
      message: '상품이 장바구니에 추가되었습니다.',
      data: productData,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// wishlists 가져오기
app.get('/wishlists', async (req, res) => {
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
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const userRef = firestore.collection('users').doc(userId);
    const wishlistsRef = userRef.collection('wishlists');
    const snapshot = await wishlistsRef.get();

    const wishlists = snapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: wishlists,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// baskets 가져오기
app.get('/baskets', async (req, res) => {
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
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const userRef = firestore.collection('users').doc(userId);
    const basketsRef = userRef.collection('baskets');
    const snapshot = await basketsRef.get();

    const baskets = snapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: baskets,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// wishilists 삭제하기
app.delete('/wishlists', async (req, res) => {
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
    const wishlistProductRef = userRef.collection('wishlists').doc(productId);
    await wishlistProductRef.delete();

    const snapshot = await userRef.collection('wishlists').get();
    const wishlists = snapshot.docs.map((doc) => doc.data());
    res.status(200).json({
      code: 200,
      message: `${productId} 상품이 wishlists 에서 삭제됐습니다.`,
      data: wishlists,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// baskets 삭제하기
app.delete('/baskets', async (req, res) => {
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
    res.status(200).json({
      code: 200,
      message: `${productId} 상품이 baskets 에서 삭제됐습니다.`,
      data: baskets,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
});

// 추천 상품 가져오기(토큰x)
app.get('/products/recommends', api.getRecommends);
// 상품 상세정보 가져오기(토큰x)
app.get('/products/details', api.getDetails);
// 전체 상품 가져오기(토큰x)
app.get('/products', api.getProducts);
// 검색하기(토큰x, 상품명만 해당)
app.get('/search', api.getSearch);
// 무작위 상품 추가 API(토큰x)
app.post('/products', api.postProducts);

// 회원가입 API
app.post('/register', api.register);
// 로그인 API
app.post('/login', api.login);
// 로그아웃 API
app.post('/logout', api.logout);
// 개인정보 확인 API
app.get('/user', api.getUser);
// 회원탈퇴 API
app.delete('/user', api.deleteUser);
// 회원정보 수정
app.patch('/user', api.patchUser);

exports.api = functions.region('asia-northeast3').https.onRequest(app);
