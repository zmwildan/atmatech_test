const initValue = {
  lists: [],
  error: {},
};

export const state = () => ({
  ...initValue,
});

export const mutations = {
  FETCH_BOOK(state, response) {
    state.lists = response;
  },
  CREATE_BOOK(state, response) {
    state.lists = state.lists.concat(response);
  },
  REMOVE_BOOK(state, id) {
    const index = state.lists.findIndex((data) => data.id === id);

    if (index !== -1) {
      state.lists.splice(index, 1);
    }
  },
  UPDATE_BOOK(state, response) {
    const index = state.lists.findIndex((data) => data.id === response.id);
    if (index !== -1) {
      state.lists.splice(index, 1, response);
    }
  },
};

export const actions = {
  fetchBook({ commit }) {
    this.$axios
      .get("api/book")
      .then((r) => r.data)
      .then((response) => {
        commit("FETCH_BOOK", response);
      });
  },
  createBook({ commit }, data) {
    this.$axios
      .post("api/book", data)
      .then((r) => r.data)
      .then((response) => {
        commit("CREATE_BOOK", response);
      });
  },
  updateBook({ commit }, data) {
    this.$axios
      .put(`api/book/${data.id}`, data.formData)
      .then((r) => r.data)
      .then((response) => {
        commit("UPDATE_BOOK", response);
      });
  },
  deleteBook({ commit }, id) {
    this.$axios
      .delete(`api/book/${id}`)
      .then((r) => r.data)
      .then((response) => {
        commit("REMOVE_BOOK", id);
      });
  },
};
