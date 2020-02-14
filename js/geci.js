$(function () {

    //防止按下拖拽时出现卡音
    var isPress = false;
  
    //歌词面板
    window.index = 0;
  
    //控制条的进度条百分比
    window.percent = 0;
  
    //获取progress-box的宽度
    var progressBoxWidth = parseFloat($('.progress-box').css('width'));
    console.log('progressBoxWidth ==> ', progressBoxWidth);
  
    //获取mask宽度
    var maskWidth = $('.mask').width();
    console.log('maskWidth ==> ', maskWidth);
  
    //mask移动范围
    var minLeft = 0;
  
    var maxLeft = progressBoxWidth - maskWidth;
  
    var wordsBoxTop = parseFloat($('.words-box').css('top'));
    console.log('wordsBoxTop ==> ', wordsBoxTop);
  
    //监听音频实时变化
    audio.ontimeupdate = function () {
  
      if (isPress) {
        return;
      }
  
      var thisT = this.currentTime;
  
      // console.log(this.currentTime);

      var dt = $('.vbmo').data('time')  / 1000;
    //   console.log('dt ==> ', dt);
  
      var percent1 = thisT / dt;
  
      $('.currenttime').text(formatTime(thisT * 1000));
  
      //移动滑块
      $('.mask').css({
        left: maxLeft * percent1 + 'px'
      })
  
      //激活进度条
      $('.active-progress').css({
        width: (maxLeft * percent1) + maskWidth / 2 + 'px'
      })

  
    }
  
  
    $('.header-colse').on('click', function () {
  
      //隐藏歌词面板
      $('.geci').animate({
        top: '100%'
      }, 300, function () {
        $(this).hide();
      })
  
    })
  
  
  
    function move(e) {
      //获取相对于页面的x坐标
      var pageX = e.changedTouches[0].pageX;
      // console.log('pageX ==> ', pageX);
  
      var left = pageX - maskWidth / 2;
  
      left = left <= minLeft ? minLeft : left >= maxLeft ? maxLeft : left;
  
      //移动mask
      $('.mask').css({
        left: left + 'px'
      })
  
      //激活进度条
      $('.active-progress').css({
        width: left + 'px'
      })
  
  
      //设置音频进度
      percent = left / maxLeft;
  
    }
  
  
  
    //开始触碰屏幕
    $('.layer').on('touchstart', function (e) {
      isPress = true;
      move(e);
  
    })
  
    //在屏幕移动时
    $('.layer').on('touchmove', function (e) {
      move(e);
    })
  
    //离开屏幕时
    $('.layer').on('touchend', function () {
      var ct = audio.duration * percent;
      audio.currentTime = ct;
      $('.currenttime').text(formatTime(ct * 1000));
  
      isPress = false;
    })
  
  
  })