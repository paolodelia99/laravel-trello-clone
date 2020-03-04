import Vue from 'vue';
import VueRouter from 'vue-router';
import feather from 'vue-icon';

Vue.use(VueRouter);
Vue.use(feather, {
    name: 'v-icon',
    props: {
        baseClass: {
            type: String,
            default: 'v-icon'
        },
        classPrefix: {
            type: String,
            default: 'v-icon-'
        }
    }
});

import App          from './components/App'
import Dashboard    from './components/Board'
import Login        from './components/Login'
import Register     from './components/Register'
import Home         from './components/Welcome'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/board',
            name: 'board',
            component: Dashboard,
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
