<template>
	<job-temp :title="title"></job-temp>
</template>

<script>
	import JobTemp from "../job-temp/job.vue"
	export default {
		data() {
			return {
				title: "职位"
			}
		},
		components: {
			JobTemp
		},
		onLoad(option) {
			var that = this;
			console.log("onLoad")
			that.$store.dispatch("savePram",option)
		},
		onShow() {
			console.log("onShow")
			var that = this;
			that.$store.dispatch("menu_default");
			that.$store.dispatch("cheack_page", 0);
		},
		methods: {}
	}
</script>

<style scoped>
</style>
