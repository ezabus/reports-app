import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportsAppState } from './state';
import axios from 'axios';

const actions: ActionTree<ReportsAppState, StateInterface> = {
  async someAction({ commit }) {
    const tags = (await axios.get<string[]>('/api/tags')).data;
    commit('setTags', tags);
  }
};

export default actions;
