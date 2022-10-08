import http from './http-common';

class PropertiesService {
    login(data) {
        return http.post("/auth/login", JSON.stringify(data))
    }
    register(data){
        return http.post("/auth/sign-up", JSON.stringify(data))
    }
    getProfile(token){
        console.log(token)
        return http.get("/users/info", {headers: {'Authorization': "Bearer " + token}})
    }
    loginWithGoogle(data){
        return http.post("/auth/google", JSON.stringify(data))
    }
    getTopics(){
        return http.get("/topics")
    }
    getTags(){
        return http.get("/tags")
    }
    getArticlesByTopic(name){
        return http.get(`/articles?topic=${name}`)
    }
    createVideo(data, token){
        return http.post("/articles/media", {headers: {'Authorization': "Bearer " + token}}, JSON.stringify(data))
    }
    createArticle(data,token){
        return http.post("/articles/create-article", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    getArticles(){
        return http.get("/articles")
    }
    getArticleById(id){
        return http.get(`/articles/${id}`)
    }
}
export default new PropertiesService();