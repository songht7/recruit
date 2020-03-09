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
				title: '人力资源公司'
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 1);
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
