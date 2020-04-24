<template>
	<view class="record-box">
		<view class="uni-list">
			<block v-for="(item,index) in lists" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="navigateTo('/pages/company/detail?id='+item.id)">
					<view class="uni-triplex-row">
						<view class="uni-triplex-left record-triplex-left">
							<text class="uni-title uni-ellipsis">{{item.name}}</text>
							<text class="uni-text" v-if="item.subTitle">{{item.subTitle}}</text>
							<text class="uni-text-small uni-ellipsis">{{item.overview}}</text>
						</view>
						<view class="uni-triplex-right record-triplex-right" v-if="item.salary">
							<text class="uni-h5">{{item.salary}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				portrait: false,
				userInfo: {},
				lists: {}
			}
		},
		onLoad() {
			this.getData('accountSupports');
			//this.getData('supportsTotal');
		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
			uni.getStorage({
				key: "WeChatInfoWeb",
				success(res) {
					console.log(res.data)
					that.userInfo = res.data
					that.portrait = res.data.wechat ? res.data.wechat.headimgurl : false
				}
			})
		},
		methods: {
			getData(url) {
				var that = this;
				var _token = that.$store.state.testToken;
				if (that.$store.state.isWeixin) {
					_token = that.$store.state.weChatAuthInfo.token;
				}
				var parm = {
					inter: url,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					if (res.success) {
						that.lists = res.data.info;
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				};
				that.$store.dispatch("getData", parm)
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.record-triplex-left,
	.record-triplex-right {
		width: 49%;
	}
</style>
