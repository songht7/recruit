<template>
	<view class="content">
		<block>
			<search-header :title="title" v-model="formData['keyword']" @onSearchBlur="onSearchBlur"></search-header>
		</block>
		<block>
			<filter-box :filterSwitch="!filterSwitch" @filterCity="showMulLinkageThreePicker" @filterShow="filterShow" :city="formData['city']"></filter-box>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			<uni-drawer :visible="showRigth" mode="right" @close="closeDrawer('right')">
				<view class="drawer-title">筛选</view>
				<view class="drawer-list">
					<block v-for="(obj,k) in screens" :key="k">
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
					</block>
					<!-- <view class="filter-block">
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
					</view> -->
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
				enterprise_id: "",
				formData: {
					province: '上海',
					city: '上海',
					area: '',
					keyword: '',
					company: '',
					ctg: '',
					currentPage: 1,
					pagesize: 10
				},
				jobList: [],
				total: 0,
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
				filterSwitch: true, //是伐显示筛选[城市，分类]
				screens: [], //分类列表
				company: [{
					"value": "",
					"name": "全部",
					"checked": true
				}],
				ctg: [{
					"value": "",
					"name": "全部",
					"checked": true
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
			getData(type = "") { //职位列表
				var that = this;
				console.log("formData:", that.formData);
				that.hideDrawer()
				var enterprise_id = that.$store.state.enterprise_id;
				that.title = that.pageTitle ? that.pageTitle : "人力资源公司";
				var bar_index = that.$store.getters.bar_index.toString();
				if (enterprise_id && bar_index == "1") {
					console.log(enterprise_id, bar_index)
				}
				//that.$store.commit("set_company_name", "人力资源公司");
				if (type == 'keyword' && that.formData['keyword'] != "") {
					that.searchShow = false;
					that.focus = false;
				}
				var _token = that.$store.state.testToken;
				console.log("testToken_token：", _token)
				if (that.$store.state.isWeixin) {
				console.log("isWeixin_token：", _token)
					_token = that.$store.state.weChatAuthInfo.token;
				}
				console.log("_token：", _token)
				var parm = {
					inter: "supports",
					//data: that.formData,
					pram: "?enterprise_id=" + enterprise_id,
					header: {
						token: _token
					}
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						//that.title = "A公司";
						that.jobList = res.data.list ? res.data.list : [];
						that.total = res.data.total;
					}
				};
				that.$store.dispatch("getData", parm)
			},
			screening() { //筛选条件列表
				var that = this;
				var parm = {
					inter: "screening"
				};
				parm["fun"] = function(res) {
					console.log(res)
					if (res.success) {
						let _list = res.data.list;
						console.log(_list)
						// let screenList = [];
						// _list.map((obj, k) => {
						// 	let L = {
						// 		name: obj.name,
						// 		list: obj.data
						// 	}
						// 	screenList.push(L)
						// });
						// that.screens = screenList

					}
				};
				that.$store.dispatch("getData", parm)
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
