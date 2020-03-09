<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '职位'
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			//that.$store.dispatch("menu_type_1");
			//that.$store.commit("set_company_name", "A公司");
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
		},
		methods: {

		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
