window.app = {};

//var SERVER = 'http://192.168.0.115:8081/api/';
var SERVER = 'http://www.gyyxjqd.com/phone/api/';
// var SERVER = 'http://localhost:3000/';
app.route = {
	//主页
	ROUTE_GET_HOME_DATA_ONE: SERVER + 'getHomeDataOne', //获取主页数据1
	ROUTE_GET_HOME_DATA_TWO: SERVER + 'getHomeDataTwo', //获取主页数据2
	ROUTE_GET_PERSONAL_DATA: SERVER + 'getPersonalInfo', //获取个人信息
	//商品分类
	ROUTE_GET_CATEGORIES_LIST: SERVER + 'getGoodsList', //获取商品类别表
	//搜索
	ROUTE_GET_SEARCH_DATA: SERVER + 'getCommonSearchData', //获取搜索页面数据
	ROUTE_GET_SEARCH_RESULT: SERVER + 'searchData',//获取搜索结果
	//个人中心
	ROUTE_GET_INTEGRAL_EXCHANGE_DATA: SERVER + 'integralExchange', //获取积分换购
	ROUTE_GET_INTEGRAL_DETAIL_DATA: SERVER + 'getExchangeGoodsDetail',//获取换购详情
	ROUTE_DO_EXCHANGE: SERVER + 'exchange',	//换购商品
	ROUTE_GET_SHOP_COLLECTION_DATA: SERVER + 'getConllectShopList', 	//获取收藏的商店
	ROUTE_GET_COMMODITY_COLLECTION_DATA: SERVER + 'getConllectGoodsList', //获取收藏的商品
	ROUTE_APPLY_MERCHANT: SERVER + 'applyToBeBusiness',  //申请成为商家
	//订单
	ROUTE_GET_WAIT_PAY_ORDER: SERVER + 'getMyNoPayOrder',  //获取待支付订单
	ROUTE_GET_WAIT_DELIVER_ORDER: SERVER + 'getMyPayOrder',  //获取待收货订单
	ROUTE_GET_WAIT_RECEIVE_ORDER: SERVER + 'getUnReceiveOrder',  //获取待接收订单
	ROUTE_GET_WAIT_COMMENT_ORDER: SERVER + 'getUnScoreOrder',  //获取待评论订单
	ROUTE_ENSURE_RECEIVE_ORDER: SERVER + 'completeOrder',  //确认收货
	ROUTE_DELETE_ORDER: SERVER + 'delMyOrder',  //删除订单
	//购物车
	ROUTE_GET_TROLLEY_LIST: SERVER + 'getShoppingCartData',//获取购物车页面数据
	ROUTE_GET_SHOPPING_DATA: SERVER + 'getShoppingData',//获取购买页面数据
	ROUTE_ADD_SHOPPING_CART: SERVER + 'addShoppingCart',//加入购物车
	ROUTE_SUBMIT_SHOPPING_CART_DATA: SERVER + 'submitShoppingCartData',//完成购物车编辑
	ROUTE_GET_ORDER_NO: SERVER + 'getOrderNo',//提交支付1 生成订单号
	ROUTE_TO_PAY: SERVER + 'toPay',//提交支付2 根据订单号提交微信支付申请
	//商品详情
	ROUTE_GET_GOODS_DETAILS_DATA: SERVER + 'getGoodsDetail',//获取商品详情
	ROUTE_GET_SHOP_DETAILS_DATA: SERVER + 'getShopInfo',//店铺信息
	ROUTE_GET_SHOP_GOODS_LIST_DATA: SERVER + 'getShopGoodsInfo',//店铺商品列表信息
	ROUTE_GET_SUMIT_COLLECT_GOODS_DATA: SERVER + 'collectGoods',//收藏商品
	ROUTE_GET_LIKE_GOODS_DATA: SERVER + 'showingLove',//商品点赞
	ROUTE_GET_APPRAISE_LIST: SERVER + 'getCommentData',//获取评论列表
	ROUTE_POST_APPRAISE_DATA: SERVER + 'submitComment',// 提交评论
	ROUTE_POST_COLLECTSHOP_DATA: SERVER + 'collectShop',// 收藏店铺
	//分销商
	ROUTE_GET_MY_DISTRIBUTOR_DATA: SERVER + 'myTeam', //我的分销商
	ROUTE_GET_THIRDPARTY_CENTRE_DATA: SERVER + 'getDistributionInfo', //个人分销信息
	ROUTE_GET_THIRDPARTY_EDITPERSONAL_SUBMIT: SERVER + 'submitDistributionInfo', //提交个人信息
	ROUTE_GET_THIRDPARTY_APPLY_SUBMIT: SERVER + 'applyDistributor', //成为分销商
	ROUTE_GET_THIRDPARTY_CODE_DATA: SERVER + 'getDistributorQR', //获取二维码
	ROUTE_GET_THIRDPARTY_STATISTICS_DATA: SERVER + 'myProfitStatisticsInfo', //分销统计
	ROUTE_GET_THIRDPARTY_DETAIL_DATA: SERVER + 'getProfitdetail', //分润明细
	ROUTE_GET_THIRDPARTY_DETAILCASH_DATA: SERVER + 'withdrawCashRecord', //分润提现记录明细
	ROUTE_GET_THIRDPARTY_DISTRIBUTORORDER_DATA: SERVER + 'distributorOrder', //订单
	ROUTE_GET_THIRDPARTY_RANKING_DATA: SERVER + 'distributorRankingList', //排行榜
	ROUTE_GET_THIRDPARTY_WITHDRAW_DATA: SERVER + 'applyCash', //提现申请
	//微信
	ROUTE_GET_WX_CONFIG: SERVER + 'wxConfig', //获取微信配置
	ROUTE_GET_WECHAT_WARRANT: SERVER + 'weChatWarrant', //获取微信OPENID
	ROUTE_GET_WECHAT_ADDRESS: SERVER + 'addressReq', //获取微信共享地址

};

