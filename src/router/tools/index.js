import Home from '@/view/layout/index.vue'
import Index from '@/view/tools/build/index.vue'






export default [
    {
        path: '/tools',
        icon: 'el-icon-user',
        component: Home,
        isLeaf: true,
        children: [
            {
                path: 'build',
                name: '表单构建',
                component: Index
            },
           

        ]
    },
]