import axios from "axios";

const BASE_URL = "http://52.78.32.230:8080";

class Axios {
  axiosClient;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
    });
  }
  async postLogin() {
    const result = await this.axiosClient
      .post("/login")
      .then((res) => res.data);
    console.log(result);
    return result;
  }
  async getArticles() {
    const result = await this.axiosClient
      .get("/articles")
      .then((res) => res.data);

    if (!result.success) console.log(result.message);
    return result.data.articles;
  }
  async postArticle(newArticle) {
    const result = await this.axiosClient
      .post("/articles", newArticle, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

    if (!result.success) console.log(result.message);

    return result.data;
  }

  async patchArticlesLike(articleId) {
    const result = await this.axiosClient
      .patch(`/articles/${articleId}/like`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
    if (!result.success) console.log(result.message);
    return result;
  }

  async getComments(articleId?) {
    const result = await this.axiosClient
      .get(`/comments/${articleId}`)
      .then((res) => res.data);

    if (!result.success) console.log(result.message);
    return result.data.comments;
  }
  async postComments(newComment) {
    const _result = await this.axiosClient
      .post("/comments", newComment, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

    if (!_result.success) console.log(_result.message);

    return _result;
  }
  async patchCommentsLike(commentId) {
    const _result = await this.axiosClient
      .patch(`/comments/${commentId}/like`)
      .then((res) => res.data);
    if (!_result.success) console.log(_result.message);
    return _result;
  }
}

export const ax = new Axios();
