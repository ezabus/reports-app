import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportsAppState } from './state';

const getters: GetterTree<ReportsAppState, StateInterface> = {
  getTags(state) {
    return state.tags;
  }
};

export default getters;
