export default function ({ $axios }, inject) {
  const api = $axios.create();
  api.setHeader('Authorization', `bearer ${process.env.STRAPIKEY}`);
  api.setBaseURL(`${process.env.API_URL}?populate=%2A`);
  inject('api', api)
}
