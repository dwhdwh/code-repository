/*
 * @Author: dwh
 * @Date: 2022-08-17 22:01:25
 * @LastEditors: dwh
 * @LastEditTime: 2022-08-17 22:01:42
 * @Description: file content
 */
function deepClone(origin, target) {
    var target = target || {},
        str = Object.prototype.toString,
        arrType = '[object Array]';
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof(origin[key]) === 'object' && origin[key] !== null) {
                if (str.call(origin[key]) === arrType) {
                    target[key] = [];
                    deepClone(origin[key], target[key]);
                } else {
                    target[key] = {};
                    deepClone(origin[key], target[key]);
                }
            } else {
                target[key] = origin[key];
            }
        }
    }
    return target;
}