import { createRouter, createWebHistory } from 'vue-router'

// 定义路由数组，每个路由映射到一个组件
const routes = [
	{
        path: '/',
        redirect: '/login'
    },
	{ 
		path: '/login', 
        component: () => import( './../views/login.vue'), //主页面
		name: 'LOgin'
	},
	{ 
		path: '/list', 
        component: () => import( './../views/list.vue'), //主页面
		name: 'List'
	},
]

// 配置路由，创建并暴露路由实例
export default createRouter({
	// 这里使用 hash 模式
	history: createWebHistory(),
	// routes: routes 的缩写
	routes,
})