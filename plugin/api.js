export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create();
  api.setHeader('Authorization', `bearer ${process.env.STRAPIKEY}`);
  api.setBaseURL(process.env.API_URL_DEV);
  // Inject to context as $api
  inject('api', api)
}
