// index.js
const ApiUtil = require('../../utils/api_util.js');
// 获取应用实例
const app = getApp();


Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        hkdRate: {
          ccyNbr: "未知", // 币种
          ratDat: "date", // 日期
          ratTim: "time", // 时间
          rtbBid: "0",    // 中间价
          rthBid: "0", // 现汇买入价
          rthOfr: "0"  // 现汇卖出价
        }
    },
    // 点击刷新
    bindViewTap: function () {
        this.getCmsRate()
    },

    onLoad: function (options) {
        // const deviceInfo = wx.getDeviceInfo()
        this.getCmsRate()
    },

    getCmsRate: function () {
        var that = this;
        ApiUtil.GetCMSRate().then(function (res) {
            console.log("点击刷新");
            var rates = res.body.data
            if (rates.length < 0) {
                return
            }
            that.setData({
                hkdRate: rates[0],
            });
        }).catch(function (err) {
            console.error(err);
        });
    }

})

/**
    ZCcyNbr: "港币"
    ZRatDat: "2023年05月31日"
    ZRatTim: "19:51:55"
    ZRtbBid: "90.73" 中间价
    ZRtcBid: "89.91" 现钞买入价  (c: cash)
    ZRtcOfr: "90.91" 现钞卖出价 (c: cash)
    ZRthBid: "90.55" 现汇买入价
    ZRthOfr: "90.91" 现汇卖出价

    交易币单位 100
    基本币   人民币
    现汇卖出价 90.91
    现钞卖出价 90.91
    现汇买入价 90.55
    现钞买入价 89.91
 */