export default {
  routes: [
    {
      method: 'GET',
      path: '/hero',
      handler: 'hero.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};