app.global = (function() {
	var ls = window.localStorage;
	var GLOBAL = "app_global";
	var global = {
		set: function(key, data) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			global[key] = data;
			ls[GLOBAL] = JSON.stringify(global);
		},
		add: function(key, data) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			global[key].push(data);
			ls[GLOBAL] = JSON.stringify(global);
		},
		get: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			return global[key];
		},
		getOnce: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			var ret = global[key];
			if (ret != null) {
				delete global[key];
			}
			ls[GLOBAL] = JSON.stringify(global);
			return ret;
		},
		clear: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			delete global[key];
			ls[GLOBAL] = JSON.stringify(global);
		}
	};
	return global;
})();

app.router = (function() {
	var ls = window.localStorage;
	var HISTORY = "app_history";
	var TRANS_PARAM = "tans_param";
	var scrollTop = undefined;
	function getAbsolutePath(from, path) {
		if (from[0] === '/') {
			return from;
		}
		var parr = path.split('/').slice(0, -1);
		var farr = from.split('/');
		for (var i in farr) {
			var item = farr[i];
			if (item === '.') {
				continue;
			} else if (item === '..') {
				parr.pop();
			} else {
				parr.push(item);
			}
		}
		return parr.join('/');
	}
	var router = {
		showView: function(url, param, saved, getScrollTop) {
			scrollTop = undefined;
			var history = JSON.parse(ls[HISTORY] || '[]');
			history.push({
				href: window.location.href,
				path: window.location.pathname,
				saved: saved,
				scrollTop: getScrollTop ? getScrollTop() : $(document.body).scrollTop(),
				from: getAbsolutePath(url, window.location.pathname),
			});
			ls[HISTORY] = JSON.stringify(history);
			ls[TRANS_PARAM] = JSON.stringify(param||{});
			window.location.href = url;
		},
		pop: function(step, param) {
			var history = JSON.parse(ls[HISTORY] || '[]');
			if (!step) {
				step = 1;
			}
			var obj, len = history.length;
			obj = history[len - step];
			if (obj) {
				(step - 1) && history.splice(len - step, step - 1);
				ls[HISTORY] = JSON.stringify(history);
				window.location.href = obj.href;
			}
		},
		getSavedData: function() {
			var history = JSON.parse(ls[HISTORY] || '[]');
			var item = history[history.length - 1];
			if (!item) {
				return {};
			}
			var path = window.location.pathname;
			if (item.path == path) {
				history.pop();
				ls[HISTORY] = JSON.stringify(history);
				scrollTop = item.scrollTop;
				this.from = item.from;
				this.isBack = true;
				return item.saved || {};
			} else {
				this.from = item.path;
				this.isBack = false;
				return {};
			}
		},
		resetScollerBar: function(setScrollTop) {
			if (scrollTop != undefined) {
				if (setScrollTop) {
					setScrollTop(scrollTop);
				} else {
					$(document.body).scrollTop(scrollTop);
				}
			}
		},
		getParameter: function() {
			var ret = {};
			window.location.search.substr(1).replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				ret[decodeURIComponent(key)] = decodeURIComponent(value);
			});
			var param = JSON.parse(ls[TRANS_PARAM] || '{}');
			ls[TRANS_PARAM] = '{}';
			for (var key in ret) {
				param[key] = ret[key];
			}
			console.log('pass:', param);
			return param;
		},
		setBackParameter: function(data) {
			var param = JSON.parse(ls[TRANS_PARAM] || '{}');
			for (var key in data) {
				param[key] = data[key];
			}
			ls[TRANS_PARAM] = JSON.stringify(param);
		},
		clearHistory: function() {
			ls[HISTORY] = '[]';
		}
	};
	return router;
})();


