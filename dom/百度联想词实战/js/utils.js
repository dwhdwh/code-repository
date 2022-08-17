// 模块化封装原生AJAX
// 因为jquery中的AJAX调用形式$.get,$.post,$.Ajax,所以我们也按照这样的样式进行封装
var $ = (function () {
    function _doAjax(opt) {
        // 首先兼容性写法
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        // 如果浏览器不支持AJAX请求
        if (!xhr) {
            throw new Error('您的浏览器不支持AJAX请求数据！请更新后再试~');
        }
        // 请求方法,防止用户传入小写,强制转化为大写
        var method = (opt.method || 'GET').toUpperCase(),
            // 请求地址
            url = opt.url,
            // 同步请求or异步请求
            async = '' + opt.aysnc === 'false' ? false : true,
            // 请求参数
            data = opt.data || null,
            // 响应返回后的数据格式
            dataType = opt.dataType || 'JSON',
            // jsonp跨域
            jsonp = opt.jsonp || 'cb',
            jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
            // 成功后的回调函数
            success = opt.success || function () { },
            // 失败后的回调函数
            error = opt.error || function () { },
            // 无论失败还是成功都会执行的complete函数
            complete = opt.complete || function () { },
            // 设置超时时间
            timeout = opt.timeout || 5000,
            // 设置定时器
            t = null;
        // 未传入url
        if (!url) {
            throw new Error('未传入url参数');
        }
        if (dataType.toUpperCase() === 'JSONP' && method !== 'GET') {
            throw new Error('如果dataType为JSONP,请您将type设置成GET');
        }
        // JSONP跨域逻辑
        if (dataType.toUpperCase() === 'JSONP') {
            var oScript = document.createElement('script');
            // xxx.domain.com/xxx.php?cb=test
            // xxx.domain.com/xxx.php?wd=xxx&cb=test
            oScript.src = url.indexOf('?') === -1
                ? url + '?' + jsonp + '=' + jsonpCallback
                : url + '&' + jsonp + '=' + jsonpCallback;
            document.body.appendChild(oScript);
            document.body.removeChild(oScript);
            window[jsonpCallback] = function (data) {
                success(data);
            }
            return;
        }
        // AJAX绑定事件监听处理函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    switch (dataType.toUpperCase()) {
                        case 'JSON':
                            success(JSON.parse(xhr.responseText));
                            break;
                        case 'XML':
                            success(xhr.responseXML);
                            break;
                        case 'TEXT':
                            success(xhr.responseText);
                            break;
                        default:
                            success(JSON.parse(xhr.responseText));
                            break;
                    }
                } else {
                    error();
                }
                // 请求成功,清除定时器
                clearTimeout(t);
                t = null;
                xhr = null;
                // 最后执行complete函数
                complete();
            }
        }
        // 处理AJAX请求的逻辑
        xhr.open(method, url, async);
        // POST请求设置请求头数据的格式类型
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 处理请求数据中的data格式
        xhr.send(method === 'GET' ? null : dataFormat(data));

        // 设置超时设置
        t = setTimeout(function () {
            xhr.abort();
            clearTimeout(t);
            t = null;
            xhr = null;
            throw new Error('请求超时,请稍后重试!');
        }, timeout)
    }

    function dataFormat(data) {
        // {'name':'Tom','sex':'male'} ---> 'name=Tom&sex=male'
        // 循环对象
        var str = '';
        for (var key in data) {
            // 只遍历对象本身的属性
            if (data.hasOwnProperty(key)) {
                str += key + '=' + data[key] + '&';
            }
        }
        return str.replace(/&$/, '');
    }

    function randomNum() {
        var str = '';
        for (var i = 0; i < 20; i++) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    }

    return {
        Ajax: function (opt) {
            // 处理传入的参数问题,抽离函数,能够让所有方法能够在Ajax方法外处理
            _doAjax(opt);
        },
        post: function (url, data, timeout, dataType, successCB, errorCB, completeCB) {
            _doAjax({
                method: 'POST',
                url: url,
                data: data,
                dataType: dataType,
                timeout: timeout,
                success: successCB,
                error: errorCB,
                complete: completeCB
            });
        },
        get: function (url, data, timeout, dataType, successCB, errorCB, completeCB) {
            _doAjax({
                method: 'GET',
                url: url,
                data: data,
                timeout: timeout,
                dataType: dataType,
                success: successCB,
                error: errorCB,
                complete: completeCB
            });
        }
    }
})();

// domain跨域
var ajaxDomain = (function () {
    // 创建iframe元素
    function createIframe(frameId, frameUrl) {
        var iframe = document.createElement('iframe');
        iframe.src = frameUrl;
        iframe.id = frameId;
        iframe.style.display = 'none';
        return frame;
    }
    // 实现跨域
    return function (opt) {
        // 设置当前服务器的域名
        document.main = opt.basicDomain;
        var iframe = createIframe(opt.frameId, opt.frameUrl);
        iframe.onload = function () {
            // 获取与api同源子级页面中的ajax
            var $$ = document.getElementById(opt.frameId).contentWindow.$;
            // 请求数据
            $$.ajax({
                url: opt.url,
                method: opt.method,
                data: opt.data,
                success: opt.success,
                error: opt.error
            })
        }
        document.body.appenChild(iframe);
    }
})();