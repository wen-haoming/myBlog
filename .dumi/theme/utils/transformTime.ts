export const transformDate = (time: string) => {
    const date = new Date(time);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${year}年${month}月${day}日`;
};
