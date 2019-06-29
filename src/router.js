import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
    {
        path: '/home',
        redirect: { name: 'home' }
    },
    {
        path: '/',
        component: function (resolve) {
            require(['./views/recharge.vue'], resolve)
        },
        name: 'home'
    },
    // {
    //     path: '/active/rule',
    //     component: function (resolve) {
    //         require(['./views/active/rule.vue'], resolve)
    //     },
    //     name: 'rule'
    // },
    {
        path: '/active/check',
        component: function (resolve) {
            require(['./views/active/check.vue'], resolve)
        },
        name: 'check'
    }]
})
