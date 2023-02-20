import store from "@/store/store";
import axios from "axios";

const BASE_URL = "http://52.78.32.230:8080";
export const token = {
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODAxMDc5LCJleHAiOjE2NzY4MDI4NzksImVtYWlsIjoiaXNhYWNjIn0.MV2ui0xaJ0df_OBeBs0yvhZYDDQPJPrftivbLNJ5he8",
};

const modifyPayload = (payload: IUserEditPayload): IUserEditPayload => {
  const _payload = {};
  payload.newPassword;
  return payload;
};
const HEADERS = {
  "Content-Type": "application/json",
};
// const HEADERS_withToken = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token.accessToken}`,
// };

// 에러핸들링은 react-query 훅으로 합니다.
class Axios {
  axiosClient;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
      headers: HEADERS,
    });
  }

  async postLogin({ email, password }) {
    const result = await this.axiosClient
      .post("/login", {
        email,
        password,
      })
      .then((res) => res.data);

    console.log(result.message);
    token.accessToken = result.data;
    console.log("업데이트 accessToken", token.accessToken);
    return result.data;
  }
  async getProducts(accessToken: string) {
    if (!accessToken) throw Error(`[에러]accessToken = ${accessToken} 입니다`);
    const result = await this.axiosClient
      .get("/api/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          // page: 1,
        },
      })
      .then((response) => response.data);

    console.log(`getProducts:"${result.message}" ${accessToken}`);
    return result.data;
  }

  // 유저 정보수정
  async patchUserEdit(accessToken: string, payload: IUserEditPayload) {
    if (!accessToken) throw Error(`[에러]accessToken = ${accessToken} 입니다`);
    console.log("payload >>", payload);
    const _payload = modifyPayload(payload);
    const result = await this.axiosClient
      .patch("/api/user", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(result);
    return result;
  }
  async getUser(accessToken: string) {
    if (!accessToken) throw Error(`[에러]accessToken = ${accessToken} 입니다`);

    const result = await this.axiosClient
      .get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);

    console.log(`getUser ${result.message}`);
    return result.data;
  }
}

export const ax = new Axios();
