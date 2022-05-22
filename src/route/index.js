import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/AppHome.vue';
import About from '../views/AppAbout.vue';
import Quiz from '../views/AppQuiz.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/quiz', component: Quiz },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;