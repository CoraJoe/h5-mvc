define(function() {
    //水平或垂直滚动的面板，just it;
    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
            'opera' in window ? 'O' : '';
    var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
    /**
     * @construct Scroll
     * @param {object} opts
     * opts.wrapper     滚动对象所在的容器
     * opts.className   className 滚动对象的className
     * opts.step        步长，滚动的结果一定是以此为单位, 滚屏网站时可以一屏一步长,
     *                  非滚动选择组件(time, district..)一般不用此属性,否则滚动以步长计不会具体到点
     * opts.outer       允许出界的范围
     * opts.outerFront  允许出界位置上面显示的html或文字
     //* opts.outerEnd    允许出界位置下面显示的html或文字
     * opts.direction   水平与垂直
     * opts.onScroll    每次滚动时回调
     * opts.endScroll   每次滚动停回调
     * opts.onTop       滚动到上时
     * opts.onBottom    滚动到下时
     //* opts.scrollBar   是否显示滚动条
     */
    var Scroll = Class.extend({
        init: function (opts) {
            var defalutsThis = {
                $wrapper : $(opts.wrapper),
                $scroll : $(opts.className),
                step    : opts.step || 0,
                outer   : opts.outer ||150,
                outerFront: opts.outerFront || '更在更新中...',
                outerEnd:  opts.outerEnd || '已加载完毕...',
                isx     : opts.direction !== 'vertical',
                onScroll  : opts.onScroll || function(){},
                endScroll : opts.endScroll || function(){},
                onTop : opts.onTop || function(){},
                onBottom : opts.onBottom || function(){}
            };

            $.extend(this, defalutsThis);
            this.construct();
        },
        construct: function(){
          this.bindScroll();
        },
        bindScroll: function(){
            var that = this, $wrapper = this.$wrapper;
            $wrapper.prepend('<div class="ui-scroll-front">'+this.outerFront+'</div>');
            $wrapper.append('<div class="ui-scroll-end">'+this.outerEnd+'</div>');
            $wrapper.addClass('ui-scroll').swipe({
                //swipeY: 30,
                moveCallback: function(point){
                    that._setScrollTrans(point, true);
                },
                endCallback: function(point){
                    that._setScrollTrans(point);
                }
            })
        },
        //滑动区域总高度
        getScrollHeight: function(){
            return this.$scroll.height();
        },
        //容器高度
        getWrapperHeight: function() {
            return this.$wrapper.height();
        },
        //滚动到 num, elem, top, bottom
        /**
         * 滚动到...
         * @method scroll#scrollTo
         * @param {object} where 可以为具体的数字，元素, top, bottom字符串
         */
        scrollTo: function(where){
            var toType = typeof  where, val;
            if(where === 'top'){
                val = 0;
            }else if(where === 'bottom'){
                val = this.getWrapperHeight() - this.getScrollHeight();
            }
            if(toType === 'number'){
                val = where;
            }
            console.log(val, 'scrollTo val');
            this._scrollFxTo(val);
            console.log(this.getSteps(), '滚动的步长为：');
        },
        /**
         * 设置了step时获取滚动了多少步长
         * @method scroll#getSteps
         * @return  {number} 步长数
         */
        getSteps: function(){
            return   this.$scroll.data('swipe-steps');
        },
        _scrollFxTo: function(val){
            //有步长值的话以步长计
            if(this.step){
                var vals = this._getTransStep(val);
                console.log(vals, '步长信息');
                val = vals.val;
            }
            this.$scroll.data('swipe-steps', vals.stepNum);
            this.$scroll.data('swipe-offset', val);
            this.$scroll.fx(this._scrollCount(val));
        },
        //滚动时回调（moving为true为事件中回调，false为事件结束时回调）
        _setScrollTrans: function(point, moveing){
            var distance = this.isX ? point.swipeX : point.swipeY;
            var transVal = this._getTransVal(distance, point.swipeTime, moveing);
            var transStr = this._scrollCount(transVal);
            if(moveing){
                this.$scroll.css(transStr); //, 200, 'easeOutQuint'
                this.onScroll(point);
            }else{
                this._scrollFxTo(transVal); //, 200, 'easeOutQuint'
                this.endScroll(point);
            }
        },
        //计算当前滚动到的并限制边界范围
        _getTransVal: function(distance, swipeTime, moveing){
            distance = moveing ? distance : distance * this._getRatio(swipeTime);
            var swipeOffset = this.$scroll.data('swipe-offset') || 0;
            if(swipeOffset){
                distance += swipeOffset;
            }
            //限制区域
            var maxTransDis = this.getScrollHeight() - this.getWrapperHeight();
            var maxOuter    = moveing ? this.outer : 0,
                minRange = 0 + maxOuter,
                maxRange = maxTransDis + maxOuter;
            //console.log(distance, minRange, maxTransDis, maxRange);
            var absDis = Math.abs(distance), pxDis = distance + 'px';
            //在顶端越界拉时
            if(0 < distance &&  distance <= minRange){
                $('.ui-scroll-front').show().css({height: pxDis,'line-height': pxDis});
            }
            //在底端越界拉时
            if(maxTransDis < absDis &&  absDis <= maxRange){
                pxDis = (absDis-maxTransDis)+'px';
                $('.ui-scroll-end').show().css({height: pxDis, 'line-height': pxDis});
            }

            if(distance > minRange){
                distance = minRange;
                if(!moveing){
                    this.onTop();
                    $('.ui-scroll-front').hide();
                };
            }

            if(distance < -maxRange){
                distance = -maxRange;
                if(!moveing){
                    this.onBottom();
                    $('.ui-scroll-end').hide();
                };
            }

            return distance;
        },

        //计算当前滚动到的并限制步长结果的值,返回步长数与与滚动步长的值
        _getTransStep: function(val){
            var step = this.step, stepNum = Math.round(val/step);
            return {
                stepNum: Math.abs(stepNum),
                val: step*stepNum
            };
        },

        //根据swipe时间计算滚动速度
        _getRatio: function(swipeTime){
            var ratio;
            if(swipeTime > 1000){
                ratio = 1;
            }else{
                ratio = 1000/swipeTime;
                ratio = ratio > 30 ? 30 : ratio;
            }
            console.log(swipeTime, ratio, 'swipeRatio');
            return ratio;
        },

        //根据值计算滚动translate对象
        _scrollCount: function(val){
            var isX =  this.isX;       //水平垂直
            var x = isX ? (val+'px') : '0',
                y = isX ? '0' : (val+'px');
            var props = {};
            props['-'+ vendor + '-transform'] = has3d ?
            "translate3d("+x+","+y+",0)" :
            "translate("+x+","+y+")";
            return props;
        }

    });
    return Scroll;
});
