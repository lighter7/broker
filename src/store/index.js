// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     username: '',
//   },
//   mutations: {
//     SET_USERNAME(state, username) {
//       state.username = username;
//     },
//   },
//   actions: {
//     updateUsername(context, username) {
//       context.commit('SET_USERNAME', username);
//     },
//   },
// });
