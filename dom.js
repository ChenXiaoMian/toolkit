/**
 * dom常用操作
 */
function $$(selector,context){
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

function addClass(el,className){
    if(hasClass(el,className)){
        return
    }
    var newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

function hasClass(el,className){
    var reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
    return reg.test(el.className);
}

function getData(el, name, val){
    var prefix = 'data-'
    name = prefix + name
    if(val){
        return el.setAttribute(name, val)
    }else{
        return el.getAttribute(name)
    }
}

/**
 * css3兼容浏览器
 */
var elementStyle = document.createElement('div').style;

var vendor = function(){
    var transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for(var key in transformNames){
        if(elementStyle[transformNames[key]]!==undefined){
            return key
        }
    }
    return false
})()

function prefixStyle(style){
    if(vendor === false){
        return false
    }

    if(vendor === 'standard'){
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}


/**
 * 点击空白关闭弹窗
 */
$(document).mouseup(function(e){
  var _con = $(' 目标区域 ');   // 设置目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
    some code...   // 功能代码
  }
});
/* Mark 1 的原理：
判断点击事件发生在区域外的条件是：
1. 点击事件的对象不是目标区域本身
2. 事件对象同时也不是目标区域的子元素
*/


/**
 * 浏览器判断
 */
console.log(navigator.userAgent);
if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
    alert('你是使用IE')
}else if (navigator.userAgent.indexOf('Firefox') >= 0){
    alert('你是使用Firefox')
}else if (navigator.userAgent.indexOf('Chrome') >= 0){
    alert('你是使用Chrome')
}else{
    alert('你是使用其他的浏览器浏览网页！')
}


/**
 * 获取url中?符号后的参数
 */
function getRequest(){
  var u = location.search;
  var p = new Object();
  if (u.indexOf("?") != -1) {
  var str = u.substr(1);
  strs = str.split("&");
  for (var i = 0; i < strs.length; i++) {
       p[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
  }
  }
  return p;
}

var reqObj = getRequest();

console.log(reqObj);
if(reqObj.n == 'xxx'){
   console.log(1);
}


/**
 * js判断微信浏览器
 */
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}