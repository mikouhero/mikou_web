import Home from '@/view/layout/index.vue'
import Index from '@/view/adminRole/index.vue'
import Edit from '@/view/adminRole/edit.vue'



export default [
    {
        path: '/adminRole',
        icon: 'el-icon-user',
        component: Home,
        isLeaf: true,
        children: [
            {
                path: '',
                name: '权限管理',
                component: Index,
            },
            {
                path: 'add',
                name: '权限添加',
                component: Edit,
                hidden: true
            },
            {
                path: 'edit/:id',
                name: '权限编辑',
                component: Edit,
                props: true,
                hidden: true
            }
        ]
    },
]