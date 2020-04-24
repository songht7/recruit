<template>
	<view class="search-header" id="Header">
		<view class="title">{{title}}</view>
		<view class="search-box">
			<input class="search-input" v-show="searchShow" :focus="focus" @blur="onBlur" type="text" :value="keywords"
			 placeholder="输入搜索关键词" placeholder-style="color:#fff;font-size:32rpx" confirm-type="search" />
			<uni-icons type="fangdajing1" :size="32" color="#fff" @click="searchBtn"></uni-icons>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'SearchHeader',
		props: {
			title: {
				type: String,
				default: ""
			},
			keywords: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				searchShow: false,
				focus: false,
				keywd: ""
			};
		},
		computed: {},
		methods: {
			onBlur(e) {
				this.keywd = e.target.value;
				this.$emit("onSearchBlur", e.target.value)
			},
			searchBtn() {
				var that = this;
				if (that.keywd) {
					that.searchShow = true;
				} else {
					that.searchShow = !that.searchShow;
				}
				that.focus = false;
			}
		}
	}
</script>

<style scoped>
	#Header {
		background: #3a78ea;
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		line-height: 2;
	}

	.title {
		font-size: 46rpx;
		color: #FFFFFF;
		width: 50%;
	}

	.search-box {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		flex-direction: row;
	}

	.search-input {
		line-height: 2;
		width: 100%;
		padding: 10rpx;
		border-radius: 5rpx;
		border-bottom: 2rpx solid #FFFFFF;
		color: #FFFFFF;
	}
</style>
