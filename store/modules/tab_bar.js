const cname_default = "人力资源公司";
const links = ["/pages/index/index", "/pages/company/index", "/pages/user/index"]
const nav_default = [{
		name: '职位',
		name_code: 'index',
		iconColor: "",
		link: links[0],
		icon: 'qiwangzhiwei',
		flex_dir: "flex-column" //flex-row flex-column
	},
	{
		name: cname_default,
		name_code: 'company',
		iconColor: "",
		link: links[1],
		icon: 'qiye',
		flex_dir: "flex-column"
	},
	{
		name: '我的',
		name_code: 'user',
		iconColor: "",
		link: links[2],
		icon: 'rentou',
		flex_dir: "flex-column"
	}
];
export default {
	state: {
		footer_nav: nav_default,
		now_page_index: '',
		companyName: cname_default
	},
	mutations: {
		change_nav_list(state, data) {
			state.footer_nav = data;
		},
		change_page(state, index) {
			state.now_page_index = index;
		},
		set_company_name(state, val) {
			state.companyName = val;
		}
	},
	getters: {
		bar_index: state => state.now_page_index,
	},
	actions: {
		menu_default(ctx) {
			nav_default[1]["name"] = ctx.state.companyName;
			let cid = ctx.rootState.enterprise_id;
			console.log("enterprise_id：", cid)
			if (cid) {
				nav_default[0]["link"] = links[0] + "?enterprise_id=" + cid;
				nav_default[1]["link"] = links[1] + "?enterprise_id=" + cid;
				nav_default[2]["link"] = links[2] + "?enterprise_id=" + cid;
			}
			let menu_list = nav_default;
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
