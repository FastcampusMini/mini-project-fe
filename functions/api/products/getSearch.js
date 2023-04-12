const admin = require('firebase-admin');

const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';
// 쿼리: searchKeyword, page,
const getSearch = async (req, res) => {
  try {
    const { searchKeyword, searchTarget, sortDirection = 'ASC' } = req.query;

    const target = searchTarget;
    // 검색어 없을때 핸들링
    if (!searchKeyword || searchKeyword.trim() === '') {
      return res.status(400).json({
        code: 400,
        message: '검색 키워드가 유효하지 않습니다.',
      });
    }

    const pageNumber = parseInt(req.query.page) || 1;
    const size = 10;
    const startIndex = (pageNumber - 1) * size;

    const productsRef = firestore.collection('products');
    const snapshot = await productsRef.get();
    const results = [];
    
    if (target === '') {
      snapshot.forEach((doc) => {
        const docData = doc.data();
        if (
          docData['name'].search(searchKeyword) >= 0 ||
          docData['brand'].search(searchKeyword) >= 0
        ) {
          results.push(docData);
        }
      });
    } else if (target === 'price') {
      snapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.price <= Number(searchKeyword)) {
          results.push(docData);
        }
      });
    } else {
      snapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData[target].search(searchKeyword) >= 0) {
          results.push(docData);
        }
      });
    }

    const sortASC = sortDirection === 'ASC';

    results.sort((a, b) => {
      if (a.name.includes(searchKeyword) && !b.name.includes(searchKeyword)) {
        return sortASC ? -1 : 1;
      }
      if (!a.name.includes(searchKeyword) && b.name.includes(searchKeyword)) {
        return sortASC ? 1 : -1;
      }
      return 0;
    });

    const totalElements = results.length;
    const totalPages = Math.ceil(totalElements / size);
    if (totalPages < pageNumber) {
      return res.status(404).json({
        code: 404,
        message: `최대 페이지 ${totalPages} 입니다.(요청 page = ${pageNumber})`,
      });
    }
    const content = results.slice(startIndex, startIndex + size);

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: {
        content,
        totalPages,
        totalElements,
        pageNumber,
        size,
      },
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

module.exports = getSearch;
