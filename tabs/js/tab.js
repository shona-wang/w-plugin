(function($,window,undefined){
    var pluginName = 'tab',
        defaults = {
            labels: ['用户管理', '配置管理', '角色管理'],
            contents: [{
                type: 'string',
                content: '用户管理'
            }, {
                type: 'string',
                content: '配置管理'
            }, {
                type: 'string',
                content: '角色管理'
            }],
            type: 'border',
            position: 'top',
            isHover: true,
            deleteable: false
        };
    var Tab = function (self,options) {
        this.setting = $.extend({}, defaults, options);
        this.self = self;
        this.init();
    };
    Tab.prototype = {
        constructor: Tab,
        init: function(){
            this._render();
            this._hover(0);
        },
        _render: function(){
            var that = this,
                type = this.setting.type ? this.setting.type : '',
                position = this.setting.position ? this.setting.position : 'top',
                activeBar = type == "card" ? '' : '<div class="w-tabs_active-bar"></div>',
                labels = function(){
                    var tpl = '';
                    $.each(that.setting.labels, function (ind, val) {
                        tpl += ' <div aria-index="tab-' + ind + '" class="w-tabs_item">' + val + '<span class="w-icon-close" index="'+ ind +'"></span></div>'
                        
                    });
                    return tpl;
                },
                renderHeader = function(){
                    var headerArr = [
                        '<div class="w-tabs_header is-'+ position +'">',
                            '<div class="w-tabs_header-wrap">',
                                activeBar,
                                labels(),
                            '</div>',
                        '</div>'
                    ]
                    return headerArr.join('');
                },
                renderContent = function() {
                    var tpl = '';
                    $.each(that.setting.contents, function (ind, val) {
                        var html;
                        if (val.type == 'node') {
                            html = $('#' + val.content).html();
                        }  else if (val.type == 'string') {
                            html = val.content;
                        }
                       tpl += '<div class="w-tabs_panel" aria-controls="tab-' + ind + '">' + html + '</div>'
                    });
                    return '<div class="w-tabs_content">' + tpl + '</div>';
                };
            if(position == 'bottom') {
                $(this.self).html('<div class="w-tabs w-tabs-' + type + ' w-tabs-' + position + '">' + renderContent() + renderHeader() + '</div>');
            } else {
                $(this.self).html('<div class="w-tabs w-tabs-' + type + ' w-tabs-' + position + '">' + renderHeader() + renderContent() + '</div>');
            }
        },
        _hover: function(key){
            var $item = $('.w-tabs_item'),
                $panel = $('.w-tabs_panel'),
                that = this,
                change = function(e){
                    var $target = $(e.target),
                        key = $target.find('.w-icon-close').attr('index'),
                        index = $target.attr('aria-index');
                    $item.removeClass('is-active');
                    $target.addClass('is-active');
                    if (that.setting.type != 'card' && (that.setting.position == 'left' || that.setting.position == 'right')) {
                        $('.w-tabs_active-bar').css({
                            'transform': 'translateY(' + key * 40 + 'px)'
                        });
                    }
                    if (that.setting.type != 'card' && (that.setting.position == 'top' || that.setting.position == 'bottom')) {
                        var num = key * 100;
                        $('.w-tabs_active-bar').css({
                            'transform': 'translateX(' +  num + 'px)'
                        });
                    }
                    if (that.setting.deleteable) {
                        $item.find('.w-icon-close').hide();
                        $target.find('.w-icon-close').css({
                            'display': 'inline-block'
                        });
                    }
                    $panel.removeClass('is-active');
                    $('.w-tabs_panel[aria-controls=' + index + ']').addClass('is-active');

                };
            $item.on('click', function (e) {
                change(e);
            });
            $item.eq(key).trigger('click');
            if(this.setting.isHover){
                $item.on('mouseenter', function (e) {
                    change(e);
                });
            }
            if (this.setting.deleteable) {
                $('.w-tabs_item.is-active .w-icon-close').css({
                    'display': 'inline-block'
                });
                $item.find('.w-icon-close').on('click',function(){
                    var index = $(this).attr('index');
                    that.delete(index);
                });
            }
        },
        reload: function(param){
            this.setting = $.extend({}, defaults, param);
            this._render();
            this._hover(0);
        },
        add: function(param){
            this.setting.deleteable = true;
            this.setting.labels.push(param.labels);
            this.setting.contents.push(param.contents);
            var num = this.setting.contents.length;
            this._render();
            this._hover(num-1);
        },
        delete: function(key){
            this.setting.labels.splice(key,1);
            this.setting.contents.splice(key,1);
            this._render();
            if (key == this.setting.labels.length) {
                this._hover(key-1);
            } else {
                this._hover(key);
            }
        }
    };
    $.fn[pluginName] = function (options) {
        this.each(function(index,el){
            if(!$.data(this,"plugin-"+pluginName)){
                $.data(this,"plugin-"+pluginName,new Tab(this,options));
            }
        })
        return this;
    }
})(jQuery,window,undefined);