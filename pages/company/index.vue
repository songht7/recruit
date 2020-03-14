<template>
	<job-temp ref="JobTemp"></job-temp>
</template>

<script>
	import JobTemp from "../job-temp/job.vue"
	export default {
		data() {
			return {}
		},
		components: {
			JobTemp
		},
		onLoad(option) {
			var that = this;
			console.log("onLoad")
			that.$store.dispatch("savePram", option)
			that.$store.dispatch("menu_default");
			//that.$store.dispatch("menu_type_1");
			that.$store.dispatch("cheack_page", 1);
		},
		onShow() {
			console.log("onShow")
			var that = this;
		},
		onReady() {
			var that = this;
			that.$refs.JobTemp.getData();
		},
		methods: {}
	}
</script>

<style scoped>
</style>
