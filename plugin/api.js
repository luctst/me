export default function ({ $axios }, inject) {
  const api = $axios.create();
  // api.setHeader('Authorization', `Bearer ${process.env.STRAPIKEY}`);
  api.setBaseURL(`${process.env.NUXT_ENV_API_URL}?populate=%2A&sort=createdAt:asc`);
  inject('api', api)
}
