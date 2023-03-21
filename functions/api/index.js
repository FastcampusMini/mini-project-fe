const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');
const getUser = require('./auth/getUser');
const deleteUser = require('./auth/deleteUser');
const patchUser = require('./auth/patchUser');
const postRefresh = require('./auth/postRefresh');

const getRecommends = require('./products/getRecommends');
const getProducts = require('./products/getProducts');
const getDetails = require('./products/getDetails');
const getSearch = require('./products/getSearch');
const postProducts = require('./products/postProducts');

const deleteWishlists = require('./wishlists/deleteWishlists');
const deleteBaskets = require('./baskets/deleteBaskets');
const getWishlists = require('./wishlists/getWishlists');
const getBaskets = require('./baskets/getBaskets');
const postWishlists = require('./wishlists/postWishlists');
const postBaskets = require('./baskets/postBaskets');

const deleteOrders = require('./orders/deleteOrders');
const getOrders = require('./orders/getOrders');
const postOrders = require('./orders/postOrders');

module.exports = {
  // auth
  register,
  login,
  logout,
  getUser,
  deleteUser,
  patchUser,
  postRefresh,
  // products
  getRecommends,
  getProducts,
  getDetails,
  getSearch,
  postProducts,
  // wishlists & baskets
  deleteWishlists,
  deleteBaskets,
  getWishlists,
  getBaskets,
  postWishlists,
  postBaskets,
  // orders
  deleteOrders,
  getOrders,
  postOrders,
};
