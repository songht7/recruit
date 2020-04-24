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
					<uni-icons class="b-icon" type="touxiang1" size="18" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['name']" placeholder="姓名" placeholder-style="color:#a9c4f6" />
				</view>
				<view class="b-row">
					<uni-icons class="b-icon" type="shengri1" size="18" color="#fff"></uni-icons>
					<picker class="b-input" mode="date" :value="formData['brithday']" :start="startDate" :end="endDate" @change="bindDateChange">
						<view>{{formData['brithday']}}</view>
					</picker>
					<!-- <input class="b-input" type="text" v-model="formData['brithday']" placeholder="生日" placeholder-style="color:#a9c4f6" /> -->
				</view>
				<!-- <view class="b-row">
					<uni-icons class="b-icon" type="weizhi" size="18" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['city']" />
				</view> -->
				<view class="b-row">
					<uni-icons class="b-icon" type="sina" size="18" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['email']" placeholder="EMail" placeholder-style="color:#a9c4f6" />
				</view>
				<view class="b-row">
					<uni-icons class="b-icon" type="dianhua" size="18" color="#fff"></uni-icons>
					<input class="b-input" type="number" maxlength="11" v-model="formData['phone']" placeholder="您的电话号"
					 placeholder-style="color:#a9c4f6" />
				</view>
			</view>
			<view class="about_self"><textarea v-model="formData['about_self']" auto-height placeholder-style="color:#a9c4f6"
				 placeholder="自我简介"></textarea></view>
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
						<view class="his-label">学位：</view>
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
							<picker class="his-input his-input-helf" mode="date" :value="formData['school'][0]['start_time']" :start="startDate"
							 :end="endDate" @change="bindStartTime">
								<view class="pick-val">{{formData['school'][0]['start_time']?formData['school'][0]['start_time'].split(" ")[0]:""}}</view>
							</picker>
							<view class="cut-val">至</view>
							<picker class="his-input his-input-helf" mode="date" :value="formData['school'][0]['end_time']" :start="startDate"
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
					<view class="his-title">职业技能</view>
					<view class="his-row">
						<view class="his-label">公司：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['project'][0]['name']" />
						</view>
					</view>
					<!-- <view class="his-row">
						<view class="his-label">职位：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['project'][0]['overview']" />
						</view>
					</view> -->
					<view class="his-row">
						<view class="his-label">年份：</view>
						<view class="his-val">
							<!-- <input class="his-input" type="text" v-model="formData['project'][0]['start_time']" /> -->
							<picker class="his-input his-input-helf" mode="date" :value="formData['project'][0]['start_time']" :start="startDate"
							 :end="endDate" @change="bindStartTimeProject">
								<view class="pick-val">{{formData['project'][0]['start_time']?formData['project'][0]['start_time'].split(" ")[0]:""}}</view>
							</picker>
							<view class="cut-val">至</view>
							<picker class="his-input his-input-helf" mode="date" :value="formData['project'][0]['end_time']" :start="startDate"
							 :end="endDate" @change="bindEndTimeProject">
								<view class="pick-val">{{formData['project'][0]['end_time']?formData['project'][0]['end_time'].split(" ")[0]:""}}</view>
							</picker>
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">工作内容：</view>
						<view class="his-val">
							<textarea class="his-input overview" v-model="formData['project'][0]['overview']" auto-height placeholder-style="color:#a9c4f6"></textarea>
						</view>
					</view>
				</view>
			</template>
			<view class="submit-resume" @click="editResume('PUT')">
				提交
			</view>
		</view>
	</view>
</template>

<script>
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
					company: [{
						"id": "",
						"company": "",
						"job": "",
						"start_time": "",
						"end_time": "",
						"infomation": ""
					}],
					project: [{
						"id": "",
						"name": "",
						"overview": "",
						"start_time": "",
						"end_time": ""
					}]
				}
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
			that.editResume('GET');
		},
		methods: {
			bindDateChange(e) {
				this.formData['brithday'] = e.target.value
			},
			bindStartTime(e) {
				this.formData['school'][0]['start_time'] = e.target.value
			},
			bindEndTime(e) {
				this.formData['school'][0]['end_time'] = e.target.value
			},
			bindStartTimeProject(e) {
				this.formData['project'][0]['start_time'] = e.target.value
			},
			bindEndTimeProject(e) {
				this.formData['project'][0]['end_time'] = e.target.value
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
		padding: 10rpx 0;
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
	}

	.history {
		padding: 30rpx;
	}

	.his-block {
		padding-bottom: 20rpx;
	}

	.his-title {
		font-size: 40rpx;
		border-bottom: 4rpx solid #000000;
		color: #000000;
		line-height: 2;
		margin-bottom: 15rpx;
	}

	.his-row {
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		align-items: center;
		align-content: center;
		padding: 15rpx 0;
	}

	.his-label {
		/* width: 25%; */
		font-size: 36rpx;
	}

	.his-val {
		flex: 1;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		align-items: stretch;
	}

	.his-input {
		width: 100%;
		font-size: 36rpx;
		border-bottom: 1px solid #7f7f7f;
		text-align: center;
		color: #666;
	}
	.pick-val{
		font-size: 36rpx;
	}

	.his-input-helf {
		width: 45%;
		text-align: center;
	}
	.overview{
		text-align: left;
	}

	.submit-resume {
		width: 100%;
		background: #3a78ea;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-direction: row;
		line-height: 3;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
