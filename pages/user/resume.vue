<template>
	<view class="content">
		<view class="header">
			<!-- <view class="portrait">
				<image v-if="!portrait" class="portrait-img" src="../../static/logo.png" mode="aspectFit"></image>
				<uni-icons v-else class="portrait-img" type="touxiang1" size="75" color="#fff"></uni-icons>
			</view>
			<view class="user-name">用户名</view> -->
			<view class="u-base-info">
				<view class="b-row">
					<uni-icons class="b-icon" type="touxiang1" size="26" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['name']" placeholder="姓名" placeholder-style="color:#a9c4f6" />
				</view>
				<view class="b-row">
					<uni-icons class="b-icon" type="shengri1" size="26" color="#fff"></uni-icons>
					<picker class="b-input" mode="date" :value="formData['brithday']" :start="startDate" :end="endDate" @change="bindDateChange">
						<view>{{formData['brithday']}}</view>
					</picker>
					<!-- <input class="b-input" type="text" v-model="formData['brithday']" placeholder="生日" placeholder-style="color:#a9c4f6" /> -->
				</view>
				<!-- <view class="b-row">
					<uni-icons class="b-icon" type="weizhi" size="26" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['city']" />
				</view> -->
				<view class="b-row">
					<uni-icons class="b-icon" type="sina" size="26" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['email']" placeholder="EMail" placeholder-style="color:#a9c4f6" />
				</view>
				<view class="b-row">
					<uni-icons class="b-icon" type="dianhua" size="26" color="#fff"></uni-icons>
					<input class="b-input" type="number" maxlength="11" v-model="formData['phone']" placeholder="您的电话号"
					 placeholder-style="color:#a9c4f6" />
				</view>
			</view>
			<view :class="['about_self','text-box',aboutSelfAutoHeight?'autoHeight':'']">
				<textarea :class="['job-txt-area']" v-model="formData['about_self']" auto-height placeholder-style="color:#a9c4f6"
				 placeholder="自我简介" @focus="txtAreaSwich('about_self','focus')"></textarea>
				<uni-icons :class="['height-btn',aboutSelfAutoHeight?'height-close':'']" type="jiantou11" size="18" color="#fff"
				 @click="txtAreaSwich('about_self')"></uni-icons>
			</view>
		</view>
		<view class="history">
			<!-- <template>
				<view class="his-block">
					<view class="his-title">求职意向</view>
					<view class="his-row">
						<view class="his-label">期望岗位：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">目前状况：</view>
						<view class="his-val"><textarea class="his-input" v-model="formData['status']" auto-height placeholder-style="color:#a9c4f6"></textarea></view>
					</view>
				</view>
			</template> -->
			<template>
				<view class="his-block">
					<view class="his-title">教育经历</view>
					<view class="his-row">
						<view class="his-label">毕业学校：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['school'][0]['school']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">攻读专业：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['school'][0]['profession']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">最高学位：</view>
						<view class="his-val">
							<picker class="his-input" @change="bindEduChange" :value="eduIndex" :range="educationArr" range-key="name">
								<view class="pick-val">{{formData['education']}}</view>
							</picker>
							<!-- <picker class="his-input" mode="date" :value="formData['education']" :start="startDate" :end="endDate" @change="bindDateChange">
						<view>{{formData['education']}}</view>
					</picker> -->
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">就读年份：</view>
						<view class="his-val">
							<!-- formData['school'][0]['start_time']-formData['school'][0]['end_time'] -->
							<!-- <input class="his-input" type="text" v-model="formData['school'][0]['start_time']" /> -->
							<picker class="his-input his-input-helf" mode="date" fields="month" :value="formData['school'][0]['start_time']" :start="startDate"
							 :end="endDate" @change="bindStartTime">
								<view class="pick-val">{{formData['school'][0]['start_time']?formData['school'][0]['start_time'].split(" ")[0]:""}}</view>
							</picker>
							<view class="cut-val">至</view>
							<picker class="his-input his-input-helf" mode="date" fields="month" :value="formData['school'][0]['end_time']" :start="startDate"
							 :end="endDate" @change="bindEndTime">
								<view class="pick-val">{{formData['school'][0]['end_time']?formData['school'][0]['end_time'].split(" ")[0]:""}}</view>
							</picker>
						</view>
					</view>
					<!-- <view class="his-row">
						<view class="his-label">学历：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['school'][0]['post']" />
						</view>
					</view> -->
				</view>
			</template>
			<template>
				<view class="his-block">
					<view class="his-title">
						工作经历
						<view class="add-row">
							<text @click='editCompany("add")' style="color: #999;">添加经历</text>
							<!-- <uni-icons type="jia1" size="18" color="#666" ></uni-icons> -->
						</view>
					</view>
					<block v-for="(obj,k) in formData.company" v-if="obj.delete!=1" :key="k">
						<view class="list--job">
							<view class="his-row">
								<view class="his-label">所在公司：</view>
								<view class="his-val">
									<view class="his-input">{{obj['company']}}</view>
								</view>
							</view>
							<view class="his-row">
								<view class="his-label">所在职位：</view>
								<view class="his-val">
									<view class="his-input">{{obj['job']}}</view>
								</view>
							</view>
							<view class="his-row">
								<view class="his-label">在职时间：</view>
								<view class="his-val">
									<!-- <input class="his-input" type="text" v-model="formData['project']['start_time']" /> -->
									<view class="his-input his-input-helf">{{obj['start_time']?obj['start_time'].split(" ")[0]:""}}</view>
									<view class="cut-val">至</view>
									<view class="his-input his-input-helf">{{obj['end_time']?obj['end_time'].split(" ")[0]:""}}</view>
								</view>
							</view>
							<view class="his-row his-row-company-info">
								<view class="his-label">工作内容：</view>
								<view :class="['his-val','his-val-company-info','text-box',obj['open']?'':'his-val-company-hide']">
									<!-- <rich-text class="his-input his-val-company-info overview" :nodes="obj['infomation']?obj['infomation']:''"></rich-text> -->
									<textarea class="his-input overview" v-model="obj['infomation']" auto-height placeholder-style="color:#a9c4f6"
									 disabled></textarea>
									<uni-icons :class="['height-btn',obj['open']?'height-close':'']" type="jiantou11" size="18" color="#999"
									 @click="txtAreaSwich('company','',k)"></uni-icons>
								</view>
							</view>
							<view class="comp-edit">
								<uni-icons class="c-edit" type="bianji" size="14" color="#666" @click='editCompany("edit",obj.id,k)'></uni-icons>
								<uni-icons class="c-edit" type="shanchu1" size="14" color="#f40" @click='editCompany("del",obj.id,k)'></uni-icons>
							</view>
						</view>
					</block>
					<block v-if="popupType === 'company'">
						<uni-popup :show="popupType === 'company'" position="middle" width="90%" mode="fixed">
							<resume-company :data="companyTemp" @hidePopup="togglePopup('')" @addCompany="addCompany"></resume-company>
						</uni-popup>
					</block>
				</view>
			</template>
			<view class="submit-resume" @click="editResume('PUT')">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import ResumeCompany from '@/components/resume-company.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	var graceChecker = require("@/common/graceChecker.js");
	var rule = [{
		name: "email",
		checkType: "email",
		checkRule: "",
		errorMsg: "请填写正确的邮箱"
	}, {
		name: "phone",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "请填写正确的手机号"
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

		return `${year}-${month}-${day}`;
	}
	var comTemp = {
		"id": "",
		"company": "",
		"job": "",
		"start_time": "",
		"end_time": "",
		"infomation": "",
		"delete": 0
	}
	export default {
		data() {
			return {
				loading: false,
				title: '我的',
				portrait: !false,
				startDate: getDate('start'),
				endDate: getDate('end'),
				educationArr: [{
					name: '初中及以下'
				}, {
					name: '中专/中技'
				}, {
					name: '高中'
				}, {
					name: '大专'
				}, {
					name: '本科'
				}, {
					name: '硕士'
				}, {
					name: '博士'
				}],
				eduIndex: 2,
				companyTemp: comTemp,
				formData: {
					name: "",
					brithday: getDate({
						format: true
					}),
					email: "",
					phone: "",
					age_work: "",
					education: "高中",
					about_self: "",
					sex: "",
					post: "", //期望岗位
					status: "", //目前状况
					school: [{
						"id": "",
						"school": "",
						"profession": "",
						"start_time": getDate({
							format: true
						}),
						"end_time": getDate({
							format: true
						})
					}],
					company: [],
					project: [{
						"id": "",
						"name": "",
						"overview": "",
						"start_time": "",
						"end_time": ""
					}]
				},
				aboutSelfAutoHeight: false,
				popupType: "",
				editType: "",
				editIndex: 0,
			}
		},
		components: {
			ResumeCompany,
			uniPopup
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
			that.editResume('GET');
		},
		methods: {
			txtAreaSwich(obj, type, index) {
				switch (obj) {
					case 'about_self':
						if (type == 'focus') {
							this.aboutSelfAutoHeight = true;
						} else {
							this.aboutSelfAutoHeight = !this.aboutSelfAutoHeight;
						}
						break;
					case 'company':
						this.formData.company[index]['open'] = !this.formData.company[index]['open'];
						break;
					default:
						break;
				}
			},
			editCompany(type, id, index) {
				var that = this;
				that.editType = type;
				switch (type) {
					case 'del':
						//that.formData.company = that.formData.company.filter((obj, k) => k != index)
						that.formData.company.map((obj, k) => {
							if (k == index) {
								obj["delete"] = 1;
							}
						})
						break;
					case 'add':
						that.companyTemp = {
							"id": "",
							"company": "",
							"job": "",
							"start_time": "",
							"end_time": "",
							"infomation": ""
						};
						that.popupType = "company";
						break;
					case 'edit':
						that.editIndex = index;
						that.companyTemp = that.formData.company[index];
						that.popupType = "company";
						break;
					default:
						break;
				}
			},
			addCompany() {
				var that = this;
				console.log(that.editType)
				switch (that.editType) {
					case 'edit':
						that.formData.company[that.editIndex] = that.companyTemp;
						break;
					case 'add':
						that.formData.company.push(that.companyTemp);
						break;
					default:
						break;
				}
				that.popupType = "";
			},
			togglePopup(type) {
				this.popupType = "";
			},
			bindDateChange(e) {
				this.formData['brithday'] = e.target.value
			},
			bindStartTime(e) {
				this.formData['school'][0]['start_time'] = e.target.value
			},
			bindEndTime(e) {
				this.formData['school'][0]['end_time'] = e.target.value
			},
			bindEduChange(e) {
				this.eduIndex = e.target.value;
				this.formData['education'] = this.educationArr[e.target.value]['name'];
			},
			editResume(type) {
				var that = this;
				var _formData = that.formData;
				var rules = [...rule];
				var checkRes = type == "GET" ? true : graceChecker.check(_formData, rules);
				if (checkRes) {
					that.loading = true;
					var _token = that.$store.state.testToken;
					if (that.$store.state.isWeixin) {
						_token = that.$store.state.weChatAuthInfo.token;
					}
					var parm = {
						inter: "resume",
						method: type,
						header: {
							token: _token
						}
					};
					if (type == "PUT") {
						parm["data"] = _formData;
					}
					console.log("login:", parm)
					parm["fun"] = function(res) {
						console.log(res)
						that.loading = false;
						if (res.success) {
							if (type == "GET" && res.data.info != false) {
								res.data.info.company.map((obj, k) => {
									obj["open"] = false;
								})
								that.formData = res.data.info;
							} else if (type == "PUT") {
								uni.showToast({
									title: "简历编辑成功",
									icon: "success"
								});
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
					};
					that.$store.dispatch("getData", parm)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style scoped>
	.header {
		background: #3a78ea;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		align-content: center;
		padding: 90rpx 30rpx 30rpx;
	}

	.portrait {
		width: 150rpx;
		height: 150rpx;
	}

	.user-name {
		color: #FFFFFF;
		font-size: 32rpx;
		line-height: 2;
	}

	.portrait-img {
		width: inherit;
		height: inherit;
		border-radius: 50%;
		overflow: hidden;
	}

	.b-row {
		width: 100%;
		padding: 10rpx 0 15rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		flex-direction: row;
		margin-left: -30rpx;
	}

	.b-icon {
		width: 20%;
	}

	.b-input {
		flex: 75%;
		font-size: 36rpx;
		border-bottom: 1px solid #a9c4f6;
		color: #FFFFFF;
		text-align: center;
	}

	.about_self {
		width: 90%;
		border-radius: 10rpx;
		border: 1px solid #a9c4f6;
		color: #FFFFFF;
		padding: 10rpx;
		margin: 20rpx 0;
		height: 40rpx;
		overflow: hidden;
	}

	.his-val-company-info {
		border-bottom: 1px solid #7f7f7f;
		line-height: 2;
	}

	.his-val-company-hide {
		height: 40rpx;
		overflow: hidden;
	}

	.overview {
		border-bottom: none;
	}

	.history {
		padding: 30rpx;
	}

	.his-block {
		padding-bottom: 20rpx;
	}

	.his-title {
		font-size: 34rpx;
		border-bottom: 3rpx solid #000000;
		color: #000000;
		line-height: 2;
		margin-bottom: 15rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		align-content: center;
	}

	.height-close {
		transform: rotate(180deg);
	}

	.autoHeight {
		height: auto;
	}
</style>
