<template>
	<view class="content">
		<block>
			<search-header :title="title" v-model="formData['keyword']" @onSearchBlur="onSearchBlur"></search-header>
		</block>
		<block>
			<filter-box></filter-box>
		</block>
		<block>
			<job-list :list="jobList"></job-list>
		</block>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import SearchHeader from '@/components/search-header.vue'
	import JobList from '@/components/job-list.vue'
	import FilterBox from '@/components/filter-box.vue'
	export default {
		name: 'JobTemp',
		props: {
			pageTitle: ""
		},
		data() {
			return {
				title: "职位",
				comany_id: "",
				formData: {
					keyword: ''
				},
				jobList: []
			}
		},
		components: {
			SearchHeader,
			JobList,
			FilterBox
		},
		methods: {
			getData(type = "") {
				var that = this;
				console.log("formData:", that.formData);
				var comany_id = that.$store.state.companyID;
				that.title = that.pageTitle ? that.pageTitle : "人力资源公司";
				var bar_index = that.$store.getters.bar_index.toString();
				if (comany_id && bar_index == "1") {
					console.log(comany_id, bar_index)
					that.title = "A公司";
				}
				//that.$store.commit("set_company_name", "人力资源公司");
				if (type == 'keyword' && that.formData['keyword'] != "") {
					that.searchShow = false;
					that.focus = false;
					that.jobList = [{
						id: 1,
						name: "市场专员",
						price: "8-13K",
						overview: "上海XXX事务所",
						city: "上海",
						years: "1-3年",
						edu: "学历不限",
						comany_name: "上海XX中介公司"
					}, {
						id: 2,
						name: "市场专员2222",
						price: "8-13K",
						overview: "上海XXX事务所2",
						city: "上海",
						years: "1-3年",
						edu: "学历不限",
						comany_name: "上海XX中介公司"
					}]
				}
			},
			onSearchBlur(val = "") {
				var that = this;
				console.log("onSearchBlur:", val)
				that.formData.keyword = val;
				that.getData("keyword")
			}
		}
	}
</script>

<style scoped>
	@import "./job.css";
</style>
