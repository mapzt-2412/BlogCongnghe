import moment from 'moment';
import vi from "moment/locale/vi";
export const formatDate = (date) => {
    return moment.utc(date).locale("vi", vi).fromNow();
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

export const saveId = (id) => {
    localStorage.setItem('id', id);
}

export const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
}

export const getTheme = () => {
    if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme');
        if(theme){
            return theme
        }
        return "light"
    }
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

export const getId = () => {
    if (typeof window !== 'undefined') {
        const id = localStorage.getItem('id');
        if(id){
            return id
        }
        return false
    }
}
