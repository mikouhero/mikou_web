// 防抖
export function debounce(fn, time) {
    var timer = null
    return function() {
        var args = arguments
        var ctx = this
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(ctx, args)
        })
    }
}


// 深拷贝
export function deepClone(obj) {
    // var newObj = obj instanceof Array ? [] : {};
    // //obj属于基本数据类型,直接返回obj
    // if (typeof obj !== 'object') {
    //     return obj;
    // } else {
    //     //obj属于数组或对象，遍历它们
    //     for (var i in obj) {
    //         newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    //     }
    // }
    var newobj = JSON.stringify(obj)

    return JSON.parse(newobj)
  }
  
// 类似于ramda的filter
export function getTargetObject(targetObject, propsArray) {
    if (typeof (targetObject) !== "object" || !Array.isArray(propsArray)) {
        throw new Error("参数格式不正确");
    }
    const result = {};
    Object.keys(targetObject).filter(key => propsArray.includes(key)).forEach(key => {
        result[key] = targetObject[key];
    })
    return result;
}

  export const sleep = time => new Promise((resolve) => setTimeout(resolve, time))