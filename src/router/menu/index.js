import Home from '@/view/layout/index.vue'
import Index from '@/view/menu/index.vue'
import AddMenu from '@/view/menu/addmenu.vue'
import AddSubMenu from '@/view/menu/addsubmenu.vue'





export default [
    {
        path: '/menu',
        icon: 'el-icon-user',
        component: Home,
        isLeaf: true,
        children: [
            {
                path: '/',
                name: '菜单管理',
                component: Index
            },
            {
                path: 'addmenu',
                name: '添加父级菜单',
                hidden: true,
                component: AddMenu
            },
            {
                path: 'addsubmenu/:pid/:pname',
                name: '添加子级菜单',
                props: true,
                hidden: true,
                component: AddSubMenu
            },
            {
                path: 'editmenu/:id',
                name: '添加父级菜单',
                hidden: true,
                props: true,
                component: AddMenu
            },
            {
                path: 'editsubmenu/:pid/:pname/:id',
                name: '添加子级菜单',
                props: true,
                hidden: true,
                component: AddSubMenu
            },



        ]
    },
]