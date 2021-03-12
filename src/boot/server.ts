import { createServer } from 'miragejs';

export default () => {
  if (process.env.DEV) {
    createServer({
      routes() {
        this.get('/api/todos', () => [
          {
            id: 1,
            content: 'ct1'
          },
          {
            id: 2,
            content: 'ct2'
          },
          {
            id: 3,
            content: 'ct3'
          },
          {
            id: 4,
            content: 'ct4'
          },
          {
            id: 5,
            content: 'ct5'
          }
        ]);
      }
    });
  }
};
