// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //api_url: 'https://tcc-server-utfpr.herokuapp.com/server/'
  //api_url: 'http://172.20.190.22:8099/server/'
  api_url: 'http://localhost:8099/server/',
  google_client_id: '310109923674-la5thl4s4t0b2ajp6acdhq7tra74dn31.apps.googleusercontent.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
