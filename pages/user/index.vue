<template>
	<view class="content">
		<view id="UserHeader">
			<view class="user-build">
				<!-- <uni-icons class="build-btn" type="shezhi" :size="32" color="#fff" @click="userBuild"></uni-icons> -->
			</view>
			<view class="user-info">
				<view class="user-info-left">
					<view class="user-name" @click="userBinding">{{userInfo.name?userInfo.name:""}}</view>
					<view class="user-resume-build" @click="resumeBtn">
						<view class="reume-label">我的在线简历</view>
					</view>
				</view>
				<view class="user-info-right">
					<view class="portrait">
						<image v-if="portrait" class="portrait-img" :src="portrait" mode="aspectFit"></image>
						<uni-icons v-else class="portrait-img" type="touxiang1" size="60" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
			<view class="reume-count">
				<view class="count-block">
					<view class="count-numb">{{mTotal}}</view>
					<view class="count-label">近一月</view>
				</view>
				<view class="count-block">
					<view class="count-numb">{{total}}</view>
					<view class="count-label">投递总数</view>
				</view>
			</view>
		</view>
		<view class="user-main">
			<!-- <view class="record">
				<view class="record-val">附件简历</view>
				<view class="record-info">未上传</view>
			</view> -->
			<view class="record" @click="navigateTo('/pages/user/record')">
				<view class="record-val record-apply">申请记录</view>
				<view class="record-info">{{total}} 条</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import moment from "moment";
	export default {
		data() {
			return {
				title: '我的',
				portrait: false,
				userInfo: {},
				total: 0,
				mTotal: 0
			}
		},
		onLoad() {
			//this.getData('accountSupports');
		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
			var _weChatAuthInfo = that.$store.state.weChatAuthInfo;
			if (_weChatAuthInfo.token) {
				that.userInfo = _weChatAuthInfo;
				that.portrait = _weChatAuthInfo.wechat ? _weChatAuthInfo.wechat.headimgurl : false;
			}
			that.getData('supportsTotal', 'total');
			let Today = that.getToday();
			let LastMonthDays = that.getLastMonthDays();
			that.getData('supportsTotal', 'mTotal',
				`?start_time=${LastMonthDays.starttime.split(" ")[0]}&end_time=${Today.starttime.split(" ")[0]}`);
		},
		methods: {
			getData(url, type, parms) {
				var that = this;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: url,
					header: {
						token: _token
					},
					parm: parms
				};
				parm["fun"] = function(res) {
					if (res.success) {
						if (type == 'mTotal') {
							that.mTotal = res.data.total;
						} else {
							that.total = res.data.total;
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				};
				that.$store.dispatch("getData", parm)
			},
			getToday() { // 获取今日的开始结束时间
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
				obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss");
				return obj
			},
			getCurrMonthDays() { // 获取当前月的开始结束时间
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().month(moment().month()).startOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				obj.endtime = moment(moment().month(moment().month()).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				return obj
			},
			getLastMonthDays() { // 获取上一个月的开始结束时间
				let obj = {
					starttime: '',
					endtime: ''
				}
				obj.starttime = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format(
					'YYYY-MM-DD HH:mm:ss');
				obj.endtime = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('YYYY-MM-DD HH:mm:ss');
				return obj
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			userBinding() {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			},
			userBuild() {},
			resumeBtn() {
				uni.navigateTo({
					url: '/pages/user/resume'
				})
			}
		}
	}
</script>

<style scoped>
	#UserHeader {
		background: #3a78ea;
		padding: 30rpx;
	}

	.user-build {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		padding: 30rpx 0;
	}

	.user-name {
		font-size: 45rpx;
		color: #FFFFFF;
	}

	.user-resume-build {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.reume-label {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.reume-label:before {
		font-family: "uniicons" !important;
		content: "\ec89";
		padding-right: 8rpx;
		color: inherit;
		height: inherit;
	}

	.portrait {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.portrait-img {
		width: 100%;
		height: 100%;
	}

	.reume-count {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		align-content: center;
	}

	.count-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		color: #FFFFFF;
		font-size: 35rpx;
	}

	.count-numb {
		font-size: 50rpx;
	}

	.user-main {
		padding: 30rpx;
	}

	.record {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
		position: relative;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #d9d9d9;
	}

	.record:last-child {
		border-bottom: none
	}

	.record:after {
		font-family: "uniicons" !important;
		content: "\e600";
		color: inherit;
		height: inherit;
		position: absolute;
		right: 0;
	}

	.record-val {
		font-size: 32rpx;
		color: #2d2d2d;
	}

	.record-val:before {
		font-family: "uniicons" !important;
		content: "\e604";
		padding-right: 8rpx;
		color: inherit;
		height: inherit;

	}

	.record-apply:before {
		content: "\e655";
	}

	.record-info {
		text-align: right;
		font-size: 30rpx;
		color: #9fa0a0;
		padding-right: 50rpx;
	}
</style>
