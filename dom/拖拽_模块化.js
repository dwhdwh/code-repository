// 此次的模块化不是立即执行
var initDragClick = (function(elem, menu, elemClick) {
    // 拖拽函数的封装
    drag();
    // 拖拽函数的封装
    function drag() {
        // 点击源到元素的距离
        var x,
            y,
            elemPos = [],
            // 点击与拖拽分隔的时间戳
            cbTime = 0,
            ceTime = 0,
            // viewPort的宽度和高度
            cWidth = getClientSize().x,
            cHeight = getClientSize().y,
            // 元素宽度和高度
            eWidth = parseInt(getStyle(elem, 'width')),
            eHeight = parseInt(getStyle(elem, 'height')),
            // menu菜单的宽高
            mWidth = parseInt(getStyle(menu, 'width')),
            mHeight = parseInt(getStyle(menu, 'height')),
            // 设置双击事件的配置项
            dbTime = 0,
            deTime = 0,
            couter = 0,
            t = null;
        // 鼠标落下事件
        addEvent(elem, 'mousedown', function(e) {
            var e = e || window.event,
                eBtnCode = e.button;
            // 获取元素的起始坐标(解决第一拖拽,第二次快速拖拽触发点击事件还原位置)
            elemPos = [getStyle(elem, 'left'), getStyle(elem, 'top')];
            // 获取点击源到元素的距离
            x = posPage(e).X - parseInt(getStyle(this, 'left'));
            y = posPage(e).Y - parseInt(getStyle(this, 'top'));
            // 点击鼠标,判断鼠标是哪个类型的键触发的? 0:左键 1:滑轮 2: 右键
            if (eBtnCode === 2) {
                // 鼠标右键点击
                // 对当前右键的临界点进行处理
                var pLeft = posPage(e).X,
                    pTop = posPage(e).Y;
                if (pLeft <= 0) {
                    pLeft = pLeft;
                } else if (pLeft >= cWidth - mWidth) {
                    pLeft = pLeft - mWidth;
                }

                if (pTop <= 0) {
                    pTop = pTop;
                } else if (pTop >= cHeight - mHeight) {
                    pTop = pTop - mHeight;
                }
                // 对临界点进行判断
                // console.log('鼠标右键点击');
                // 显示menu菜单
                menu.style.left = pLeft + 'px';
                menu.style.top = pTop + 'px';
                menu.style.display = 'block';
            } else if (eBtnCode === 0) {
                // 鼠标左键
                // 隐藏菜单栏
                menu.style.display = 'none';
                // 鼠标左键点击时记录点击的时间戳
                cbTime = new Date().getTime();
                // 设置鼠标移动事件
                addEvent(document, 'mousemove', mouseMove);
                // 设置鼠标抬起事件
                addEvent(document, 'mouseup', mouseUp);
                // 取消默认行为和冒泡
                cancleDefaultEvent(e);
                cancleBublle(e);
            }
            // 鼠标移动函数
            function mouseMove(e) {
                var e = e || window.event,
                    // 移动后的元素坐标
                    pLeft = posPage(e).X - x,
                    pTop = posPage(e).Y - y;
                // 移动的时候设置临界点
                // 元素距离viewport的距离(可视窗口宽度 - 元素宽度)
                // 限定x值
                if (pLeft <= 0) {
                    pLeft = 0;
                } else if (pLeft >= cWidth - eWidth) {
                    pLeft = cWidth - eWidth;
                }

                // 限定y值
                if (pTop <= 0) {
                    pTop = 0;
                } else if (pTop >= cHeight - eHeight) {
                    pTop = cHeight - eHeight;
                }
                // 设置elem的坐标位置
                elem.style.left = pLeft + 'px';
                elem.style.top = pTop + 'px';
            }
            // 鼠标抬起事件
            function mouseUp(e) {
                var e = e || window.event;
                // 鼠标抬起的时候记录时间戳
                ceTime = new Date().getTime();
                // 对点击时间进行判断
                if (ceTime - cbTime < 200) {
                    // 点击事件不改变元素的位置
                    elem.style.left = elemPos[0];
                    elem.style.top = elemPos[1];
                    // 是处理双击点击事件,跳转网页,执行回调函数
                    couter++;
                    if (couter === 1) {
                        dbTime = new Date().getTime();
                    }
                    if (couter === 2) {
                        deTime = new Date().getTime();
                    }
                    if (dbTime && deTime && (deTime - dbTime) <= 300) {
                        // 双击事件成立,双击跳转页面
                        elemClick && elemClick();
                        // 重置原始值
                        dbTime = 0;
                        deTime = 0;
                        couter = 0;
                    }
                    // 处理点击一次后不再点击的bug,延时一定时间后恢复原始值
                    t = setTimeout(function() {
                        dbTime = 0;
                        deTime = 0;
                        couter = 0;
                        clearTimeout(t);
                    }, 300);
                }
                // 取消事件
                removeEvent(document, 'mousemove', mouseMove);
                removeEvent(document, 'mouseup', mouseUp);
            }
        });
        // 取消鼠标右键的默认行为
        addEvent(elem, 'contextmenu', function(e) {
            var e = e || window.event;
            // 取消鼠标右键的默认行为
            cancleDefaultEvent(e);
        });
        addEvent(menu, 'contextmenu', function(e) {
            var e = e || window.event;
            // 取消鼠标右键的默认行为
            cancleDefaultEvent(e);
        });
        addEvent(menu, 'click', function(e) {
            var e = e || window.event;
            // 阻止冒泡
            cancleBublle(e);
        });
        addEvent(document, 'click', function() {
            menu.style.display = 'none';
        });
        // 取消document的contextmenu点击事件
        // addEvent(document, 'contextmenu', function (e) {
        //     var e = e || window.event;
        //     // 取消鼠标右键的默认行为
        //     cancleDefaultEvent(e);
        // });
    }
});
// 调用模块
initDragClick(a, menu, function() {
    window.open('https://www.baidu.com');
});