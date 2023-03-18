const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const firestore = admin.firestore();
const SECRET_KEY = 'my-secret-key';
const SUCCESS_MSG = '요청에 성공하였습니다.';
// 회원정보 수정
const patchUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: '헤더가 존재하지 않습니다.',
    });
  }
  const token = authHeader.split(' ')[1];
  const { oldPassword, newPassword, phone, salary, job } = req.body;
  if (!oldPassword) {
    return res.status(400).json({
      code: 400,
      message: '비밀번호를 입력하세요.',
    });
  }
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);

    const userRef = firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res
        .status(404)
        .json({ code: 404, error: '유저를 찾을 수 없습니다.' });
    }
    const userData = userSnapshot.data();
    if (userData.password !== oldPassword) {
      return res.status(400).json({
        code: 400,
        message: '기존 비밀번호와 일치하지 않습니다.',
      });
    }

    const updateData = {};

    if (newPassword) updateData.password = newPassword.trim();
    if (phone) updateData.phone = phone.trim();
    if (salary)
      updateData.salary = Number(salary) < 3000 ? 3000 : Number(salary);
    if (job) updateData.job = job.trim();

    await userRef.update(updateData);

    const updatedUserData = (await userRef.get()).data();

    return res.status(200).json({
      code: 200,
      message: SUCCESS_MSG,
      data: updatedUserData,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};
module.exports = patchUser;
