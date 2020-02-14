
$(function () {
    
    window.song = {};

    $('.nav-text').on('click', 'span', function () {

        //获取data-module
        var module = $(this).data('module');
        // console.log('module ==> ', module)

        //隐藏
        $('[name="song1"]').hide();
        

        $('.' + module).show().attr('name', 'song1');

        $('.tupian').show();
        
        $('.gequ').empty();
    })

    //点击头像
  $('.portray').on('click', function () {

    $('.geci').show().animate({
      top: 0
    }, 300)

  })

})