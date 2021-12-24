import Home from '@/view/layout/index.vue'
import Info from '@/view/adminUser/info.vue'
import Password from '@/view/adminUser/password.vue'
import Index from '@/view/adminUser/index.vue'


export default [
    {
        path: '/adminUser',
        icon: 'el-icon-user',
        component: Home,
        isLeaf: true,
        children: [
            {
                path: '/',
                name: '用户管理',
                component:Index
            },
            {
                path: 'reset-password',
                name: '修改密码',
                component: Password,
            },
            {
                path: 'edit-info',
                name: '编辑个人信息',
                component: Info
            }
        ]
    },
]