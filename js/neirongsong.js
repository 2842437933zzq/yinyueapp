$(function () {


    //开始截取下标
    var start = 12;

    //截取9条数据 

    var cont = 12;

    //标记是否存在数据
    var isHas = true;

    //获取audio转换为dom元素
    var audio = $('#audio')[0];


    var baseAudioUrl = 'http://www.arthurdon.top:3000/song/url';

    //生成数据
    function conteData(data) {

        $.each(data, function (i, v) {

            // console.log('v==> ', v);

            var div = $(` <div class="vbmo" data-id="${v.id}" data-time="${v.dt}" data-play="0">
        <div class="fl guomp">
        <span class=" fl geshou">${v.ar[0].name}</span>
        <span class="fl commp">-</span>
        <span class="fl nmpo">${v.name}</span>
        </div>
   
    <div class="fr auxiliary clearfix">
        <span class="fr icon-xiao"></span>
        <span class="fr icon-zxiao"></span>
        <span class="fr icon-xxiao"></span>
    </div>
    </div>`);
            $('.gequ').append(div);


        })


    }

    //保存当前滚动的所有定时器序号
    var timers = [];

    //懒加载歌单数据
    //获取头部高度
    var headerHeight = parseFloat($('header').css('height'));
    // console.log('headerHeight ==> ', headerHeight);


    $('.neirongbdan').on('scroll', function () {

        if (!isHas) {
            return;
        }
        //保留当前this的指向
        var self = this;

        // console.log('aa');
        // // // scrollTop()方法
        // console.log($(this).scrollTop());
        // console.log('scrollTop() ==>', $(this).scrollTop());

        //获取缓存的数据
        var rongsong = JSON.parse(localStorage.getItem('rongsong'));
        // console.log('rongsong ==> ', rongsong);
        var songData = rongsong.playlist.tracks;
        // console.log('songData ==> ', songData);

        var timer = setTimeout(function () {

            for (var i = 1; i < timers.length; i++) {
                clearTimeout(timers[i]);
            }

            //因为this在函数里面，函数没有人调，所以this会指向window，所以在函数里面用this就会丢失，所以要在外层函数保留一个this
            var scrollTop = $(self).scrollTop()
            // console.log('scrollTop ==> ', scrollTop);

            //获取最后一个节点
            var last = $('.vbmo').last();


            var lastTop = last.offset().top;
            // console.log('top ==>', last.offset().top);
            console.log('lastTop ==> ', lastTop)

            var lastHeight = parseFloat(last.css('height'));
            // console.log('lastHeight==>',lastHeight)
            var height = lastHeight * 12;
            // console.log('height==>',height)

            // console.log('scrollTop + headerHeight + lastHeight + height ==> ',scrollTop + headerHeight + lastHeight + height);

            if (scrollTop + headerHeight + lastHeight + height >= lastTop) {
                console.log('触发');
                var data = songData.slice(start, start + cont);
                // console.log('data ==> ', data);

                //每次次展示12条数据 
                conteData(data);

                //重置下次开始截取数据的下标
                start += cont;
                if (data.lenght < cont) {
                    isHas = false;
                }


            }

            timers = [];

        }, 400)

        timers.push(timer);

    })

    //播放
    audio.oncanplay = function () {

        console.log('可以播放');
        this.play();

        $('.play').css({
            backgroundImage: 'url("./icons/音乐播放.png")'
          })

        //   var picUrl = $.v.al.picUrl;
        //   $('.portray').find('img').attr('src', )


    }

    $('.gequ').on('click', '.vbmo', function () {

       
       if($('.vbmo').data('play')){

            // if ($('.vbmo').data('play') == 0) {
            //     audio.pause();
            //     $('.vbmo').data('play').data('play', 1)
            // } else {
            //     audio.play();
            //     $('.vbmo').data('play').data('play', 0)
            // }

        } else {

            //歌曲id
            var songId = $(this).data('id');
            // console.log('songId ==> ', songId);

            $.ajax({
                type: 'GET',
                url: baseAudioUrl,
                data: {
                    id: songId
                },
                success: function (result) {
                    console.log('result ==> ', result);

                    //设置audio链接
                    $(audio).attr('src', result.data[0].url);

                }
            })
        }

    })



})