import { MutationTree } from 'vuex';
import { ReportsAppState } from './state';

const mutation: MutationTree<ReportsAppState> = {
  setTags(state, paylod: string[]) {
    state.tags = paylod;
  }
};

export default mutation;
