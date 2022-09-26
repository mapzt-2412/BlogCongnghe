import moment from 'moment';
export const formatDate = (date) => {
    return moment(date, "YYYYMMDD").fromNow();
}

export const SliceString = (string , end) => {
    if(string.length < end){
        return string;
    }else{
        return string.slice(0, end) + " ...";
    }
}

export const saveToken = (token) => {
    localStorage.setItem('token', token)
    location.reload();
}
export const deleteToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        location.reload();
    }
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if(token){
            return token
        }
        return false
    }
}