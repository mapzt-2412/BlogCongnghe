import http from './http-common';

class PropertiesService {
    login(data) {
        return http.get("/", JSON.stringify(data))
    }
    register(data){
        return http.post("/auth/sign-up", JSON.stringify(data))
    }
    getProfile(token){
        return http.get("/users/info", {headers: {'Authorization': "Bearer " + token}})
    }
    getUserInfo(data, token){
        return http.get(`/users/${data}/info`, {headers: {'Authorization': "Bearer " + token}})
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
    getArticleByUser(token){
        return http.get("/users/my-articles", {headers: {'Authorization': "Bearer " + token}})
    }
    getArticlesByTopic(name){
        return http.get(`/articles?topic=${name}`)
    }
    get3ArticlesByTopic(name){
        return http.get(`/articles?topic=${name}&limit=3`)
    }
    getDraftByUser(token){
        return http.get("/drafts", {headers: {'Authorization': "Bearer " + token}})
    }
    getStory(token){
        return http.get("/articles/story",{headers: {'Authorization': "Bearer " + token}})
    }
    createVideo(data, token){
        return http.post("/articles/media", {headers: {'Authorization': "Bearer " + token}}, JSON.stringify(data))
    }
    createArticle(data,token){
        return http.post("/articles/create-article", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    createDraft(data,token){
        return http.post("/drafts/create-draft", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    updateArticle(data,token){
        return http.patch("/articles/update-article", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    updateDraft(data,token){
        return http.put("/drafts/update-draft", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    deleteArticle(data,token){
        return http.delete("/articles/delete-article", {data:JSON.stringify(data) , headers: {'Authorization': "Bearer " + token}})
    }
    deleteDraft(data,token){
        return http.delete("/drafts/delete-draft", {data:JSON.stringify(data) , headers: {'Authorization': "Bearer " + token}})
    }
    getArticles(){
        return http.get("/articles")
    }
    getArticleById(id, token){
        if(token){
            return http.get(`/articles/${id}`, {headers: {'Authorization': "Bearer " + token}})
        }
        return http.get(`/articles/${id}`)
        
    }
    getDraftById(id, token){
        if(token){
            return http.get(`/drafts/${id}`, {headers: {'Authorization': "Bearer " + token}})
        }
        return http.get(`/drafts/${id}`)
        
    }
    likeArticle(data, token){
        return http.post(`/users/interactive`, JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}} )
    }
    commentArticle(data, token){
        return http.post(`/users/comment`, JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}} )
    }
    getComment(id){
        return http.get(`/articles/${id}/comment`)
    }
    getFollowed(token){
        return http.get(`/users/followed`, {headers: {'Authorization': "Bearer " + token}} )
    }
    getFollowing(token){
        return http.get(`/users/following`, {headers: {'Authorization': "Bearer " + token}} )
    }
    userFollow(data, token){
        return http.post(`/users/follow`, JSON.stringify(data),  {headers: {'Authorization': "Bearer " + token}} )
    }
    getBookMark(token){
        return http.get(`/users/bookmark` ,  {headers: {'Authorization': "Bearer " + token}})
    }
    sendReport(data, token){
        return http.post(`/users/report-article`, JSON.stringify(data) ,  {headers: {'Authorization': "Bearer " + token}})
    }
    sendReportUser(data, token){
        return http.post(`/users/report-user`, JSON.stringify(data) ,  {headers: {'Authorization': "Bearer " + token}})
    }
    search(keyword) {
        return http.get(`/articles?searchKeyword=${keyword}`)
    }
    createMessage(data, token) {
        return http.post(`/users/message`, JSON.stringify(data) ,  {headers: {'Authorization': "Bearer " + token}})
    }
    getMessage(token) {
        return http.get(`/users/messag-users`,  {headers: {'Authorization': "Bearer " + token}})
    }
    getMessageByUser(data, token){
        return http.get(`/users/message/${data}` , {headers: {'Authorization': "Bearer " + token}})
    }
    getTopicByScore() {
        // return http.get("/articles?sortBy=score&sortOrder=DESC&limit=4")
        return http.get("/articles?limit=4")
    }
}

export default new PropertiesService();