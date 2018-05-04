var KMLIB = window.KMLIB || {};

// 打开APP
KMLIB.OpenApp = (function(url){
    var init = function(url){
        console.log(url);
        var ua = navigator.userAgent.toLowerCase();
        var config = {
            iosScheme: 'kmzyw://kmb2b/',
            androidScheme: 'app://kmb2b/',
            timeout: 5000,
            downloadUrl: 'http://m.kmzyw.com.cn/resources/html/app-download.html'
        };
        function openClient() {
            //如果是微信在浏览器里面打开
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                //弹出提示层
                $(document.body).append("<div class='open-app-mask'></div>");
                return false;
            }
            var startTime = Date.now();
            var scheme = ua.indexOf('os') > 0 ? config.iosScheme : config.androidScheme;
            window.location.href = scheme + url;
            var t = setTimeout(function () {
                var endTime = Date.now();
                if (!startTime || endTime - startTime < config.timeout + 200)  $("#js-dialog").show();
            }, config.timeout);
            window.onblur = function () {
                clearTimeout(t);
            }
        }
        $(".js-dialog").on('click',function(){
            openClient();
            return false;
        });
    };
    return {
        Init: init
    }
})();

// 背景图片加载使用默认图
var qaImgItem = $(".qa-imgs-item");
if(qaImgItem && qaImgItem.length>0){
    qaImgItem.each(function(){
        var context = $(this),
            img = new Image(),
            src = $(this).css('backgroundImage') || '';
        if(src && src.match(/url\(\"?(.*)\"\)/)!=null){
            src = src.match(/url\(\"?(.*)\"\)/)[1];
        }else{
            // ios
            src = src.substring(4,src.length-1);
        }
        img.src = src;
        img.onerror=function(){
          context.css('backgroundImage','url("http://m.kmb2b.com/reswap/images/wap/question/error.jpg")');
        };
    });
}

// 图片懒加载
if(typeof echo === 'object'){
    echo.init({
        callback: function(element, op) {
            $(element).error(function(){
                $(element).attr("src","http://m.kmb2b.com/reswap/images/wap/question/error.jpg");
            });
        }
    });
}

// 悬浮下载APP入口
if(typeof Cookies === 'function'){
    var downValues = Cookies("figure");
    if (downValues != null && downValues != undefined) {
        if (downValues == '0') {
            $('.download_app').hide();
        } else {
            $('.download_app').show();
        }
    }
    $(".download_app .down_close").on('click', function() {
        $(".download_app").hide();
        Cookies('figure', '0', {
            expires: 1
        });
    });
}

// 问题详情页下拉加载
// http://m.kmb2b.com/questionAnswer_index.action
if($("#qa-wrap").length>0){
    var timeoutId = null;
    // 滚动回调判断是否到底部
    function callback(){
        const top = document.getElementById('qa-more').getBoundingClientRect().top
        const windowHeight = window.screen.height
        if(top && top < windowHeight){
            // 当wrapper已经被滚动到暴露在页面可视范围之内的时候，触发加载更多
            loadMoreFn()
        }
    }
    // 加载更多内容
    function loadMoreFn(){
        // 显示隐藏加载状态
        $("#qa-more").hide();
        $("#qa-loading").show();
        // 模拟ajax数据加载

        //获取页面参数
        var questionId = $("#questionId").val();
        var currentPageNo= $("#currentPageNo").val()||1;
        var currentPageSize = $("#currentPageSize").val()||10;
        var answerCount = $("#answerCount").val();

        //如果回答的总条数 小于 当前页面的容量currentPageNo*currentPageSize 表示已经加载完,不再加载
        if(answerCount <= currentPageNo*currentPageSize){
                // 显示隐藏加载状态
                $("#qa-more").hide();
                $("#qa-loading").hide();
                // 没有内容，修改文字
                $("#qa-more").text('没有更多内容').show();
        }else{
            $.ajax(
                {
                type:'post',
                url:'http://m.kmb2b.com/questionAnswer_moreQuestionItems.action',
                dataType:'html',
                data:{
                        'question.questionId':questionId,
                        'page.pageNo':1+parseInt(currentPageNo),
                        'page.pageSize':currentPageSize
                    },
                success: function(data){
                    $("#currentPageNo").val(1+parseInt(currentPageNo)||1);
                    $("#currentPageSize").val(currentPageSize||10);
                    var str = data;
                    // 加载内容
                    $(".an-list ul").append(str);


                    // 显示隐藏加载状态
                    $("#qa-more").show();
                    $("#qa-loading").hide();
                    // 判断有没有内容，如无内容，修改文字
                    $("#qa-more").text('没有更多内容').show();

                  }
                }
            )

        }
    }

    // 监听滚动
    window.addEventListener('scroll',function(){
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(callback,100)
    }.bind(this),false);
}

// 移动端滚动穿透问题完美解决方案
/*
css增加
body.modal-open {
    position: fixed;
    width: 100%;
}
*/
/**
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
  */
var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
})('modal-open');