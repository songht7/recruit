<template>
	<view class="content">
		<block>
			<search-header :title="title" v-model="formData['keyword']" @onSearchBlur="onSearchBlur"></search-header>
		</block>
		<block>
			<filter-box @filterCity="showMulLinkageThreePicker" @filterShow="filterShow" :city="formData['city']"></filter-box>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			<uni-drawer :visible="showRigth" mode="right" @close="closeDrawer('right')">
				<view class="drawer-title">筛选</view>
				<view class="drawer-list">
					<view class="filter-block">
						<view class="filter-title">公司</view>
						<view class="filter-status">
							<scroll-view scroll-y="true" style="max-height: 200rpx;">
								<radio-group class="flt-list" name="subctg">
									<view class="f-block" :class="s.checked ?  'checkbox selectBox' : 'checkbox '" @click="filterSetData(s.value,c,'company')"
									 v-for="(s,c) in company" :key="s.value">
										<label class="f-label">
											<radio :value="s.value" :checked="s.checked" v-show="false" />{{s.name}}
										</label>
									</view>
								</radio-group>
							</scroll-view>
						</view>
					</view>
					<view class="filter-block">
						<view class="filter-title">职业分类</view>
						<view class="filter-status">
							<scroll-view scroll-y="true" style="max-height: 200rpx;">
								<radio-group class="flt-list" name="subctg">
									<view class="f-block" :class="s.checked ?  'checkbox selectBox' : 'checkbox '" @click="filterSetData(s.value,c,'ctg')"
									 v-for="(s,c) in ctg" :key="s.value">
										<label class="f-label">
											<radio :value="s.value" :checked="s.checked" v-show="false" />{{s.name}}
										</label>
									</view>
								</radio-group>
							</scroll-view>
						</view>
					</view>
				</view>
				<view class="drawer-btns">
					<button type="default" size="default" @click="hideDrawer">关闭</button>
					<button type="primary" size="default" @click="getData">确定</button>
				</view>
			</uni-drawer>
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

	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
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
					province: '上海',
					city: '上海',
					area: '',
					keyword: '',
					company: '',
					ctg: ''
				},
				jobList: [],
				city: "",
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [8, 0, 3],
				themeColor: '#007AFF',
				showRigth: false,
				showLeft: false,
				company: [{
					"value": "",
					"name": "全部",
					"checked": true
				}, {
					"value": "1",
					"name": "A公司",
					"checked": false
				}, {
					"value": "2",
					"name": "BBBB公司",
					"checked": false
				}, {
					"value": "3",
					"name": "CCCCC公司",
					"checked": false
				}, {
					"value": "4",
					"name": "A公司",
					"checked": false
				}, {
					"value": "5",
					"name": "BBBB公司",
					"checked": false
				}, {
					"value": "6",
					"name": "CCCCC公司",
					"checked": false
				}, {
					"value": "7",
					"name": "A公司",
					"checked": false
				}, {
					"value": "8",
					"name": "BBBB公司",
					"checked": false
				}, {
					"value": "9",
					"name": "CCCCC公司",
					"checked": false
				}],
				ctg: [{
					"value": "",
					"name": "全部",
					"checked": true
				}, {
					"value": "1",
					"name": "市场专员",
					"checked": false
				}, {
					"value": "2",
					"name": "市场专员2",
					"checked": false
				}, {
					"value": "3",
					"name": "市场专员3",
					"checked": false
				}]
			}
		},
		components: {
			SearchHeader,
			JobList,
			FilterBox,
			mpvuePicker,
			mpvueCityPicker,
			uniDrawer
		},
		methods: {
			getData(type = "") {
				var that = this;
				console.log("formData:", that.formData);
				that.hideDrawer()
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
			filterSetData(val, index, type) {
				var that = this;
				var setData = "";
				switch (type) {
					case 'company':
						setData = that.company;
						break;
					case 'ctg':
						setData = that.ctg;
						break;
				}
				that.formData[type] = val;
				for (let k in setData) {
					setData[k].checked = false;
				}
				setData[index].checked = true
			},
			onSearchBlur(val = "") {
				var that = this;
				console.log("onSearchBlur:", val)
				that.formData.keyword = val;
				that.getData("keyword")
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				var that = this;
				//let val = JSON.stringify(e);
				var cityPicker = e.label.split("-");
				that.formData.province = cityPicker[0];
				that.formData.city = cityPicker[1] == '市辖区' ? cityPicker[0] : cityPicker[1];
				that.formData.area = cityPicker[2];
				that.getData()
				console.log(e)
			},
			onCancel(e) {
				console.log(e)
			},
			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},
			onUnload() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			filterShow(e) {
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRigth = true
				}
			},
			hideDrawer() {
				this.showLeft = false
				this.showRigth = false
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRigth = false
				}
			},
			onNavigationBarButtonTap(e) {
				this.showRigth = !this.showRigth
			},
			onFilterBackPress() {
				if (this.showRigth || this.showLeft) {
					this.hideDrawer()
					return true
				}
			}
		}
	}
</script>

<style scoped>
	@import "./job.css";
</style>
