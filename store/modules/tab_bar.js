const nav_default = [{
		name: '职位',
		name_code: 'index',
		iconColor: "",
		link: "/pages/index/index",
		icon: 'qiwangzhiwei',
		flex_dir: "flex-column" //flex-row flex-column
	},
	{
		name: '人力资源公司',
		name_code: 'company',
		iconColor: "",
		link: "/pages/company/index",
		icon: 'qiye',
		flex_dir: "flex-column"
	},
	{
		name: '我的',
		name_code: 'user',
		iconColor: "",
		link: "/pages/user/index",
		icon: 'rentou',
		flex_dir: "flex-column"
	}

]
export default {
	state: {
		footer_nav: nav_default,
		now_page_index: '',
	},
	mutations: {
		change_nav_list(state, data) {
			state.footer_nav = data;
		},
		change_page(state, index) {
			state.now_page_index = index;
		}
	},
	actions: {
		menu_default(ctx) {
			let menu_list = nav_default
			ctx.commit("change_nav_list", menu_list)
		},
		menu_type_1(ctx) {
			let menu_list = [{
					name: '职位',
					name_code: 'index',
					iconColor: "",
					link: "/pages/index/index",
					icon: 'qiwangzhiwei',
					flex_dir: "flex-column" //flex-row flex-column
				},
				{
					name: '我的',
					name_code: 'user',
					iconColor: "",
					link: "/pages/user/index",
					icon: 'rentou',
					flex_dir: "flex-column"
				}
			]
			ctx.commit("change_nav_list", menu_list)
		},
		menu_type_2(ctx) {
			let menu_list = []
			ctx.commit("change_nav_list", menu_list)
		}
	}
}
