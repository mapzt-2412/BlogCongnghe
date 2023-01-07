import http, { instanceNoSpiner } from "./http-common";

class UsersService {
  sendFeedback(data, token) {
    return http.post("/users/feedback", JSON.stringify(data), {
      headers: { Authorization: "Bearer " + token },
    });
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
  getLevel(token) {
    return http.get("/users/my-level", {
      headers: { Authorization: "Bearer " + token },
    });
  }
}
export default new UsersService();
