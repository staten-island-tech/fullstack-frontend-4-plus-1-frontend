export const state = () => ({
  beatmapData: {},
});

export const getters = {};

export const actions = {};

export const mutations = {
  setBeatmap(state, data) {
    state.beatmapData = data;
  },
};

// this.$store.commit('setBeatmap', beatmapData);
