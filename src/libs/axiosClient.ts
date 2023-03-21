import store from '@/store/store';
import axios from 'axios';

const BASE_URL =
  'https://asia-northeast3-loantech-7603b.cloudfunctions.net/api';

const HEADERS = {
  'Content-Type': 'application/json',
};

// 에러핸들링은 react-query 훅으로 합니다.
class Axios {
  axiosClient;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
      headers: HEADERS,
    });
  }
  //////////////////////// 회원정보
  /** 로그인 api OK */
  async postLogin({ email, password }: ILoginInput) {
    const result = await this.axiosClient
      .post('/login', {
        email,
        password,
      })
      .then((res) => res.data);
    console.log(`postLogin${result.message}>>`, result.data);
    return result;
  }

  // 유저 정보수정 OK
  async patchUserEdit(
    accessToken: string,
    payload: IUserEditPayload
  ): Promise<IPatchUserEditReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (!payload) throw Error(`[에러]payload = "${payload}" 입니다`);
    const result = await this.axiosClient
      .patch('/user', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`patchUserEdit>>${result?.message}`, result);
    return result;
  }
  // 유저 정보 가져오기 OK
  async getUser(accessToken: string): Promise<IGetUserReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);

    const result = await this.axiosClient
      .get('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`getUser ${result.message}`, result);
    return result.data;
  }

  // 토큰 재발급 OK
  async postRefresh(refreshToken: string) {
    if (!refreshToken) throw Error(`[에러]refreshToken="${refreshToken}" `);
    const result = await this.axiosClient
      .post(
        '/refresh',
        {
          refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then((response) => response.data);
    // console.log(`postRefresh >>`, result);
    return result;
  }

  /** 로그아웃 api OK*/
  async postLogout(accessToken: string, refreshToken: string) {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    const result = await this.axiosClient.post(
      '/logout',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(`postLogout >>`, result.data);
    return result;
  }

  // 회원가입 api OK
  async postRegister(payload: IRegisterInput): Promise<IPostRegisterReturn> {
    const result = await this.axiosClient
      .post('/register', payload)
      .then((response) => response.data);
    console.log(`postRegister >>`, result);
    return result;
  }

  /** 회원탈퇴 api OK */
  async deleteUser(accessToken: string, password: string) {
    const result = await this.axiosClient
      .delete('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          password,
        },
      })
      .then((response) => response.data);
    console.log(`deleteUser >>`, result);
    return result;
  }

  ////////////// 상품관련
  // 전체 상품 가져오기 OK
  async getProducts(
    accessToken: string,
    page: number | string
  ): Promise<IGetProductsReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (Number(page) < 1) return;
    const result = await this.axiosClient
      .get('/products', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page,
        },
      })
      .then((response) => response.data);

    // console.log(`getProducts:"${result.message}"`, result);
    return result.data;
  }
  // 추천 상품 가져오기 OK
  async getRecommendsProducts(
    accessToken: string,
    page: number | string
  ): Promise<IGetProductsReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (Number(page) < 1) return;
    const result = await this.axiosClient
      .get('/products/recommends', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page,
        },
      })
      .then((response) => response.data);

    console.log(`getRecommendsProducts(${result.message}) ${result.data}`);
    return result.data;
  }
  // 상품 상세정보 가져오기 OK
  async getProductsDetails(product_id: string | number): Promise<IProduct> {
    const result = await this.axiosClient
      .get('/products/details', {
        params: {
          product_id,
        },
      })
      .then((response) => response.data);

    console.log(`getProductsDetails`, result);
    return result.data;
  }
  // 상품구매 OK
  async postOrders(
    accessToken: string,
    products_id_list: any[]
  ): Promise<void> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    console.log(products_id_list);
    const result = await this.axiosClient
      .post(
        '/orders',
        { products_id_list },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data);
    console.log(`postOrders >>`, result.message);
  }
  // 구매목록 조회 OK
  async getOrders(accessToken: string): Promise<IGetOrders> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);

    const result = await this.axiosClient
      .get('/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    if (result.code === 200) {
      console.log(`getOrders >>`, result.data);
    } else {
      console.log(result);
    }

    return result.data;
  }
  // 구매 취소 OK
  async deleteOrders(
    accessToken: string,
    orderId: number | string
  ): Promise<void> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (!orderId) throw Error(`[에러]orderId = "${orderId}" 입니다`);

    const result = await this.axiosClient
      .delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`deleteOrders/orderId: ${orderId}`, result.message);
  }

  // 검색
  async getSearch(
    accessToken,
    {
      searchTarget,
      searchKeyword,
      sortTarget,
      sortDirection,
      isChecked,
      page,
    }: ISearchInput
  ): Promise<ISearchedData> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (Number(page) < 1) return;

    const result = await this.axiosClient
      .get('/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          searchTarget,
          searchKeyword,
          sortTarget,
          sortDirection,
          isChecked,
          page,
        },
      })
      .then((response) => response.data);
    console.log(`getSearch:"${result.message}"`, result.data);
    return result.data;
  }

  //////// 위시리스트 & 장바구니
  // 위시리스트에 추가한 목록 가져오기 OK
  async getWishlists(accessToken: string): Promise<IWishlistsData> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);

    const result = await this.axiosClient
      .get('/wishlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`getWishlists:"${result.message}"`, result);
    return result.data;
  }
  // 장바구니에 추가한 목록 가져오기 OK
  async getBaskets(accessToken: string): Promise<IBasketsData> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);

    const result = await this.axiosClient
      .get('/baskets', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`getBaskets:"${result.message}"`, result);
    return result.data;
  }

  // 위시리스트에 상품 추가 OK
  async postWishlists(
    accessToken: string,
    productId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!productId) throw Error(`[에러]productId = "${productId}"`);

    const result = await this.axiosClient
      .post(
        '/wishlists',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data);
    console.log(`postWishlists:"${result.message}"`, result);
  }
  // 장바구니에 상품 추가 OK
  async postBaskets(
    accessToken: string,
    productId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!productId) throw Error(`[에러]productId = "${productId}"`);

    const result = await this.axiosClient
      .post(
        '/baskets',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data);
    console.log(`postBaskets:`, result);
  }

  // 위시리스트에 상품 삭제 OK
  async deleteWishlists(
    accessToken: string,
    wishlistId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!wishlistId) throw Error(`[에러]wishlistId = "${wishlistId}"`);

    const result = await this.axiosClient
      .delete(`/wishlists/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`deleteWishlists:"${result.message}"`, result);
  }
  // 장바구니에서 상품 삭제 OK
  async deleteBaskets(
    accessToken: string,
    basketId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!basketId) throw Error(`[에러]basketId = "${basketId}"`);

    const result = await this.axiosClient
      .delete(`/baskets/${basketId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`deleteBaskets:"${result.message}"`, result);
  }
}

export const ax = new Axios();
