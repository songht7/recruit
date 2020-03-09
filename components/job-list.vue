<template>
	<view class="job-list">
		<view class="list">
			fasdf
		</view>
	</view>
</template>


<script>
	export default {
		name: 'JobList',
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {}
	}
</script>


<style>
</style>
