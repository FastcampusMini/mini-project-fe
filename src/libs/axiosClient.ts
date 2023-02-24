import store from '@/store/store';
import axios from 'axios';

const BASE_URL = 'http://43.200.194.5:8080';

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
  // 로그인 요청
  async postLogin({ email, password }: ILoginInput): Promise<IToken> {
    const result = await this.axiosClient
      .post('/login', {
        email,
        password,
      })
      .then((res) => res.data);
    console.log(`postLogin${result.message}>>`, result.data);
    return result.data;
  }

  // 유저 정보수정
  async patchUserEdit(
    accessToken: string,
    payload: IUserEditPayload
  ): Promise<IPatchUserEditReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (!payload) throw Error(`[에러]payload = "${payload}" 입니다`);
    const result = await this.axiosClient
      .patch('/api/user', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`patchUserEdit>>${result?.message}`, result);
    return result;
  }
  // 유저 정보 가져오기
  async getUser(accessToken: string): Promise<IGetUserReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);

    const result = await this.axiosClient
      .get('/api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`getUser ${result.mesage}`, result);
    return result.data;
  }

  // Refresh token
  async postRefresh(refreshToken: string): Promise<IPostRefreshReturn> {
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
    console.log(`postRefresh >>`, result);
    return result.data;
  }

  // Logout
  async postLogout(accessToken: string): Promise<void> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    const result = await this.axiosClient
      .post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => response.data);
    console.log(`postLogout >>`, result);
  }

  // 회원가입하기
  async postRegister(payload: IRegisterInput): Promise<IPostRegisterReturn> {
    const result = await this.axiosClient
      .post('/register', payload)
      .then((response) => response.data);
    console.log(`postRegister >>`, result);
    return result;
  }
  // 회원탈퇴하기
  async deleteUser(
    accessToken: string,
    { email, password }: ILoginInput
  ): Promise<IDeleteUserReturn> {
    const result = await this.axiosClient
      .delete('/api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          email,
          password,
        },
      })
      .then((response) => response.data);
    console.log(`deleteUser >>`, result);
    return result.data;
  }
  ////////////// 상품관련
  // 전체 상품 가져오기
  async getProducts(
    accessToken: string,
    page: number | string
  ): Promise<IGetProductsReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (Number(page) < 1) return;
    const result = await this.axiosClient
      .get('/api/products', {
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
  // 추천 상품 가져오기
  async getRecommendsProducts(
    accessToken: string,
    page: number | string
  ): Promise<IGetProductsReturn> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (Number(page) < 1) return;
    const result = await this.axiosClient
      .get('/api/products/recommends', {
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
  // 상품 상세정보 가져오기
  async getProductsDetails(products_id: string | number): Promise<IProduct> {
    const result = await this.axiosClient
      .get('/api/products/details', {
        params: {
          products_id,
        },
      })
      .then((response) => response.data);

    console.log(`getProductsDetails`, result);
    return result.data;
  }
  // 상품구매
  async postOrders(
    accessToken: string,
    products_id_list: any[]
  ): Promise<void> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);

    const result = await this.axiosClient
      .post('/api/orders', products_id_list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`postOrders >>`, result.message);
  }
  // 구매목록 조회
  async getOrders(accessToken: string): Promise<IGetOrders> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);

    const result = await this.axiosClient
      .get('/api/orders', {
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
  // 구매 취소
  async deleteOrders(
    accessToken: string,
    orderId: number | string
  ): Promise<void> {
    if (!accessToken)
      throw Error(`[에러]accessToken = "${accessToken}" 입니다`);
    if (!orderId) throw Error(`[에러]orderId = "${orderId}" 입니다`);
    const result = await this.axiosClient
      .delete('/api/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          orderId,
        },
      })
      .then((response) => response.data);

    console.log(`deleteOrders/orderId: ${orderId}`, result.message);
  }

  // 검색
  async getSearch(accessToken, { name, searchTarget, searchKeyword, sortTarget, sortDirection, isChecked, page }: ISearchInput): Promise<ISearchedData> {
    // if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (Number(page) < 1) return;

    const result = await this.axiosClient
      .get('/search', {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
        params: {
          // name,
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
  // 위시리스트에 추가한 목록 가져오기
  async getWishlists(accessToken: string): Promise<IWishlistsData> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);

    const result = await this.axiosClient
      .get('/api/wishlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`getWishlists:"${result.message}"`, result);
    return result.data;
  }
  // 장바구니에 추가한 목록 가져오기
  async getBaskets(accessToken: string): Promise<IBasketsData> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);

    const result = await this.axiosClient
      .get('/api/baskets', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
    console.log(`getBaskets:"${result.message}"`, result);
    return result.data;
  }

  // 위시리스트에 상품 추가
  async postWishlists(
    accessToken: string,
    productId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!productId) throw Error(`[에러]productId = "${productId}"`);

    const result = await this.axiosClient
      .post(
        '/api/wishlists',
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
  // 장바구니에 상품 추가
  async postBaskets(
    accessToken: string,
    productId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!productId) throw Error(`[에러]productId = "${productId}"`);

    const result = await this.axiosClient
      .post(
        '/api/baskets',
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

  // 위시리스트에 상품 삭제
  async deleteWishlists(
    accessToken: string,
    wishlistId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!wishlistId) throw Error(`[에러]wishlistId = "${wishlistId}"`);

    const result = await this.axiosClient
      .delete('/api/wishlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          wishlistId,
        },
      })
      .then((response) => response.data);
    console.log(`deleteWishlists:"${result.message}"`, result);
  }
  // 장바구니에서 상품 삭제
  async deleteBaskets(
    accessToken: string,
    basketId: number | string
  ): Promise<void> {
    if (!accessToken) throw Error(`[에러]accessToken = "${accessToken}"`);
    if (!basketId) throw Error(`[에러]basketId = "${basketId}"`);

    const result = await this.axiosClient
      .delete('/api/baskets', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          basketId,
        },
      })
      .then((response) => response.data);
    console.log(`deleteBaskets:"${result.message}"`, result);
  }
}

export const ax = new Axios();