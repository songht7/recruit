<template>
	<view class="user-login">
		<block>
			<view class="login-block">
				<view class="login-label"><text class="label">绑定关联手机号</text></view>

				<view :class="['login-input',phoneErr?'phone-err':'']">
					<view class="input-left">
						<uni-icons type="p-shouji" size="18" color="#999"></uni-icons>
						<input class="user-input" type="number" maxlength="11" @focus="onFocus" placeholder="手机号" v-model="formData['phone']" />
					</view>
				</view>
				<view class="login-input">
					<view class="input-left">
						<uni-icons type="yanzhengma" size="18" color="#999"></uni-icons>
						<input class="user-input" type="text" maxlength="6" v-model="formData['code']" placeholder="验证码" />
					</view>
					<view :class="['get-code',seandCode?'loading':'']" @click="getCode">{{seandCode?count+'s 重新获取':'获取验证码'}}</view>
				</view>
				<view class="login-btns">
					<view class="login-btn" @click="login">登录</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	var rule = [{
		name: "phone",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "请填写正确的手机号"
	}];
	export default {
		data() {
			return {
				title: '登录',
				pageIs: 'phone',
				disbale: true,
				phoneErr: false,
				loading: false,
				seandCode: false,
				count: 60,
				formData: {
					phone: '',
					code: ''
				},
				token: "",
				WeChatInfo: {}
			}
		},
		onLoad() {
			var that = this;
			uni.getStorage({
				key: 'WeChatInfoWeb',
				success: function(res) {
					console.log(res.data);
					that.WeChatInfo = res.data;
				}
			});
		},
		onShow() {
			var that = this;
		},
		methods: {
			login(val) {
				var that = this;
				console.log(that.formData)
				var that = this;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				var rules = [...rule, {
					name: "code",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "验证码不能为空"
				}];
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, rules);
				if (checkRes) {
					that.loading = true;
					var _token = that.$store.state.testToken ? that.$store.state.testToken : that.WeChatInfo.token;
					var parm = {
						inter: "savePhone",
						method: "POST",
						header: {
							token: _token
						},
						data: that.formData
					};
					console.log("login:", parm)
					parm["fun"] = function(res) {
						console.log(res)
						that.loading = false;
						if (res.success) {
							uni.navigateTo({
								url: '/pages/user/index'
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
					};
					that.$store.dispatch("getData", parm)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			checkPhone() {
				var that = this;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					that.disbale = false
				} else {
					that.phoneErr = true;
					that.disbale = true;
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			onFocus() {
				var that = this;
				that.phoneErr = false;
				that.disbale = true;
			},
			getCode() {
				var that = this;
				if (that.seandCode) {
					return
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				var __rule = rule;
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, __rule);
				if (checkRes) {
					that.seandCode = true;
					that.countDown();
					console.log(that.formData)
					var parm = {
						inter: "sendSms",
						parm: `?phone=${that.formData.phone}`
					};
					parm["fun"] = function(res) {
						console.log(res)
						if (res.success) {

						}
					};
					that.$store.dispatch("getData", parm)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			countDown() {
				var that = this;
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							that.seandCode = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
			}
		}
	}
</script>

<style scoped>
	.user-login {
		padding: 100rpx 30rpx 30rpx;
	}

	.login-block {
		display: flex;
		flex-direction: column;
	}

	.login-label {
		line-height: 1.6;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: column;
	}

	.label {
		font-size: 45rpx;
		color: #000;
	}

	.sub-label {
		font-size: 35rpx;
		color: #848383;
	}

	.login-input {
		padding: 10rpx;
		border-bottom: 2rpx solid #eee;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		margin-bottom: 30rpx;
	}

	.input-left {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.phone-err {
		border-color: #FF3333
	}

	.user-input {
		line-height: 2;
		font-size: 34rpx;
		color: #666;
		padding: 0 10rpx;
	}

	.login-btns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.login-btn {
		width: 100%;
		background: #3a78ea;
		border-radius: 10rpx;
		line-height: 2;
		border: 2rpx solid #3a78ea;
		color: #FFFFFF;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
	}

	.get-code {
		color: #007AFF;
	}

	.disbale-btn,
	.loading {
		color: #666;
	}
</style>
