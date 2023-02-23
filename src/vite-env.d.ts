/// <reference types="vite/client" />
interface IUserInfo {
  availableAmount: number;
  birth: string;
  email: string;
  job: string;
  name: string;
  phone: string;
  salary: number;
}
interface purchasedProduct {
  purchasedProductId: number;
  purchasedProductPrice: number;
  purchasedProductBrand: string;
  purchasedProductLogo: string;
  purchasedProductName: string;
  purchasedProductRate: number;
  purchasedProductDetail: string;
  originalProductId: number;
}
// getOrder api 의 result.data
type IGetOrders = {
  orderId: number;
  purchaseDate: number[];
  purchasedProductList: purchasedProduct[];
}[];

// getSearch 의 인자중 하나
interface ISearchInput {
  name: string | number;
  page?: string | number;
}

// 검색결과 데이터
interface ISearchedData {
  content: {
    price: number;
    brand: string;
    logo: string;
    name: string;
    rate: number;
    detail: string;
    productId: number;
  }[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  size: number;
}

// wishlists 데이터

type IWishlistsData = {
  wishlistId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  price: number;
  detail: string;
  rate: number;
}[];

type IBasketsData = {
  basketId: number;
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: number;
  rate: number;
}[];

// 유저정보수정 리턴 데이터
interface IPatchUserEditReturn {
  code: number;
  message: string;
  data: {
    oldPassword: string;
    newPassword: string;
    phone: string;
    salary: number;
    job: string;
  };
}

// getUser 리턴
interface IGetUserReturn {
  email: string;
  password: string;
  name: string;
  birth: string;
  phone: string;
  salary: number;
  job: string;
  availableAmount: number;
}

// postRefresh 리턴
interface IPostRefreshReturn {
  accessToken: string;
  refreshToken: string;
}

// deleteUser 리턴
interface IDeleteUserReturn {
  memberId: number;
  email: string;
  password: string;
  name: string;
  birth: string;
  phone: string;
  salary: number;
  job: string;
  deleteCheck: string;
  created_date: number[];
  updated_date: number[];
}

// getProducts 리턴
interface IGetProductsReturn {
  content: {
    price: number;
    brand: string;
    logo: string;
    name: string;
    rate: number;
    detail: string;
    productId: number;
  }[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  size: number;
}
