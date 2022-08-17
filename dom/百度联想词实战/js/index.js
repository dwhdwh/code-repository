; (function (doc) {
    var oSearch = doc.getElementsByClassName('J_search')[0],
        oList = doc.getElementsByClassName('J_list')[0],
        oParent = oList.parentNode,
        listTpl = doc.getElementById('J_ListTpl').innerHTML;

    // 初始化函数
    var init = function () {
        bindEvent();
    }

    // 事件绑定函数
    function bindEvent() {
        oSearch.addEventListener('input', typeInput, false);
    }

    function typeInput() {
        var value = _trimSpace(this.value),
            len = value.length;
        if (len > 0) {
            // jsonp跨域获取数据
            getDatas(value);
        } else {
            showWordWrap(false);
        }
    }

    function showWordWrap(flag){
        if(flag) {
            oParent.style.display = 'block';
        } else {
            oParent.style.display = 'none';
        }
    }


    // 渲染函数
    function render(data) {
        var list = '',
            value = _trimSpace(oSearch.value);
        data.forEach(function(elem){
            list+= listTpl.replace(/{{(.*?)}}/g, function(node, key){
                return {
                    wd:_wdStyle(value, elem),
                    wdLink:elem
                }[key]
            })
        });
        oList.innerHTML = list;
        showWordWrap(true);
    }

    function getDatas(value) {
        $.Ajax({
            url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value,
            method: 'GET',
            dataType: 'JSONP',
            jsonp: 'cb',
            jsonpCallback: 'setDatas',
            success: function (data) {
                // 渲染列表数据
                if(data && data.s.length > 0) {
                    render(data.s);
                }
            }
        })
    }

    function _trimSpace(value) {
        return value.replace(/\s+/g, '');
    }

    // 联想词的逻辑
    function _wdStyle(value, word) {
        return '<span class="font-normal">' + value + '</span>' + word.replace(value, ''); 
    }

    init();
})(document);