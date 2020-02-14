$(function () {

    //开始截取下标
    var start = 0;

    //截取9条数据 

    var cont = 9;

    //标记是否存在数据
    var isHas = true;

    //生成页面数据
    function conteData(data) {

        $.each(data, function (i, v) {
            // console.log('i ==> ', i);
            // console.log('v ==> ', v);
            var div = $(`<div id="${v.id}" class="shujub">
            <div class="tupian"></div>
        <div class="mengceng">
            <div class="fr">
                <span class="fl mengceng-icon"></span>
                <span class="fl mengceng-list">${(v.playCount / 10000).toFixed(2)}万</span>
            </div>
        </div>
        <div class="aupo">
            <img class="auto-img"
                src="${v.picUrl}" alt="">
        </div>
        <div class="tuijian-font ge-text">${v.name}</div>
    </div>`);
            $('.tuijian-text').append(div);
        })
    }

    //获取缓存到的数据
    var neirongTop = localStorage.getItem('neirongTop');
    // console.log('neirongTop ==> ', neirongTop);

    //如果没有缓存数据，就需要在缓存数据
    if (!neirongTop) {

        $('.tupian').hide();
        console.log('没有缓存数据');

        //获取推荐音乐
        $.ajax({
            type: 'GET',
            url: 'http://www.arthurdon.top:3000/personalized',
            success: function (result) {
                // console.log('result ==> ', result);

                //存储缓存数据
                localStorage.setItem('neirongTop', JSON.stringify(result));

                neirongTop = result;

                //首次展示
                conteData(result.result.slice(start, start + cont));

                //重置下次截取的下标
                start += cont;

            },
            error: function (err) {
                //请求失败
                console.log('err ==> ', err);
            },
        })
    } else {
        //转换成普通对象用JSON.parse()这个方法转
        neirongTop = JSON.parse(neirongTop);

        console.log('存在');
        //首次展示9条数据
        conteData(neirongTop.result.slice(start, start + cont));

        //重置下次开始截取数据的下标
        start += cont;

    }

    //懒加载歌单数据
    //获取头部高度
    var headerHeight = parseFloat($('header').css('height'));
    // console.log('headerHeight ==> ', headerHeight);

    //保存当前滚动的所有定时器序号
    var timers = [];

    $('.neirong1').on('scroll', function () {

        if (!isHas) {
            console.log('没有更多数据可以加载');
            return;
        }
        //保留当前this的指向
        var self = this;

        //  console.log('aa');
        //scrollTop()方法
        // console.log($(this).scrollTop());
        // console.log('scrollTop() ==>', $(this).scrollTop());

        var timer = setTimeout(function () {

            for (var i = 1; i < timers.length; i++) {
                clearTimeout(timers[i]);
            }

            //因为this在函数里面，函数没有人调，所以this会指向window，所以在函数里面用this就会丢失，所以要在外层函数保留一个this
            var scrollTop = $(self).scrollTop()
            console.log('scrollTop ==> ', scrollTop);

            //获取最后一个节点
            var last = $('.shujub').last();

            var lastTop = last.offset().top;
            console.log('top ==>', last.offset().top);
            console.log('lastTop ==> ', lastTop)

            var lastHeight = parseFloat(last.css('height'));
            // console.log('scrollTop + headerHeight + lastHeight ==> ',scrollTop + headerHeight + lastHeight);

            if (scrollTop + headerHeight + lastHeight >= lastTop) {
                console.log('触发');
                var data = neirongTop.result.slice(start, start + cont);
                // console.log('data ==> ', data);

                //每次次展示9条数据
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


    //绑定推荐点击事件歌单的
    $('.tuijian-text').on('click', '.tupian', function () {
        // console.log('aaa');

        // var songId = $(this).attr('id');
        var songId = $(this).parent('.shujub').attr('id')
        console.log('songId ==> ', songId);

        $('.tupian').show();

        //根据歌单id获取歌单的情况
        $.ajax({
            type: 'GET',
            url: 'http://www.arthurdon.top:3000/playlist/detail?id=' + songId,
            success: function (result) {
                console.log('result ==> ', result);

                $('.tupian').hide();

                $('.neirong1').hide().attr('name', 'song0');

                $('.neirongbdan').show().attr('mame', 'song1');

                //绑定歌曲数据
                $('.aopm').text(result.playlist.name);


                var data = result.playlist.tracks.slice(0, 20);
                // console.log('data ==> ',data);


                localStorage.setItem('rongsong', JSON.stringify(result))

                $.each(data, function (i, v) {

                    // console.log('v ==>', v)

                    var div = $(`<div class="vbmo" data-id="${v.id}" data-time="${v.dt}" data-play="0">
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

         //保存专辑id
        song.id = result.playlist.id;

            }
        })
    })

})