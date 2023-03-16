const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');
const getUser = require('./auth/getUser');
const deleteUser = require('./auth/deleteUser');
const patchUser = require('./auth/patchUser');

const getRecommends = require('./products/getRecommends');
const getProducts = require('./products/getProducts');
const getDetails = require('./products/getDetails');
const getSearch = require('./products/getSearch');
const postProducts = require('./products/postProducts');

module.exports = {
  // auth
  register,
  login,
  logout,
  getUser,
  deleteUser,
  patchUser,
  // products
  getRecommends,
  getProducts,
  getDetails,
  getSearch,
  postProducts,
  // wishlists & baskets
};
