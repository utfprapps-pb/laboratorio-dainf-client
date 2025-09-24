import {defaultChartColors} from '../app/framework/charts/chart-colors.config';

export const environment = {
  production: false,
  api_url: 'https://test-labs-api.app.pb.utfpr.edu.br/',
  google_client_id: '726155933363-am0vqngulv5soqerhhprndt5kj4judtl.apps.googleusercontent.com',
  minio_url: 'http://localhost:9000/dainf-labs/',
  charts: {
    colors: defaultChartColors
  }
};

