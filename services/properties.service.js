import http, { instanceNoSpiner } from './http-common';
import { DEFAULT_PAGE_SIZE } from '../libs/commonConstants';

class PropertiesService {
    login(data) {
        return http.post("/auth/login", JSON.stringify(data))
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
    getArticleByUser(token, page){
        return http.get(`/users/my-articles?page=${page}&limit=${DEFAULT_PAGE_SIZE}`, {headers: {'Authorization': "Bearer " + token}})
    }
    getArticleByUserId(id, page){
        return http.get(`/users/${id}/list-articles-by-user?page=${page}&limit=${DEFAULT_PAGE_SIZE}`)
    }
    get3ArticlesByTopic(name){
        return http.get(`/articles?topic=${name}&limit=3`)
    }
    getDraftByUser(token){
        return http.get("/drafts", {headers: {'Authorization': "Bearer " + token}})
    }
    getStory(param, token){
        let params = '';
        for(let x in param){
            params += `&${x}=${param[x]}`
        }
        return instanceNoSpiner.get(`/articles/story?${params}`,{headers: {'Authorization': "Bearer " + token}})
    }
    createVideo(data, token){
        return http.post("/articles/media", {headers: {'Authorization': "Bearer " + token}}, JSON.stringify(data))
    }
    createArticle(data,token){
        return http.post("/articles/create-article", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    createDraft(data,token){
        return instanceNoSpiner.post("/drafts/create-draft", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    updateArticle(data,token){
        return http.patch("/articles/update-article", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    updateDraft(data,token){
        return instanceNoSpiner.put("/drafts/update-draft", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
    }
    updateUserInfo(data,token){
        return instanceNoSpiner.put("/users/update-info", JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}})
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
        return instanceNoSpiner.post(`/users/interactive`, JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}} )
    }
    commentArticle(data, token){
        return instanceNoSpiner.post(`/users/comment`, JSON.stringify(data), {headers: {'Authorization': "Bearer " + token}} )
    }
    getComment(id, token){
        if(token){
            return http.get(`/articles/${id}/comment`, {headers: {'Authorization': "Bearer " + token}})
        }
        return http.get(`/articles/${id}/comment`)
    }
    getFollowed(id, token){
        return http.get(`/users/followed-by-user/${id}`, {headers: {'Authorization': "Bearer " + token}} )
    }
    getFollowing(id, token){
        return http.get(`/users/following-by-user/${id}`, {headers: {'Authorization': "Bearer " + token}} )
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
        return instanceNoSpiner.post(`/users/message`, JSON.stringify(data) ,  {headers: {'Authorization': "Bearer " + token}})
    }
    getMessage(token) {
        return http.get(`/users/messag-users`,  {headers: {'Authorization': "Bearer " + token}})
    }
    getMessageByUser(data, token){
        return http.get(`/users/message/${data}` , {headers: {'Authorization': "Bearer " + token}})
    }
    getTopicByScore() {
        // return http.get("/articles?sortBy=score&sortOrder=DESC&limit=4")
        return http.get("/articles?sortBy=score&sortOrder=DESC&limit=4")
    }
    verifyAccount(token){
        return http.get(`/auth/verify/${token}` , null)
    }
    requestResetPassword(data){
        return http.post(`/auth/request-reset-password`, JSON.stringify(data))
    }
    handleResetPassword(data) {
        return http.post(`/auth/handle-reset-password`, JSON.stringify(data))
    }
}

export default new PropertiesService();