
// 获取招商银行汇率
async function GetCMSRate() {
    return new Promise((resolve, reject) => {
        wx.request({
            // url: BASE_URL + "/v1/mp2/get",
            url: "https://m.cmbchina.com/api/rate/getfxratedetail/?name=港币",
            method: "GET",
            data: {},
            timeout: 1500,
            success: function (res) {
                if (res.statusCode == 200) {
                    return resolve(res.data);
                }
                wx.showToast({
                    title: '请求失败\n' + res.statusCode,
                    icon: 'error',
                    duration: 1600,
                });
                reject(res);
            },
            fail: function (e) {
                const costMs = new Date().getTime() - start;
                console.error(`耗时：${costMs} ms`, `err: ${e}`);
                reject(e)
            }
        })
    })
}

module.exports = {
    GetCMSRate,
}