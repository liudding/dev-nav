import { unid } from '../utils/index'

const menu = {
    root: true,
    items: [
        {
            name: "实用工具",
            slug: "tools",
            items: [{
                name: "Mac",
                slug: "mac"
            }, {
                name: "思维导图",
                slug: "mind-map"
            }, {
                name: "作图工具",
                slug: "diagram"
            }, {
                name: "远程控制",
                slug: "remote-desktop"
            }]

        },
        {
            name: "技术开发",
            slug: "dev-tech",
            items: [{
                name: "开发工具",
                slug: "dev-tools"
            }, {
                name: "技术社区",
                slug: "forum"
            }, {
                name: "网络安全",
                slug: "security"
            }, {
                name: "博客",
                slug: "blog"
            }, {
                name: "开放平台",
                slug: "open-dev"
            }]

        },
        {
            name: "Web 前端",
            slug: "frontend",
            items: [{
                name: "JavaScript",
                slug: "javascript"
            }, {
                name: "Vue.js",
                slug: "vuejs"
            }, {
                name: "微信开发",
                slug: "wechat-dev"
            }, {
                name: "CSS",
                slug: "css"
            }, {
                name: "效率工具",
                slug: "tools"
            }, {
                name: "资料",
                slug: "resources"
            }]

        },
        {
            name: "PHP",
            slug: "php",
            items: [{
                name: "开发框架",
                slug: "php-framework"
            }, {

            }]
        },
        {
            name: "UI 设计",
            slug: "ui",
            items: [{
                name: "设计体系",
                slug: "design-system"
            }, {
                name: "图标",
                slug: "icons"
            }, {
                name: "Logo",
                slug: "logo"
            }
            ]
        },
        // {
        //     name: "运营",
        //     slug: "operation",
        //     items: [{
        //         name: "图标",
        //         slug: "icons"
        //     }, {
        //         name: "Logo",
        //         slug: "logo"
        //     }
        //     ]
        // },
        // {
        //     name: "产品",
        //     slug: "operation",
        //     items: [{
        //         name: "图标",
        //         slug: "icons"
        //     }, {
        //         name: "Logo",
        //         slug: "logo"
        //     }
        //     ]
        // },
        {
            name: "日常办公",
            slug: "work",
            items: [{
                name: "图标",
                slug: "icons"
            }, {
                name: "Logo",
                slug: "logo"
            }
            ]
        }
    ]
}


const prepareMenu = menu => {
    menu.id = unid();
    if (menu.slug && !menu.url) {
        menu.url = '/categories/' + menu.slug
    }

    if (menu.items) {
        for (const item of menu.items) {
            prepareMenu(item);
        }
    }

    return menu;
}


export default prepareMenu(menu);