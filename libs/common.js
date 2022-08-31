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