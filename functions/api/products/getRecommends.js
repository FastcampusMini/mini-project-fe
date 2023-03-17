const admin = require('firebase-admin');

const firestore = admin.firestore();
const SUCCESS_MSG = '요청에 성공하였습니다.';

const getRecommends = async (req, res) => {
  try {
    const snapshot = await firestore.collection('products').get();
    const recommends = [];
    snapshot.forEach((doc) => {
      if (doc.data().recommend) {
        recommends.push(doc.data());
      }
    });

    const pageNumber = parseInt(req.query.page) || 1;
    const size = 10;
    const startIndex = (pageNumber - 1) * size;

    const content = recommends.slice(startIndex, startIndex + size);

    const totalElements = recommends.length;
    const totalPages = Math.ceil(totalElements / size);
    if (totalPages < pageNumber) {
      return res.status(404).json({
        code: 404,
        message: `최대 페이지 ${totalPages} 입니다.(요청 page = ${pageNumber})`,
      });
    }
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

module.exports = getRecommends;