app.utils = {
	get: function(opt) {
		var self = this;
		opt.type = "GET";
		if (!opt.dataType) { //默认返回数据时json，如果不是需要手动设置
			opt.dataType = 'json';
		}
		if (!opt.timeout) {
			opt.timeout = 30000;
		}

		opt.beforeSend = function(request) {
            request.setRequestHeader("apikey", "41a92c6e398afc79efd35252a630639b");
        };

		opt.data = JSON.stringify(opt.data);
		console.log('send:', opt.url, opt.data);
		var error = opt.error; //opt的error return true 终止传递
		opt.error = function(ret, type) {
			if (!error || !error(ret, type)) {
				self.showNetError(type);
				self.clearWait();
			}
		}
		var success = opt.success;
		opt.success = function(ret, type) {
			console.log('recv:', opt.url, ret);
			success(ret);
		}
		$.ajax(opt);
		return true;
	},
	post: function(opt) {
		var self = this;
		opt.type = "POST";
		if (!opt.dataType) { //默认返回数据时json，如果不是需要手动设置
			opt.dataType = 'json';
		}
		if (!opt.timeout) {
			opt.timeout = 30000;
		}

//		opt.beforeSend = function(request) {
//          request.setRequestHeader("version", "1.0.0");
//      };

		opt.data = JSON.stringify(opt.data);
		console.log('send:', opt.url, opt.data);
		var error = opt.error; //opt的error return true 终止传递
		opt.error = function(ret, type) {
			if (!error || !error(ret, type)) {
				self.showNetError(type);
				self.clearWait();
			}
		}
		var success = opt.success;
		opt.success = function(ret, type) {
			console.log('recv:', opt.url, ret);
			success(ret);
		}
		$.ajax(opt);
		return true;
	},
	showNetError: function(type) {
		if (type == "timeout") {
			this.showError("网络超时");
		} else if (type == "parsererror") {
			this.showError("数据解析错误");
		} else {
			this.showError("服务器异常");
		}
	},
	showError: function(text) {
		mui.toast(text);
	},
	setWait: function(text) {
		var el = $("#mask_container");
		if (el.length) {
			return;
		}
		var opts = {
			lines: 12, // 花瓣数目
			length: 10, // 花瓣长度
			width: 3, // 花瓣宽度
			radius: 10, // 花瓣距中心半径
			corners: 1, // 花瓣圆滑度 (0-1)
			rotate: 0, // 花瓣旋转角度
			direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
			color: '#FBDC9F', // 花瓣颜色
			speed: 1, // 花瓣旋转速度
			trail: 60, // 花瓣旋转时的拖影(百分比)
			shadow: false, // 花瓣是否显示阴影
			hwaccel: false, //spinner 是否启用硬件加速及高速旋转
			className: 'spinner', // spinner css 样式名称
			zIndex: 2e9, // spinner的z轴 (默认是2000000000)
			//      top: 'auto', // spinner 相对父容器Top定位 单位 px
			//      left: 'auto'// spinner 相对父容器Left定位 单位 px
		};
		this.spinner = new Spinner(opts);
		var el = $('<div id="mask_container""><div class="modal-backdrop"></div><div class="spinner-text-container">' + (text||'') + '</div></div>');
		$(document.body).append(el);
		this.spinner.spin(el[0]); //打开等待加载
	},
	clearWait: function() {
		var el = $("#mask_container");
		if (!el.length) {
			return;
		}
		el.remove();
		this.spinner.spin(); //关闭等待加载
	},
};

