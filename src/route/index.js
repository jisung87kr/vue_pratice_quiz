import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/AppHome.vue';
import About from '../views/AppAbout.vue';
import Quiz from '../views/AppQuiz.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/quiz', name: 'quiz', component: Quiz },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;