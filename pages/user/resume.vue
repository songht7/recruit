<template>
	<view class="content">
		<view class="header">
			<view class="portrait">
				<image v-if="portrait" class="portrait-img" src="../../static/logo.png" mode="aspectFit"></image>
				<uni-icons v-else class="portrait-img" type="touxiang1" size="75"></uni-icons>
			</view>
			<view class="user-name">用户名</view>
			<view class="u-base-info">
				<view class="b-row">
					<uni-icons class="b-icon" type="shengri1" size="18" color="#fff"></uni-icons>
					<input class="b-input" type="text" v-model="formData['brithday']" placeholder="生日" placeholder-style="color:#a9c4f6" />
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
					<input class="b-input" type="text" v-model="formData['phone']" placeholder="您的电话号" placeholder-style="color:#a9c4f6" />
				</view>
			</view>
			<view class="about_self"><textarea v-model="formData['about_self']" auto-height placeholder-style="color:#a9c4f6"
				 placeholder="自我简介"></textarea></view>
		</view>
		<view class="history">
			<template>
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
			</template>
			<template>
				<view class="his-block">
					<view class="his-title">教育经历</view>
					<view class="his-row">
						<view class="his-label">毕业学校：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">学历：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">就读年份：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">攻读专业：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
				</view>
			</template>
			<template>
				<view class="his-block">
					<view class="his-title">职业技能</view>
					<view class="his-row">
						<view class="his-label">公司：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">职位：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">年份：</view>
						<view class="his-val">
							<input class="his-input" type="text" v-model="formData['post']" />
						</view>
					</view>
					<view class="his-row">
						<view class="his-label">工作内容：</view>
						<view class="his-val">
							<textarea class="his-input" v-model="formData['Job']['content']" auto-height placeholder-style="color:#a9c4f6"></textarea>
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				portrait: !false,
				formData: {
					name: "",
					brithday: "",
					email: "",
					phone: "",
					age_work: "",
					education: "",
					sex: "",
					post: "", //期望岗位
					status: "", //目前状况
					school: [],
					company: [],
					project: []
				}
			}
		}

		,
		onLoad() {}

		,
		onShow() {
			var that = this;
			that.$store.dispatch("cheack_page", 2);
		}

		,
		methods: {
			userBinding() {
				uni.navigateTo({
						url: '/pages/user/login'
					}

				)
			}

			,
			userBuild() {}

			,
			resumeBtn() {}
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
		padding: 30rpx;
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
		width: 25%;
		font-size: 32rpx;
	}

	.his-val {
		flex: 1;
	}

	.his-input {
		width: 100%;
		font-size: 32rpx;
		border-bottom: 1px solid #7f7f7f;
	}
</style>
