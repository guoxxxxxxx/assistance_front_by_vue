/**
 * 检查邮箱格式是否正确
 * @param {*} email 
 * @returns bool
 */
function checkEmail(email) {
    let myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(email)) {
        return true;
    } else {
        return false;
    }
}


export {
    checkEmail
}