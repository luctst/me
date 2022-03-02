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
  ],
  hostName: 'http://ec2-54-77-208-143.eu-west-1.compute.amazonaws.com',
  modals: [],
});

export const mutations = {
  ADD_MODAL(state, newModalData) {
    newModalData.top = '25%';
    newModalData.left = '50%';
    newModalData.zIndex = 100 + state.modals.length;

    state.modals.push(newModalData);
  },
  REMOVE_MODAL(state, index) {
    const newModalsArray = [...state.modals];
    newModalsArray.splice(index, 1);
    state.modals = newModalsArray;
  },
  UPDATE_APP(state, a) {
    if (Array.isArray(state.app)) {
      state.app.push(...a);
      return true;
    }

    state.app = a;
  },
  UPDATE_NPM(state, n) {
    if (Array.isArray(state.npm)) {
      state.npm.push(...n);
      return true;
    }

    state.npm = n;
  },
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
  async fetchProducts({ commit }) {
    const npm = [];
    const app = [];
    const response = await this.$api.get();

    response.data.data.forEach((p) => {
      const objToPush = {
        id: p.id,
        description: p.attributes.description,
        html_url: p.attributes.url,
        itemsType: p.attributes.type,
        topics: p.attributes.topics,
        name: p.attributes.name,
        visibility: p.attributes.visibility,
        pushed_at: p.attributes.createdAt,
        ...(p.attributes.assets && { media: p.attributes.assets.data }),
      };
       
      if (objToPush.itemsType === 'app') {
        app.push(objToPush);
        return true;
      }
      
      npm.push(objToPush);
      return true;
    });

    if (app.length) commit('UPDATE_APP', app);
    if (npm.length) commit('UPDATE_NPM', npm);
  },
  async fetchRepo({ commit, state }) {
    if (state.canFetchRepos) {
      const repos = await this.$axios.$get(
        'https://api.github.com/user/repos',
        {
          params: {
            sort: 'pushed',
            per_page: 10,
            page: state.reposPage
          },
          headers: {
            Authorization: `token ${process.env.APIKEY}`,
            Accept: 'application/vnd.github.v3+json',
            "User-Agent": "luctst",
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