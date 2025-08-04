export default {
  routes: [
    {
      method: 'GET',
      path: '/widgets',
      handler: 'widget.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/widgets/:id',
      handler: 'widget.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};