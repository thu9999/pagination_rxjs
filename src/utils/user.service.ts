/**
 * Get list of users
 * Fake api call
 * Giả sử client thực hiện 2 search request liên tục
 * Lần 1: Client search '1', server giả định trả về kết quả sau 5s tính toán
 * Lần 2: Client search '2', server giả định trả về kết quả sau 1s tính toán
 * Hoặc có thể do vấn đề delay mà server trả về kết quả của lần search 2 trước lần 1
 * => Kết quả của lần search 1 sẽ được trả về cho lần search 2 => Sai
 * Expect: Kết quả trả về là kết quả của lần search sau cùng
 */
const getUsers = (text: string) => {
    return new Promise((resolve) => {
        if(text == '1') {
            setTimeout(() => {
                resolve('Result of search 1');
            }, 5 * 1000) // 5s
        } else {
            setTimeout(() => {
                resolve('Result of search 2');
            }, 1 * 1000) // 1s
        }
    });
}

export {
    getUsers
}