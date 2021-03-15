import { createServer } from 'miragejs';

export default () => {
  const reports = [
    {
      name: 'Report_1',
      description: 'report number one',
      tags: ['Customer']
    },
    {
      name: 'Report_2',
      description: 'report number two',
      tags: []
    },
    {
      name: 'Report_3',
      description: 'report number three',
      tags: ['Daily', 'Weekly']
    },
    {
      name: 'Report_4',
      description: 'report number four',
      tags: ['Daily']
    }
  ];
  const tags = ['Customer', 'Support', 'Invest', 'Daily', 'Weekly'];
  createServer({
    routes() {
      this.get('/api/reports', () => reports);
      this.get('/api/tags', () => tags);
      this.post('/api/newReport', (schema, request) => {
        if (request.requestBody) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const order = JSON.parse(request.requestBody);
          reports.push(order);
        }
      });
    }
  });
};
