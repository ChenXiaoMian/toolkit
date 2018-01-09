/**
 * 随机打乱数组
 */
function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr){
    const _arr = arr.slice()
    for(let i=0;i<_arr.length;i++){
        let j = getRandomInt(0,i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

/**
 * 数组去重
 */
// 将对象元素转换成字符串以作比较
function obj2key(obj, keys){
    var n = keys.length,
        key = [];
    while(n--){
        key.push(obj[keys[n]]);
    }
    return key.join('|');
}
// 去重操作
function uniqeByKeys(array,keys){
    var arr = [];
    var hash = {};
    for (var i = 0, j = array.length; i < j; i++) {
        var k = obj2key(array[i], keys);
        if (!(k in hash)) {
            hash[k] = true;
            arr .push(array[i]);
        }
    }
    return arr ;
}