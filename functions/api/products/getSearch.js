const admin = require('firebase-admin');

const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';

const getSearch = async (req, res) => {
  const searchKeyword = req.query.searchKeyword;

  if (!searchKeyword || searchKeyword.trim() === '') {
    return res.status(400).json({
      code: 400,
      message: '검색 키워드가 유효하지 않습니다.',
    });
  }

  const productsRef = firestore.collection('products');
  const query = productsRef;
  const snapshot = await query.get();

  const results = [];
  snapshot.forEach((doc) => {
    const docData = doc.data();
    if (docData.name.search(searchKeyword) > 0) {
      results.push(docData);
    }
  });

  res.status(200).json({
    code: 200,
    message: SUCCESS_MSG,
    data: results,
  });
};

module.exports = getSearch;
