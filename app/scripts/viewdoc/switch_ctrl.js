define(['base/ui/ui.list'], function(List) {
    'use strict';
    return {
        init: function(page){
            page.render();
            this.showList();
        },
        events: {
            'click .create-list':'showList'
        },
        showList: function(){
            var viewList = {
                list: [{
                    title: 'Slide示例',
                    desc: '包含滑动轮播图slide-vertical, slide-horizontal示例',
                    hash: '?viewdoc/switch/slide'
                },{
                    title: 'Tab示例',
                    desc: 'Tab与slide结合包含Ttab-top, tab-bottom示例',
                    hash: '?viewdoc/switch/tab'
                },{
                    title: 'Switch item指定src',
                    desc: '指定src的slide子项示例, 将通过ajax获取模板',
                    hash: '?viewdoc/switch/ajax'
                },{
                    title: 'Switch统合示例',
                    desc: '实现各种Switch切换',
                    hash: '?viewdoc/switch/all'
                }]
            };

            var ListSet = new List({
                data: viewList,
                wrapper: $('.content').last()
            });
            ListSet.render();
        }
    };
});

