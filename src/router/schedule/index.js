import Home from '@/view/layout/index.vue'
import Index from '@/view/schedule/index.vue'






export default [
    {
        path: '/schedule',
        icon: 'el-icon-user',
        component: Home,
        isLeaf: true,
        children: [
            {
                path: '/',
                name: '计划任务',
                component: Index
            },
           

        ]
    },
]