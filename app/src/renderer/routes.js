export default [
  {
    path: '/',
    name: 'home-view',
    component: require('components/HomeView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
