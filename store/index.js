import Vue from 'vue'
import Vuex from 'vuex'
var jweixin = require('jweixin-module')
import tab_bar from "./modules/tab_bar.js"
import common from "../common.js"
Vue.use(Vuex)


/*
 *	dispatch.actions
 * 	commit.mutations
 * */
const store = new Vuex.Store({
	state: {
		loading: "0",
		appName: common.Interface.appName,
		phoneNumber: common.Interface.phoneNumber,
		user: {},
		openid: "",
		wxType: "gzh", //mp:小程序，gzh：公众号
		data: {},
		resumeTemp: {}, //简历临时模板
		interface: common.Interface,
		systemInfo: {},
		portrait: "",
		cosConfig: common.Interface.cosConfig,
		wxConfig: common.Interface.wxConfig,
		enterprise_id: "",
		page_index: 0,
		isWeixin: false,
		weChatAuthInfo: {},
		reOauth: false,
		testToken: "54c3904c055a1fe57f0251f102c5fe62e624edc8"
	},
	mutations: {
		switch_loading(state, status) {
			if (status == "change") {
				if (state.loading == '0') {
					state.loading = '1'
				} else {
					state.loading = '0'
				}
			} else {
				state.loading = status;
			}

		},
		set_phoneNumber(state, data) {
			state.phoneNumber = data
		},
		get_user(state, data) {
			console.log("store-get_user：", data)
			state.user = data
		},
		update_data(state, data) {
			state.data = data
		},
		update_detail(state, data) {
			state.detail = data
		},
		setSystemInfo(state, data) {
			state.systemInfo = data
		}
	},
	actions: {
		getData(ctx, parm) {
			ctx.commit("switch_loading", "1")
			let _parm = parm.parm || '';
			let _url = ctx.state.interface.apiurl + ctx.state.interface.addr[parm.inter] + _parm
			console.log("getData-url-", parm.inter, "：", _url)
			console.log("getData-parm-", parm.inter, "：", parm)
			var result = [];
			uni.request({
				url: _url,
				data: parm.data || {},
				method: parm.method || "GET",
				header: parm.header || {},
				success(res) {
					console.log("getData-success-", parm.inter, "：", res)
					//console.log(res)
					if (res.success) {
						ctx.commit("update_data", res.data.data)
					}
					result = res.data
				},
				fail(err) {
					console.log("getData-err-", parm.inter, "：", err)
					result = {
						"success": false,
						"msg": "接口请求失败",
						"err": err
					}
				},
				complete() {
					ctx.commit("switch_loading", "0")
					if (parm.fun) {
						new parm.fun(result)
					}
				}
			})
		},
		savePram(ctx, pram) {
			var enterprise_id = pram.enterprise_id ? pram.enterprise_id : ctx.state.enterprise_id;
			if (enterprise_id) {
				ctx.state.enterprise_id = enterprise_id;
			}
		},
		cheack_user(ctx) {
			var user = "";
			var _openid = "";
			uni.getStorage({
				key: "userWeb",
				success: function(res) {
					user = res.data;
					let timestamp = Math.round(new Date().getTime() / 1000);
					//console.log(!user.deathline, timestamp, user.deathline, user.openid, timestamp >= user.deathline)
					if (!user.deathline || timestamp >= user.deathline) {
						//console.log("deathline")
						if (user.openid && user.userType == "3") {
							//console.log("wx-openid")
							ctx.dispatch("menu_" + user.tabBarType);
							ctx.dispatch("wxXCXAuth", 'reCheack');
						} else {
							//console.log("removeStorage-user")
							uni.removeStorage({
								key: "userWeb"
							});
							ctx.dispatch("menu_default");
							user = {};
							uni.redirectTo({
								url: "/pages/index/index"
							})
						}
					} else {
						ctx.dispatch("menu_" + user.tabBarType);
					}
					ctx.commit("get_user", user)
				},
				fail() {
					ctx.commit("get_user", {})
					// uni.redirectTo({
					// 	url: "/pages/index/index"
					// })
				}
			})
		},
		cheack_page(ctx, index) {
			ctx.commit("change_page", index)
		},
		goback(ctx, url) {
			if (url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-out',
					animationDuration: 1000
				});
			} else {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right',
					animationDuration: 1000
				});
			}
		},
		queryString(ctx, value) {
			const reg = new RegExp(`(^|&)${value}=([^&]*)(&|$)`, 'i')
			const r = window && window.location.search.substr(1).match(reg)
			if (r != null) {
				return unescape(r[2])
			}
			return null
		},
		isWeixin(ctx) {
			let isWeixin = !!/micromessenger/i.test(navigator.userAgent.toLowerCase());
			ctx.state.isWeixin = isWeixin;
		},
		wxXCXAuth(ctx) {
			console.log("--wxXCXAuth--")
			let redirect_uri = ctx.state.interface.domain;
			let REDIRECT_URI = encodeURIComponent(redirect_uri), //授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
				scope = "snsapi_userinfo", //snsapi_base，snsapi_userinfo （弹出授权页面，获取更多信息）
				state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
			var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + ctx.state.wxConfig.AppID +
				'&redirect_uri=' +
				REDIRECT_URI +
				'&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
			//let code = ctx.dispatch("queryString", 'code');
			const reg = new RegExp(`(^|&)code=([^&]*)(&|$)`, 'i')
			const r = window && window.location.search.substr(1).match(reg)
			if (r != null) {
				let code = unescape(r[2])
				console.log("get-wxCode-success:", code)
				ctx.dispatch("getWeChatInfo", code)
			} else {
				console.log("get-wxCode-fail")
				window.location.href = _url;
			}
		},
		getWeChatInfo(ctx, data) {
			var parm = {
				inter: "weChatAuth",
				parm: `?code=${data}`
			};
			parm["fun"] = function(res) {
				console.log("getWeChatInfo:", res)
				if (res.success) {
					ctx.state.weChatAuthInfo = res.data;
					ctx.state.deathline = false;
					uni.setStorage({
						key: 'WeChatInfoWeb',
						data: res.data,
						success: function() {
							//console.log('success');
						}
					});
				}
			};
			ctx.dispatch("getData", parm)
		},
		checkSession() {
			/*检查登录状态是否过期*/
			uni.checkSession({
				success(e) {},
				fail(f) {},
				complete() {}
			});
		},
		logout(ctx) {
			var _openid = ctx.state.openid;
			console.log("_openid:", _openid)
			var _token = ctx.state.user.token;
			var _data = {
				"inter": "logout",
				"header": {
					"Content-Type": "application/json",
					"token": _token
				},
				"method": "DELETE"
			}
			if (_openid) {
				_data["header"]["openid"] = _openid
			}
			_data["fun"] = function(ress) {
				if (ress.success) {
					uni.removeStorage({
						key: 'userWeb',
						success: function(res) {},
						complete() {
							ctx.commit("get_user", {})
							ctx.dispatch("menu_default")
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}
					});
					uni.removeStorage({
						key: 'openidWeb',
						success: function(res) {}
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "退出失败，请重试..."
					})
				}
			}
			ctx.dispatch("getData", _data)
		},
		getBasePhone(ctx) {
			var _data = {
				"inter": "getBasePhone"
			}
			_data["fun"] = function(res) {
				console.log(res)
				if (res.success) {
					ctx.commit("set_phoneNumber", res.data.info)
				}
			}
			ctx.dispatch("getData", _data)
		},
		makePhoneCall(ctx, contactNumb) {
			//console.log(contactNumb || ctx.state.phoneNumber)
			uni.makePhoneCall({
				phoneNumber: contactNumb || ctx.state.phoneNumber
			});
		},
		getSystemInfo(ctx) {
			var systemInfo = {}
			uni.getSystemInfo({
				success(res) {
					systemInfo = res
					console.log(systemInfo);
				},
				complete() {
					ctx.commit("setSystemInfo", systemInfo)
				}
			});
		}
	},
	modules: {
		tab_bar
	}
})
export default store
