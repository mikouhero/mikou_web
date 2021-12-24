export default {
    menuSwitch({commit}, data) {
        commit("MENU_SWITCH", data)
    },
    menuList({commit}, data) {
        commit("storeMenuList", data)
    },
    menuDetail({commit},data) {
        commit("menuDetail",data)
    }
}