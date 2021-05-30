import Vue from 'vue'
import Router from 'vue-router'
// import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
// import Home from '../components/Home'
// import ItemsetIndex from '../components/itemset/ItemsetIndex'
// import ArtifactIndex from '../components/artifact/ArtifactIndex'
// import WorkIndex from '../components/work/WorkIndex'

import Register from '../components/Register'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		// {
		// 	path: '/home',
		// 	name: 'Home',
		// 	component: Home,
		// 	// home页面并不需要被访问
		// 	redirect: '/index',
		// 	children: [{
		// 			path: '/index',
		// 			name: 'AppIndex',
		// 			component: AppIndex,
		// 			meta: {
		// 				requireAuth: true
		// 			}
		// 		},
		// 		{
		// 			path: '/itemset',
		// 			name: 'Itemset',
		// 			component: ItemsetIndex,
		// 			meta: {
		// 				requireAuth: true
		// 			}
		// 		},
		// 		{
		// 		     path: '/artifact',
		// 		     name: 'Artifact',
		// 		     component: ArtifactIndex,
		// 		     meta: {
		// 		         requireAuth: true
		// 		     }
		// 		 },
		// 		 {
		// 		      path: '/work',
		// 		      name: 'Work',
		// 		      component: WorkIndex,
		// 		  }
		// 	]
		// },
		//修改
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		
		
		


		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		
		{
		    path: '/admin',
		    name: 'Admin',
		    component: () => import('../components/admin/AdminIndex'),
		    meta: {
		        requireAuth: true
		    }
		},
		{
		    path: '/blank',
		    name: 'Blank',
		    component: () => import('../components/admin/Blank'),
		}
	]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
	
	{
	  path: '/blank',
	  name: 'Blank',
	  component: Blank
	},
	
	
	
	
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
        },
        {
          path: '/artifact',
          name: 'Artifact',
          component: ArtifactIndex
        },
		{
		  path: '/work',
		  name: 'Work',
		  component: WorkIndex
		},
        {
          path: '/itemset',
          name: 'Itemset',
          component: ItemsetIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashboard',
          component: DashBoard,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
