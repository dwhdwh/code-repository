/*
 * @Author: dwh
 * @Date: 2022-08-17 22:00:35
 * @LastEditors: dwh
 * @LastEditTime: 2022-08-17 22:00:50
 * @Description: file content
 */
function myTypeof(str) {
    var toStr = Object.prototype.toString,
        typeVal = typeof(str),
        res = {
            '[object Number]': '[object Number]',
            '[object String]': '[object String]',
            '[object Boolean]': '[object Boolean]',
            '[object Object]': '[object Object]'
        };
    if (str === null) {
        return 'null';
    } else if (typeVal === 'object') {
        var newStr = toStr.call(str);
        return res[newStr];
    } else {
        return typeVal;
    }
}