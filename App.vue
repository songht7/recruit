<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//this.$store.dispatch("getSystemInfo")
		},
		onShow: function() {
			console.log('App Show')
			var that = this;
			that.$store.dispatch("isWeixin")
			let isWeixin = !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
			console.log("isWeixin:", isWeixin)
			if (isWeixin) {
				uni.getStorage({
					key: 'WeChatInfoWeb',
					success(res) {
						that.$store.state.weChatAuthInfo = res.data;
					}
				})
				that.$store.dispatch("wxXCXAuth")
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*https://www.iconfont.cn
	*login weibo
	*/
	@import "./common/fonts/iconfont.css";
	/*每个页面公共css */
	@import "./common/uni.css";
</style>
