import { createServer } from 'miragejs';
// import { Order } from '../components/models';

export default () => {
  const orders = [
    {
      name: 'Order 1',
      description: 'order number one',
      tags: ['Customer']
    },
    {
      name: 'Order 2',
      description: 'order number two',
      tags: []
    },
    {
      name: 'Order 3',
      description: 'order number three',
      tags: ['Daily', 'Weekly']
    }
  ];
  const tags = ['Customer', 'Support', 'Invest', 'Daily', 'Weekly'];
  if (process.env.DEV) {
    createServer({
      routes() {
        this.get('/api/orders', () => orders);
        this.get('/api/tags', () => tags);
        this.post('/api/newOrder', (schema, request) => {
          if (request.requestBody) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const order = JSON.parse(request.requestBody);
            orders.push(order);
          }
        });
      }
    });
  }
};
