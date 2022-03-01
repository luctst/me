export const state = () => ({
  npm: null,
  app: null,
  repos: null,
  canFetchRepos: true,
  reposPage: 0,
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
    if (Array.isArray(state.repos)) {
      state.repos.push(...r);
      state.reposPage = state.reposPage + 1;
      return true;
    }

    state.repos = r;
    state.reposPage = state.reposPage + 1;
  },
  STOP_FETCH(state, b) {
    state.canFetchRepos = b;
  }
};

export const actions = {
  async fetchRepo({ commit, state }) {
    if (state.canFetchRepos) {
      const repos = await this.$axios.$get(
        'user/repos',
        {
          params: {
            sort: 'pushed',
            per_page: 10,
            page: state.reposPage
          }
        }
      );
      
      if (repos.length) {
        commit('UPDATE_REPOS', repos);
        return true;
      }

      commit('STOP_FETCH', false);
    }

  }
};