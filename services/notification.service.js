import http, { instanceNoSpiner } from './http-common';

class NotificationService{
    getNotifications (token){
        return instanceNoSpiner.get('/users/notification', {headers: {'Authorization': "Bearer " + token}})
    }
}
export default new NotificationService();