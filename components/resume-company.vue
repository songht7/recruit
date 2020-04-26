<template>
	<view class="resume-company">
		<view class="his-row">
			<view class="his-label">所在公司：</view>
			<view class="his-val">
				<input class="his-input" type="text" v-model="data['company']" />
			</view>
		</view>
		<view class="his-row">
			<view class="his-label">所在职位：</view>
			<view class="his-val">
				<input class="his-input" type="text" v-model="data['job']" />
			</view>
		</view>
		<view class="his-row">
			<view class="his-label">在职时间：</view>
			<view class="his-val">
				<!-- <input class="his-input" type="text" v-model="formData['project']['start_time']" /> -->
				<picker class="his-input his-input-helf" mode="date" :value="data['start_time']" :start="startDate" :end="endDate"
				 @change="bindStartTimeProject">
					<view class="pick-val">{{data['start_time']?data['start_time'].split(" ")[0]:""}}</view>
				</picker>
				<view class="cut-val">至</view>
				<picker class="his-input his-input-helf" mode="date" :value="data['end_time']" :start="startDate" :end="endDate"
				 @change="bindEndTimeProject">
					<view class="pick-val">{{data['end_time']?data['end_time'].split(" ")[0]:""}}</view>
				</picker>
			</view>
		</view>
		<view class="his-row">
			<view class="his-label">工作内容：</view>
			<view class="his-val">
				<textarea class="his-input overview" v-model="data['infomation']" auto-height placeholder-style="color:#a9c4f6"></textarea>
			</view>
		</view>
		<view class="edit-btns">
			<view class="edit-btn edit-cancel" @click="cancel">取消</view>
			<view class="edit-btn edit-submit" @click="submit">确定</view>
		</view>
	</view>
</template>


<script>
	var graceChecker = require("@/common/graceChecker.js");
	var rule = [{
		name: "company",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "公司名不能为空"
	}, {
		name: "job",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "职位不能为空"
	}, {
		name: "start_time",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "在职时间不能为空"
	}, {
		name: "end_time",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "在职时间不能为空"
	}, {
		name: "infomation",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "工作内容不能为空"
	}];

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}`; //-${day}
	}
	export default {
		name: 'FilterBox',
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
			return {
				startDate: getDate('start'),
				endDate: getDate('end'),
			};
		},
		computed: {

		},
		methods: {
			cancel() {
				this.$emit('hidePopup')
			},
			submit() {
				var that = this;
				var _formData = that.data;
				var rules = [...rule];
				var checkRes = graceChecker.check(_formData, rules);
				if (checkRes) {
					that.$emit('addCompany');
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			bindStartTimeProject(e) {
				console.log(e)
				this.data['start_time'] = e.target.value
			},
			bindEndTimeProject(e) {
				this.data['end_time'] = e.target.value
			},
		}
	}
</script>

<style scoped>
	.resume-company {
		width: 100%;
	}

	.edit-btns {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		padding: 20rpx;
	}

	.edit-btn {
		width: 45%;
		border: 1px solid #999;
		color: #333;
		font-size: 32rpx;
		text-align: center;
		line-height: 2;
		border-radius: 10rpx;
	}

	.edit-submit {
		background: #007AFF;
		color: #FFFFFF;
		border-color: #007AFF;
	}
</style>
