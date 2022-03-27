import { createRouter, createWebHistory } from "vue-router";

import IndexPage from '../views/Index.vue'
import WorkSpace from '../views/Workspace.vue'

export const router = createRouter({
    routes: [
        {component: IndexPage, path: '/'},
        {component: WorkSpace, path: '/app'},
        {component: WorkSpace, path: '/app/note/:note'},
        // ...
        // {component: <404>, path: '/:catchAll(.*)'}
    ],
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition){
        return {top: 0, behavior: 'smooth'}
    }
})