app.weixin = (function() {
	wx.ready(function(){
		console.log('wx.ready');
		app.weixin.getWeixinConfigSuccessCallback && app.weixin.getWeixinConfigSuccessCallback();
	});
	wx.error(function(){
		console.log('wx.error');
		app.weixin.getWeixinConfigFromServer();
	});
	var weixin = {
		setWeixinMenuShare: function(url, data) {
			data = data||{};
			var urlStr = '';
			var arr = url.split('?');
			if (data.type === 1) {//商品详情
				urlStr = encodeURIComponent(arr[0]+'?goodsID='+data.goodsID+'&openID=')+app.global.get("wechatInfo").openID;
			} else if (data.type === 2) {//店铺详情
				urlStr = encodeURIComponent(arr[0]+'?shopID='+data.shopID+'&openID=')+app.global.get("wechatInfo").openID;
			} else if (data.type === 3) {//我的二维码
				urlStr = encodeURIComponent(arr[0]+'?distributorQR='+data.shopID+'&distributorQR=')+app.global.get("wechatInfo").openID;
			} else { //主页
				urlStr = encodeURIComponent(arr[0]+'?openID=')+app.global.get("wechatInfo").openID;
			}

			//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
			wx.onMenuShareTimeline({
				title: '赢销截拳道电子商城', // 分享标题
				link:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect', // 分享链接
				imgUrl: 'http://www.gyyxjqd.com/group1/M00/00/0E/i4FjuVatmf6AY4-HAADH6LKtihE146.png', // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					// alert("shareurl:"+'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
//					alert("分享朋友成功1");
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			//获取“分享给朋友”按钮点击状态及自定义分享内容接口
			wx.onMenuShareAppMessage({
				title: '赢销截拳道电子商城', // 分享标题
				desc: $('.mui-title').text(), // 分享描述
				link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect', // 分享链接
				imgUrl: 'http://www.gyyxjqd.com/group1/M00/00/0E/i4FjuVatmf6AY4-HAADH6LKtihE146.png', // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// alert("shareurl:"+'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
//					alert("分享朋友成功2");
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			//获取“分享到QQ”按钮点击状态及自定义分享内容接口
			wx.onMenuShareQQ({
				title: '赢销截拳道电子商城', // 分享标题
				desc: $('.mui-title').text(), // 分享描述
				link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect', // 分享链接
				imgUrl: 'http://www.gyyxjqd.com/group1/M00/00/0E/i4FjuVatmf6AY4-HAADH6LKtihE146.png', // 分享图标
				success: function () {
				   // 用户确认分享后执行的回调函数
				//    alert("shareurl:"+'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f776c4a6e6d5ce5&redirect_uri='+urlStr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
//				   alert("分享朋友成功3");
				},
				cancel: function () {
				   // 用户取消分享后执行的回调函数
				}
			});
		},
		registerWeixinConfig: function(url, success) {
			console.log("getWeixinConfig", url);
			app.weixin.getWeixinConfigSuccessCallback = success;
			app.weixin.getWeixinConfigFromServer = function() {
					app.utils.post({
					url: app.route.ROUTE_GET_WX_CONFIG,
					data: {url: url},
					success: app.weixin.getWeixinConfigFromServerSuccess
				});
			};
			var weixinConfig = app.global.get("weixinConfig");
			if (!weixinConfig) {
				console.log("getWeixinConfig from server");
				app.weixin.getWeixinConfigFromServer();
			} else {
				console.log("getWeixinConfig from local");
				app.weixin.doRegisterWeixinConfig(weixinConfig);
			}
		},
		doRegisterWeixinConfig: function(config) {
			console.log('config', config);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: config.appId, // 必填，公众号的唯一标识
				timestamp: config.timestamp, // 必填，生成签名的时间戳
				nonceStr: config.nonceStr, // 必填，生成签名的随机串
				signature: config.signature,// 必填，签名，见附录1
				jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		},
		getWeixinConfigFromServerSuccess: function(data) {
			if (data.success === true && data.context) {
				app.global.set("weixinConfig", data.context);
				app.weixin.doRegisterWeixinConfig(data.context);
			} else {
				app.weixin.closeWindowOnError();
			}
		},
		getWechatWarrant: function(code,openID, callback) {
			var url = app.route.ROUTE_GET_WECHAT_WARRANT;
			var data = {
				code: code,
				openID: openID //自己点开的不带openID, 分享的为分享者的openID
			};
			app.weixin.getWechatWarrantCallback = callback;
			app.utils.post({
				url: url,
				data: data,
				success: app.weixin.getWechatWarrantSuccess
			});
		},
		getWechatWarrantSuccess: function(data) {
			if (data.success === true) {
				var config = data.context;
				app.global.set("wechatInfo", config);
				app.weixin.getWechatWarrantCallback(config.openID);
			} else {
				app.weixin.closeWindowOnError();
			}
		},
		closeWindowOnError: function() {
			mui.toast("获取微信配置失败，请稍后重试");
			setTimeout(function() {
				// wx.closeWindow();
			}, 3000);
		},
		getWechatAddress: function(callback)  {
			var url = app.route.ROUTE_GET_WECHAT_ADDRESS;
			var urlData = window.location.href;
			var data = {
				accessToken:app.global.get("wechatInfo").accessToken,
				url:urlData
			}
			app.weixin.getWechatWarrantCallback = callback;
			app.utils.post({
				url: url,
				data: data,
				success: app.weixin.getWechatAddressSuccess,
			});
		},
		getWechatAddressSuccess: function(data) {
			if (data.success === true && data.context) {
				var dataContext = data.context;
				var send = {
					"appId": dataContext.appId,
					"scope": "jsapi_address",
					"signType": "sha1",//dataContext.signType,
					"addrSign": dataContext.addrSign,
					"timeStamp": dataContext.timeStamp,
					"nonceStr": dataContext.nonceStr
				};
				WeixinJSBridge.invoke('editAddress',send, function(res) {
					//若res 中所带的返回值不为空,则表示用户选择该返回值作为收货地址。 //否则若返回空,则表示用户取消了这一次编辑收货地址。
					app.weixin.getWechatWarrantCallback(res);
				});
			}
		},
		getOrderNo: function() {
			var url = app.route.ROUTE_GET_ORDER_NO;
			var personal = app.global.get('personal');
			if (!personal.receiveName || !personal.receivePhone || !personal.receiveAddr) {
				mui.toast("收货人信息不完整");
				return;
			}
			var data = {
				integral: 0,//app.global.get('personal').integral,
				goodsList: getPayGoodsList(app.global.get('goodsList')),
				openID: app.global.get("wechatInfo").openID,
				receiveName :personal.receiveName,
				receivePhone :personal.receivePhone,
				receiveAddr :personal.receiveAddr,
			};
			app.utils.setWait('请稍后...');
			app.utils.post({
				url: url,
				data: data,
				success: app.weixin.getOrderNoSuccess,
			});
		},
		getOrderNoSuccess: function(data) {
			if (data.success === true && data.context) {
				var dataContext = data.context;
				app.weixin.toPay(dataContext.orderNo);
			} else {
				app.utils.clearWait();
				mui.toast("获取订单失败，请稍后重试");
			}
		},
		toPay: function(list) {
			var url = app.route.ROUTE_TO_PAY;
			var data = {
				openID: app.global.get("wechatInfo").openID,
				orderNoList:list
			}
			app.utils.post({
				url: url,
				data: data,
				success: app.weixin.toPaySuccess,
			});
		},
		toPaySuccess: function(data) {
			if (data.success === true  && data.context) {
				var dataContext = data.context;
				var send = {
					"appId" : dataContext.appId,     //公众号名称，由商户传入
		           	"timeStamp":dataContext.timeStamp,         //时间戳，自1970年以来的秒数
		           	"nonceStr": dataContext.nonceStr, //随机串
		           	"package" : dataContext['package'],
		           	"signType" : dataContext.signType,         //微信签名方式：
		           	"paySign" : dataContext.sign //微信签名
				};
				app.utils.clearWait();
				//此处调用微信支付控件支付
				WeixinJSBridge.invoke('getBrandWCPayRequest',send, function(res) {
//					alert("getBrandWCPayReques:"+ JSON.stringify(res));
					if(res.err_msg === "get_brand_wcpay_request:ok" ) {
						mui.toast("支付成功");
						app.global.set('needUpdateTrolley', true);
						mui.back();
					} else {
						mui.toast("支付失败，请稍后重试");
					}
				});
			} else {
				app.utils.clearWait();
				mui.toast("预付费失败，请稍后重试");
			}
		},
	};
	return weixin;
})();

