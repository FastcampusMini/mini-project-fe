interface IProduct {
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: string;
  rate: number;
  basketId?: string;
  recommend: boolean;
}

interface IUserEditPayload {
  oldPassword: string;
  newPassword: string;
  phone: string;
  salary: number;
  job: string;
}

interface IData {
  code: number;
  message: string;
  data: DaumData[];
}

interface DaumData {
  wishlistId?: string;
  basketId?: string;
  productId: string;
  brand: string;
  logo: string;
  name: string;
  price: number;
  detail: string;
  rate: number;
}

interface IProductId {
  productId: string;
}

interface IBasketId {
  basketId: string;
}

interface IWishListId {
  wishlistId: string;
}

interface IProductsId {
  products_id_list: string[];
}

interface IOrderId {
  orderId: string;
}

interface IOrderData {
  code: number;
  message: string;
  data: DaumOrder[];
}

interface DaumOrder {
  orderId: string;
  purchaseDate: number[];
  purchasedProductList: PurchasedProductList[];
}

interface PurchasedProductList {
  purchasedProductId: string;
  purchasedProductPrice: number;
  purchasedProductBrand: string;
  purchasedProductLogo: string;
  purchasedProductName: string;
  purchasedProductRate: number;
  purchasedProductDetail: string;
  originalProductId: string;
}

interface ILoginInput {
  email: string;
  password: string;
}
interface IToken {
  accessToken: string;
  refreshToken: string;
}
interface IPostLoginReturn {
  code: number;
  message: string;
  data: IToken | null;
}

interface IRegisterInput {
  birth?: string;
  email: string;
  job?: string;
  name?: string;
  password: string;
  phone?: string;
  salary: number;
}

interface IPostRegisterReturn {
  code: number;
  message: string;
  data: string;
}

interface ISearchData {
  searchTarget?: string;
  searchKeyword?: string | number;
  sortTarget?: string;
  sortDirection?: string;
  isChecked?: boolean;
}
