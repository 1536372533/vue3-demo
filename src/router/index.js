import { createRouter, createWebHistory } from 'vue-router'

// 定义路由数组，每个路由映射到一个组件
const routes = [
	{
        path: '/',
        redirect: '/login'
    },
	{ 
		path: '/login', 
        component: () => import( './../views/login.vue'), //登陆主页面
		name: 'Login'
	},
	{
		path: '/demo',
		component: () => import('../views/demo.vue'),
		name: 'AppDemo'
	},
	{ 
		path: '/home', 
        component: () => import( './../views/home.vue'), //主页面
		name: 'Home',
		redirect: '/welcome',
		children:[
			{
				path: '/welcome', 
				component: () => import( './../views/welcome.vue'), //主页面
				name: 'Welcome'
			},
			{
				path: '/welcome/demo', 
				component: () => import( './../components/demo/AppDemo.vue'), //主页面
				name: 'Demo'
			},
		]
	},
	
]

// 配置路由，创建并暴露路由实例
export default createRouter({
	// 这里使用 hash 模式
	history: createWebHistory(),
	// routes: routes 的缩写
	routes,
})