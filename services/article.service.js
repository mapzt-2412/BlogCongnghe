import http, { instanceNoSpiner } from "./http-common";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_VLOG,
} from "../libs/commonConstants";

class ArticleService {
  getTrends() {
    return http.get(
      `/articles?sortBy=score&sortOrder=DESC&limit=${DEFAULT_PAGE_SIZE}`
    );
  }
  toggleLike(data, token) {
    return instanceNoSpiner.post("/users/like", JSON.stringify(data), {
      headers: { Authorization: "Bearer " + token },
    });
  }
  toggleDisliked(data, token) {
    return instanceNoSpiner.post("/users/dislike", JSON.stringify(data), {
      headers: { Authorization: "Bearer " + token },
    });
  }
  toggleLikeCmt(data, token) {
    return instanceNoSpiner.post("/users/like-comment", JSON.stringify(data), {
      headers: { Authorization: "Bearer " + token },
    });
  }
  toggleDislikeCmt(data, token) {
    return instanceNoSpiner.post(
      "/users/dislike-comment",
      JSON.stringify(data),
      { headers: { Authorization: "Bearer " + token } }
    );
  }
  getNewfeed(page, token) {
    return http.get(
      `/articles/new-feed?page=${page}&limit=${DEFAULT_PAGE_SIZE}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }
  getHotComment() {
    return http.get(`/articles/hot-comment`);
  }
  gettags() {
    return http.get(`/tags`);
  }
  getVlog() {
    return http.get(
      `/articles?topic=Vlog&sortBy=score&sortOrder=DESC&limit=${DEFAULT_PAGE_SIZE_VLOG}`
    );
  }
  getRecommend(page, token) {
    if(!token){
      return http.get(
        `/articles?sortBy=score&sortOrder=DESC&limit=${DEFAULT_PAGE_SIZE}`
      ); 
    }
    return http.get(
      `/users/my-recommend-articles?page=${page}&limit=${DEFAULT_PAGE_SIZE}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }
  getArticlesByTopic(name, param) {
    let params = "";
    for (let key in param) {
      params = key + "=" + param[key] + "&";
    }
    return http.get(
      `/articles?topic=${name}&limit=${DEFAULT_PAGE_SIZE}&${params}`
    );
  }
  getArticlesByTag(name, param) {
    let params = "";
    for (let key in param) {
      params = key + "=" + param[key] + "&";
    }
    return http.get(
      `/articles?tag=${name}&limit=${DEFAULT_PAGE_SIZE}&${params}`
    );
  }
}
export default new ArticleService();
