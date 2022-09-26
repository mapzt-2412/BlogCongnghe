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
}
export default new PropertiesService();