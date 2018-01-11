[ 插件名称: ] tab插件
[ fn 名称: ]  plugin-tab
[ 依赖: ] jquery
[ 功能: ]
    1、tabs的内容支持字符串渲染、页面Id包含的html渲染
    2、tabs的样式分border和card两种，其他需求自行更改css即可
    3、tabs的位置支持上、右、下、左位置变换
    4、tabs支持是否hover进行切换
    5、tabs支持添加、删除的功能，提供了相应状态的钩子函数
[ 示例: ]
    $('#tab').tab({
            labels: ['用户管理','配置管理','角色管理'],
            contents: [{
                type: 'string',
                content: '<p>此处为string方式加载的用户管理tab内容</p>'
            },{
                type: 'node',
                content: 'box'
            },{
                type: 'string',
                content: '<p>此处为string方式加载的角色管理tab内容</p>'
            }],
            type: 'card',
            position: 'top',
            isHover: false,
            deleteable: true
    });
[ param: ]
    < labels: >     tab名称 | Array  | (暂不支持tabs上显示图标)
    < contents: >   tab内容 | Array  
        < type: >   tab内容加载方式 | String | string: 字符串加载  node： 页面dom结点加载(只支持ID结点) | 默认string
        < content: > tab具体内容 | String | 如果type：node, content代表结点的ID
    < type: >  tab样式 | String | card: 卡片式  border: 边框式  | 默认border
    < position: > tab位置 | String | top bottom left right
    < isHover: > 是否需要hover时切换tab | Boolean | 默认 false
    < deleteable: > 是否可以进行删除 | Boolean | 默认 false 
[ events: ]
    实例化Tab: $('#tab').tab(param)
    重新加载Tab: $('#tab').data('plugin-tab').reload(param);
    新增tab: $('#tab').data('plugin-tab').add({
                labels: '权限管理',
                contents: {
                    type: 'string',
                    content: '<p>此处为string方式加载的权限管理tab内容</p>'
                }
            })


    