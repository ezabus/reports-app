import { createServer } from 'miragejs';
// import { Order } from '../components/models';

export default () => {
  if (process.env.DEV) {
    createServer({
      routes() {
        this.get('/api/orders', () => [
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
        ]);
      }
    });
  }
};
