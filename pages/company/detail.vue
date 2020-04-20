<template>
	<view class="content">
		<view class="job-header">
			<view class="job-val">
				<view class="job-title">{{detail.name}}</view>
				<view class="job-price">{{detail.salary}}</view>
			</view>
			<view class="job-tags">
				<view class="tag city">{{detail.city}}</view>
				<view class="tag years">{{detail.age_min}}</view>
				<view class="tag edu" v-if="detail.education">{{detail.education}}</view>
			</view>
		</view>
		<view class="manager">
			<view class="portrait">
				<image class="portrait-img" :src="portrait?portrait:'../../static/logo.png'" mode="aspectFit"></image>
			</view>
			<view class="manager-info">
				<view class="manager-name">{{detail.eName}}</view>
				<!-- <view class="manager-post">SIXECO HR</view> -->
			</view>
		</view>
		<view class="detail">
			<rich-text class="job-detail" :nodes="detail.detail?detail.detail:detail.overview"></rich-text>
		</view>
		<fix-button gobackShow="false">
			<view :class="['fbtns','fbtns-clr-full ','fbtn-full',reumeIsSend?'reume-send':'']" :disable='reumeIsSend' @click="reumeSend">{{reumeIsSend?"简历已提交":"投递简历"}}</view>
		</fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {
				title: '策划',
				id: "",
				detail: [],
				portrait: false,
				data: "<p>detail</p>",
				reumeIsSend: false
			}
		},
		components: {
			fixButton
		},
		onLoad(option) {
			var that = this;
			that.id = option.id ? option.id : "";
			if (that.id) {
				that.getData();
			}
		},
		onShow() {},
		methods: {
			getData() {
				var that = this;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: "supportDtl",
					parm: `?id=${that.id}`,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						that.detail = res.data;
						that.reumeIsSend = res.data.resume_article ? true : false;
					}
				};
				that.$store.dispatch("getData", parm)
			},
			reumeSend() {
				var that = this;
				if (that.reumeIsSend) {
					return
				}
				that.loading = true;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: "resume",
					method: "POST",
					data: {
						article_id: that.id
					},
					header: {
						token: _token
					}
				};
				console.log("login:", parm)
				parm["fun"] = function(res) {
					console.log(res)
					that.loading = false;
					if (res.success) {
						uni.showToast({
							title: "简历已投递",
							icon: "none"
						});
						that.reumeIsSend = true;
					} else {
						that.reumeIsSend = false;
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				};
				that.$store.dispatch("getData", parm)
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 30rpx;
	}

	.job-header {
		width: 100%;
		padding: 20rpx 0 30rpx;
		border-bottom: 2rpx solid #e2e2e2;
		margin-bottom: 30rpx;
	}

	.job-val {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		line-height: 2;
	}

	.job-title {
		font-size: 70rpx;
		color: #000;
	}

	.job-price {
		font-size: 45rpx;
		color: #3b78ea;
	}

	.job-tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
	}

	.tag {
		padding: 2rpx;
		margin-right: 20rpx;
		font-size: 40rpx;
		color: #000000;
	}

	.tag:before {
		font-family: "uniicons" !important;
		content: "\e6bd";
		padding-right: 4rpx;
		font-size: inherit;
		color: inherit;
	}

	.years:before {
		content: "\e702";
	}

	.edu:before {
		content: "\e675";
	}

	.manager {
		padding: 0 0 30rpx;
		border-bottom: 2rpx solid #e2e2e2;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
	}

	.portrait {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.portrait-img {
		width: 100%;
		height: 100%;
	}

	.manager-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-content: center;
		line-height: 1.4;
		padding-left: 40rpx;
	}

	.manager-name {
		font-size: 50rpx;
		color: #000;
	}

	.manager-post {
		font-size: 40rpx;
	}

	.detail {
		padding-bottom: 50rpx;
	}

	.reume-send {
		background-color: #727272;
		border-color: #727272;
		color: #fff;
	}
</style>
