
import VueRouter from 'vue-router';
import PostList from "../components/PostList";
import PostCreate from '../components/PostCreate';
import PostEdit from '../components/PostEdit';


export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PostList,
            name: 'posts'
        },
        {
            path: '/posts/create',
            component: PostCreate,
            name: 'posts.create'
        },
        {
            path: '/posts/edit/:id',
            component: PostEdit,
            name: 'posts.edit'
        }
    ]
}
