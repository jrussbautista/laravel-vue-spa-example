require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './components/App';
import routes from './routes';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueRouter);

const router = new VueRouter(routes);


Vue.component('pagination', require('laravel-vue-pagination'));
Vue.use(VueSweetalert2);


new Vue({
    el: '#app',
    components: {
        App
    },
    router
});
