// 原型模块化开发
Element.prototype.initDragClick = (function(menu, elemClick) {
    drag.call(this);
    // 拖拽函数的封装
    function drag() {
        // 保存this指向
        var _self = this,
            // 初始化点击源与元素的距离
            x,
            y,
            // 设置单击事件的配置项
            cdTime = 0,
            ceTime = 0,
            // 获取元素的宽度和视口宽度
            eWidth = parseInt(getStyle(_self, 'width')),
            eHeight = parseInt(getStyle(_self, 'height')),
            cWidth = getClientSize().x,
            cHeight = getClientSize().y,
            // 获取菜单栏的尺寸
            mWidth = parseInt(getStyle(menu, 'width')),
            mHeight = parseInt(getStyle(menu, 'height')),
            // 设置双击事件
            dsTime = 0,
            deTime = 0,
            couter = 0,
            t = null;
        // 监听元素的鼠标落下事件
        addEvent(this, 'mousedown', function(e) {
            // 事件对象的兼容性写法
            var e = e || window.event,
                // e.button 鼠标左键code 0 右键 2  滑轮1
                eBtnCode = e.button,
                // 获取元素的起始坐标
                pagePos = [getStyle(this, 'left'), getStyle(this, 'top')],
                // 设置菜单栏的位置
                mLeft = posPage(e).X,
                mTop = posPage(e).Y;
            // 获取点击源与元素的距离
            x = posPage(e).X - parseInt(getStyle(this, 'left'));
            y = posPage(e).Y - parseInt(getStyle(this, 'top'));
            // 隐藏菜单栏
            menu.style.display = 'none';
            // 判断鼠标点击的类型
            if (eBtnCode === 2) {
                // 鼠标右键
                // todo... 菜单栏的边界处理
                if (mLeft <= 0) {
                    mLeft = 0;
                } else if (mLeft >= cWidth - mWidth) {
                    mLeft = mLeft - mWidth;
                }

                if (mTop <= 0) {
                    mTop = 0;
                } else if (mTop >= cHeight - mHeight) {
                    mTop = mTop - mHeight;
                }
                menu.style.left = mLeft + 'px';
                menu.style.top = mTop + 'px';
                menu.style.display = 'block';
            } else if (eBtnCode === 0) {
                // 鼠标左键
                // 记录鼠标单击落下的时间戳
                // cdTime = new Date().getTime();
                // 设置元素的鼠标移动事件
                addEvent(document, 'mousemove', mouseMove);
                // 设置元素的鼠标落下事件
                addEvent(document, 'mouseup', mouseUp);
                // 取消默认行为
                cancleDefaultEvent(e);
                // 取消冒泡行为
                cancleBublle(e);
            }
            // 鼠标移动事件
            function mouseMove(e) {
                // 事件对象的兼容性写法
                var e = e || winodow.event,
                    // 获取当前移动后的元素坐标
                    elemLeft = posPage(e).X - x,
                    elemTop = posPage(e).Y - y;
                // 控制移动时候位置的临界点
                // x方向的临界点
                if (elemLeft <= 0) {
                    elemLeft = 0;
                } else if (elemLeft >= cWidth - eWidth) {
                    elemLeft = cWidth - eWidth;
                }
                // y方向的临界点
                if (elemTop <= 0) {
                    elemTop = 0;
                } else if (elemTop >= cHeight - eHeight) {
                    elemTop = cHeight - eHeight;
                }
                // 设置当前元素的位置
                _self.style.left = elemLeft + 'px';
                _self.style.top = elemTop + 'px';
            };
            // 鼠标抬起下事件
            function mouseUp(e) {
                // 事件对象的兼容性
                var e = e || window.event;
                // 记录点击时间戳
                // ceTime = new Date().getTime();
                // 记录双击抬起时间戳
                couter++;
                if (couter === 1) {
                    dsTime = new Date().getTime();
                }
                if (couter === 2) {
                    deTime = new Date().getTime();
                }
                if (dsTime && deTime && (deTime - dsTime < 200)) {
                    // 双击事件
                    elemClick && elemClick();
                    // 处理属于单击事件,但是元素的位置还是变化了
                    _self.style.left = pagePos[0];
                    _self.style.top = pagePos[1];
                }
                // 延时清除
                t = setTimeout(function() {
                    dsTime = 0;
                    deTime = 0;
                    couter = 0;
                    clearTimeout(t);
                }, 200);
                // 判断点击时间的阈值
                // if (ceTime - cdTime < 200) {
                //     // 单击事件,需要回调函数(功能扩展),实现跳转的功能
                //     elemClick && elemClick();
                //     // 处理属于单击事件,但是元素的位置还是变化了
                //     _self.style.left = pagePos[0];
                //     _self.style.top = pagePos[1];
                // }
                // 取消事件
                removeEvent(document, 'mousemove', mouseMove);
                removeEvent(document, 'mouseup', mouseUp);
            };
        });
        // 取消右键的默认行为
        addEvent(menu, 'contextmenu', function(e) {
            var e = e || window.event;
            // 取消默认行为
            cancleDefaultEvent(e);
        });
        addEvent(_self, 'contextmenu', function(e) {
                var e = e || window.event;
                cancleDefaultEvent(e);
            })
            // 点击文档取消menu菜单栏
        addEvent(document, 'click', function(e) {
            var e = e || window.event;
            // 隐藏菜单栏menu
            menu.style.display = 'none';
        });
        // 阻止菜单栏冒泡行为
        addEvent(menu, 'click', function(e) {
            var e = e || window.event;
            // 取消冒泡行为
            cancleBublle(e);
        })
    }
});
// 调用模块
a.initDragClick(menu, function() {
    window.open('https://www.baidu.com');
});