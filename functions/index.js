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

// 주문하기
app.post('/orders', api.postOrders);
// 주문 정보 가져오기
app.get('/orders', api.getOrders);
// 주문 삭제하기
app.delete('/orders', api.deleteOrders);

// wishlists 추가하기
app.post('/wishlists', api.postWishlists);
// baskets 추가하기
app.post('/baskets', api.postBaskets);
// wishlists 가져오기
app.get('/wishlists', api.getWishlists);
// baskets 가져오기
app.get('/baskets', api.getBaskets);
// wishilists 삭제하기
app.delete('/wishlists', api.deleteWishlists);
// baskets 삭제하기
app.delete('/baskets', api.deleteBaskets);

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
