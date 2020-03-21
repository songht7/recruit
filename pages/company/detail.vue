<template>
	<view class="content">
		<view class="job-header">
			<view class="job-val">
				<view class="job-title">{{title}}</view>
				<view class="job-price">8-13k</view>
			</view>
			<view class="job-tags">
				<view class="tag city">上海</view>
				<view class="tag years">1-4年</view>
				<view class="tag edu">学历不限</view>
			</view>
		</view>
		<view class="manager">
			<view class="portrait">
				<image v-show="portrait" class="portrait-img" src="../../static/logo.png" mode="aspectFit"></image>
				<uni-icons v-show="!portrait" class="portrait-img" type="touxiang1" size="75"></uni-icons>
			</view>
			<view class="manager-info">
				<view class="manager-name">骑兵</view>
				<view class="manager-post">SIXECO HR</view>
			</view>
		</view>
		<view class="detail">
			<rich-text class="job-detail" :nodes="data"></rich-text>
		</view>
		<fix-button gobackShow="false">
			<view :class="['fbtns','fbtns-clr-full ','fbtn-full',reumeIsSend?'reume-send':'']" @click="reumeSend">{{reumeIsSend?"简历已提交":"投递简历"}}</view>
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
				detail:[],
				portrait: !false,
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
				var parm = {
					inter: "supportDtl",
					parm: `?id=${that.id}`
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						// that.detail = res.data.list;
					}
				};
				that.$store.dispatch("getData", parm)
			},
			reumeSend() {
				this.reumeIsSend = !this.reumeIsSend
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
