export default {
    MENU_SWITCH: (state, data) => {
        state.menuSwitch = data
    },

    storeMenuList: (state,data) => {
        state.menuList = data
    },

    menuDetail: (state,data) => {
        let menuDetail = state.menuList.filter(item=>{
            if(item.id===data) return item
        })
        state.menuDetail = menuDetail
    }
}