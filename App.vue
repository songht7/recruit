<script>
	var isWeixin = () => {
		return !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
	}
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var that = this;
			//this.$store.dispatch("getSystemInfo")
			console.log("isWeixin:", isWeixin());
			that.$store.dispatch("isWeixin");
			if (isWeixin()) {
				uni.getStorage({
					key: 'WeChatInfoWeb',
					success(res) {
						let _deathline = res.data.deathline;
						let timestamp = Math.round(new Date().getTime() / 1000);
						if (!_deathline || timestamp >= _deathline) {
							uni.removeStorage({
								key: "WeChatInfoWeb"
							});
							that.$store.state.weChatAuthInfo = {};
							that.$store.dispatch("wxXCXAuth")
						} else {
							that.$store.state.weChatAuthInfo = res.data;
						}
					},
					fail() {
						that.$store.dispatch("wxXCXAuth")
					}
				})
			}
		},
		onShow: function() {
			console.log('App Show')
			var that = this;
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
