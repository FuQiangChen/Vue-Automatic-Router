import { createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
});
const components = import.meta.glob('../views/**/index.vue', {
  eager: true,
  import: 'default'
});
// 通过解构来获取Object.entries 获取所有可枚举字符串键属性的键值对
const routes = Object.entries(pages).map(([path, meta]) => {

  const compPath = path.replace('page.js', 'index.vue');
  path = path.replace('../views', '').replace('/page.js', '') || '/';
  console.log(path);
  const name = path.split('/').filter(Boolean).join('-') || 'index';



  return {
    path,
    name,
    component: () => components[compPath],
    meta
  }

})
console.log(routes);


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
