import { defaultChartColors } from '../app/framework/charts/chart-colors.config';

export const environment = {
  production: true,
  api_url: 'http://localhost:8080/',
  google_client_id: '726155933363-am0vqngulv5soqerhhprndt5kj4judtl.apps.googleusercontent.com',
  minio_url: 'https://minio.app.pb.utfpr.edu.br/dainf-labs/',
  charts: {
    colors: defaultChartColors
  }
};
