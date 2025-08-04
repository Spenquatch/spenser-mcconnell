export default {
  routes: [
    {
      method: 'GET',
      path: '/talks',
      handler: 'talk.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/talks/:id',
      handler: 'talk.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};