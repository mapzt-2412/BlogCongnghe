import moment from 'moment';
export const FormatDate = (date) => {
    return moment(date, "YYYYMMDD").fromNow();
}