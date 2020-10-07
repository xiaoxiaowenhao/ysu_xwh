import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Index',
        component: () => import('@/views'),
    }, {
        path: '/home',
        name: 'Home',
        component: () => import('@/components/Home'),
        children: [{
            path: '/order',
            name: 'Order',
            component: () => import('@/views/order')
        }, {
            path: '/user',
            name: 'User',
            component: () => import('@/views/user'),
            children: [{
                path: '/userdata',
                name: 'UserData',
                component: () => import('@/views/userdata')
            }, {
                path: '/orderlist',
                name: 'OrderList',
                component: () => import('@/views/orderlist')
            }]
        }]
    }]
})