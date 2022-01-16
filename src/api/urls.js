
let url = process.env.NODE_ENV == 'production' ? '' : '域名'
console.log(process.env.NODE_ENV)

export default {
    base: url,

    // 登录相关
    lo_login: `/admin/login`,
    lo_logout: `/admin/login/logout`,
    lo_user_info: `/admin/login/user_info`,

    //用户账号
    user_list: `/admin/user/list`,
    user_add: `/admin/user/create`,
    user_edit: `/admin/user/update`,
    user_del: `/admin/user/delete`,
    user_info: `/admin/user/get_userinfo`,

    //权限管理
    auth_list: `/admin/role/list`,
    auth_add: `/admin/role/create`,
    auth_edit: `/admin/role/update`,
    auth_delete: `/admin/role/delete`,
    auth_detail: `/admin/role/find`,
    user_auth_list: `/admin/role/all`,



    //菜单
    menu_list: `/admin/menu/list`,
    menu_create: `/admin/menu/create`,
    menu_update: `/admin/menu/update`,
    menu_delete: `/admin/menu/delete`,
    menu_detail: `/admin/menu/find`,


    job_list: `/admin/job/list`,
    job_add: `/admin/job/create`,
    job_edit: `/admin/job/update`,
    job_del: `/admin/job/delete`,

}