export const state = () => ({
  npm: null,
  app: null,
  repos: null,
  footerLinks: [
    {
      href: 'https://github.com/luctst',
      content: 'GitHub',
    },
    {
      href: 'https://dev.to/luctst',
      content: 'Dev.to'
    },
    {
      href: '',
      content: 'Linkedin'
    }
  ]
});

export const mutations = {
  UPDATE_REPOS(state, r) {
    state.repos = r;
  }
};

export const actions = {
  async fetchRepo({ commit }) {
    const repos = await this.$axios.$get('user/repos?sort=pushed&per_page=10');
    commit('UPDATE_REPOS', repos);
  }
};