function deepClone(origin, tar) {
    var direct = new origin.constructor(),
        toStr = Object.prototype.toString,
        arrType = '[object Array]';
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof(origin[key]) === 'object' && origin[key] != null) {
                if (toStr.call(origin[key]) === arrType) {
                    direct[key] = []
                } else {
                    direct[key] = {}
                }
                deepClone(origin[key], direct[key]);
            } else {
                direct[key] = origin[key]
            }
        }
    }
    return direct;
}

function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]',
        funType = 'function';
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof(origin[key]) === 'object' && origin[key] !== null) {
                if (toStr.call(origin[key]) === arrType) {
                    target[key] = []
                } else {
                    target[key] = {}
                }
                deepClone(origin[key], target[key]);
            } else if (typeof(origin[key]) === funType) {
                target[key] = function() {};
                deepClone(origin[key], target[key])
            } else {
                target[key] = origin[key];
            }

        }
    }
    return target;

}

function deepClone(origin, hashMap = new WeakMap()) {
    if (origin == undefined || typeof(origin) !== 'object') {
        return origin;
    }
    if (origin instanceof Date) {
        return new Date(origin);
    }
    if (origin instanceof RegExp) {
        return new RegExp(origin);
    }
    const hashKey = hashMap.get(origin);
    if (!!hashKey) {
        return hashKey;
    }

    const target = new origin.constructor();
    hashMap.set(origin, target);
    for (let key in origin) {
        if (origin.hasOwnProperty(key)) {
            target[key] = deepClone(origin[key], hashMap);
        }
    }
    return target;
}

//圣杯模式
;
var inherit = (function() {
    var Buffer = function() {};
    return function(Target, Origin) {
        Buffer.prototype = Origin.prototype;
        Target.prototype = new Buffer();
        Target.prototype.constructor = Target;
        Target.prototype.spuer_class = Origin;
    }
})();


// 获取滚动条滑动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.documentElement.scrollLeft + document.body.scrollLeft,
            top: document.documentElement.scrollTop + document.body.scrollTop
        }
    }
}

// 获取可视窗口尺寸
function getViewportSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}
// 获取整个页面的尺寸
function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}

// 获取元素属性
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            return window.getComputedStyle(elem, null)[prop];
        } else {
            return window.getComputedStyle(elem, null);
        }
    } else {
        if (prop) {
            return elem.currentStyle[prop];
        } else {
            return elem.currentStyle
        }
    }
}
// 绑定事件函数兼容性
function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + type, function() {
            fn.call(el);
        });
    } else {
        el['on' + type] = fn;
    }
}

// 解绑事件
function removeEvent(el, type, fn) {
    if (el.addEventListener) {
        el.removeEventListener(type, fn, false);
    } else if (el.attachEvent) {
        el.detachEvent('on' + type, fn);
    } else {
        el['on' + type] = null;
    }
}
// 取消冒泡
function cancelBubble(e) {
    var e = e || window.event;
    if (e.stopPropagetion) {
        e.stopPropagetion();
    } else {
        e.cancelBubble = true;
    }
}

// 取消默认事件
function preventDefaultEvent(e) {
    var e = e || window.Event;
    if (e.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// 获取滚动条滚动距离
function getPageOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 获取鼠标点击位置
function posPage(e) {
    var e = e || window.event,
        sLeft = getPageOffset().x,
        sTop = getPageOffset().y,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}