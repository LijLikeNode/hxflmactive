import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Present from '@/components/Present'
import Rank from '@/components/Rank'
import Home from '@/components/Home'
import Intro from '@/components/Intro'
import Question from '@/components/Question'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{txt:'我要推介'}
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{txt:'抽奖回执'}
    },
    {
      path: '/intro/:id',
      name: 'intro',
      component: Intro,
      meta:{txt:'产品介绍'}
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question,
      meta:{txt:'少儿成长调查问卷'}
    },
    {
      path: '/present/:id',
      name: 'present',
      component: Present,
      meta:{txt:'抽奖'}
    },
    {
      path: '/rank/:id',
      name: 'rank',
      component: Rank,
      meta:{txt:'排行榜'}
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.txt) {
    document.title = to.meta.txt
  }
  next();
});
export default router;