<template>
	<view class="tab_bar">
		<view class="tab_main">
			<view :class="['tab_item','tab-'+item.name_code]" v-for="(item,index) in footer_nav" :key="index" :style="'width:'+item_width">
				<view :class="['tab_block','tab-bk-'+item.name_code,item.flex_dir,index==now_index?'tab_bat_active':'',tabHaveMsg?'tab-haveMsg':'']"
				 @click="navto(index,item.link,item.name_code)">
					<uni-icons :type="item.icon" v-if="item.icon" :size="32" :color="iconColor(item,index)"></uni-icons>
					<view class="tab_name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {

			};
		},
		onShow() {},
		methods: {
			iconColor(item, index) {
				switch (item.iconColor) {
					case "white":
						return '#FFFFFF'
						break;
					case "blue":
						return '#008CEE'
						break;
					default:
						let clr = index == this.now_index ? '#008CEE' : '#929292';
						return clr
						break;
				}
			},
			navto(index, url, name_code) {
				this.$store.commit("change_page", index)
				uni.redirectTo({
					url: url
				})
			}
		},
		computed: {
			item_width() {
				let length = this.$store.state.tab_bar.footer_nav.length;
				switch (length) {
					case 1:
						return '100%'
						break;
					case 2:
						return '46%'
						break;
					case 3:
						return '33.33%'
						break;
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			tabHaveMsg() {
				return this.$store.state.haveMsg
			},
			footer_nav() {
				//console.log(this.$store.state.tab_bar.footer_nav)
				return this.$store.state.tab_bar.footer_nav
			},
			now_index() {
				return this.$store.state.tab_bar.now_page_index;
			}
		}
	}
</script>


<style>
	.tab_bar {
		position: fixed;
		height: 150upx;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		border-top: 2upx solid #D1D1D1;
		/* padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); */
	}

	.tab_main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-content: center;
		align-items: center;
	}

	.tab_item {
		width: 33.33%;
		height: 80%;
		display: flex;
		justify-content: center;
	}

	.flex-row {
		flex-direction: row;
	}

	.flex-column {
		flex-direction: column;
	}

	.tab_block {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		text-align: center;
		font-size: 28upx;
		color: #929292;
		line-height: 2;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.tab-bk-user-msg.tab-haveMsg::before {
		position: absolute;
		top: 0;
		right: 35%;
		width: 25upx;
		height: 25upx;
		border-radius: 50%;
		content: '';
		background-color: #F40;
		z-index: 10;
	}

	.tab_name {
		line-height: 1.4;
	}

	.tab_bat_active .tab_name {
		color: #008CEE;
	}
</style>
