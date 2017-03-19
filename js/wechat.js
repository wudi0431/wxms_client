var foo = {};
foo.init = function () {
    this.getConfig();
};
//白名单验证
foo.getConfig = function () {
    var appId, timestamp, nonceStr, signature, shareData;
    var that = this;
    $.ajax({
        type:"GET",
        url:"http://wx.111.com.cn/WeixinActivity/Coupon0123/getJsapiTicket",
        data:{
            url:encodeURIComponent(window.location.href)
        },
        dataType:"json",
        success:function(msg){
            if (msg.appid && msg.appid!="" && msg.appid!=undefined) {
                appId = msg.appid;
                timestamp = msg.timestamp;
                nonceStr = msg.noncestr;
                signature = msg.signature;
            }
            wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });

            setTimeout(function () {
                that.share();
            }, 800);


        }
    });
};


foo.share = function () {
    var title = wxDate.title || '微信分享',
        text = wxDate.desc || '微信分享',
        picture = wxDate.imgUrl || 'http://d9.yihaodianimg.com/N02/M02/40/EB/CgQCsFLVBOOAE0boAAAK5UNpfUI56300.png';
    foo.shareJson = {
        "title": title,
        "text": text,
        "picture": picture
    };
    //that.getConfig();
    //分享接口调用
    wx.onMenuShareAppMessage({
        title: foo.shareJson.title,
        link: window.location.href,
        imgUrl: foo.shareJson.picture,
        desc: foo.shareJson.text

    });
    wx.onMenuShareTimeline({
        title: foo.shareJson.title,
        link: window.location.href,
        imgUrl: foo.shareJson.picture,
        desc: foo.shareJson.text
    });

};