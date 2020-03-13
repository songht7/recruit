<template>
	<job-temp :title="title"></job-temp>
</template>

<script>
	import JobTemp from "../job-temp/job.vue"
	export default {
		data() {
			return {
				title: ""
			}
		},
		components: {
			JobTemp
		},
		onLoad(option) {
			var that = this;
			console.log("onLoad")
			var companyID = option.cid ? option.cid : that.$store.state.companyID;
			if (companyID) {
				that.title = "A公司";
				that.$store.state.companyID = companyID;
				that.$store.commit("set_company_name", "A公司");
			} else {
				that.title = "人力资源公司";
				that.$store.commit("set_company_name", "人力资源公司");
			}
			that.$store.dispatch("menu_default");
			//that.$store.dispatch("menu_type_1");
			that.$store.dispatch("cheack_page", 1);
		},
		onShow() {
			console.log("onShow")
			var that = this;
		},
		methods: {}
	}
</script>

<style scoped>
</style>
