/// <reference types="vite/client" />

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
