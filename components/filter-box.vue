<template>
	<view class="filter-box">
		<view class="filter-content">
			<view class="filter-block filter-left">
				<view :class="['filter-btn','active']">推荐</view>
				<!-- <view :class="['filter-btn']">最新</view> -->
			</view>
			<view class="filter-block filter-right" v-if="filterSwitch">
				<view class="filter-btn" @click="$emit('filterCity')">{{city}}</view>
				<view class="filter-btn" @click="$emit('filterShow','right')">筛选</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'FilterBox',
		props: {
			filterSwitch: {
				type: Boolean,
				default: true
			},
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			city: {
				type: String,
				default: "上海"
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {};
		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.filter-box {
		padding: 10rpx 30rpx 20rpx;
		position: relative;
	}

	.filter-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		border-bottom: 2rpx solid #eeeeee;
	}

	.filter-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.filter-btn {
		padding: 5rpx 10rpx;
		margin: 0 10rpx;
		font-size: 36rpx;
	}

	.filter-right .filter-btn {
		font-size: 34rpx;
		background: #f7f7f7;
		padding: 2rpx 15rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.filter-right .filter-btn:after {
		font-family: "uniicons" !important;
		content: "\e603";
		position: absolute;
		bottom: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		transform: rotate(-45deg);
	}

	.active {
		font-weight: 500;
	}
</style>
