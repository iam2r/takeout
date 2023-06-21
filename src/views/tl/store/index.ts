import { IAppState } from './modules/app'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
}

const vuexLocal = createPersistedState({
  reducer({ app: { language, size } }: IRootState): {
    app: Partial<IAppState>
  } {
    return {
      app: {
        language,
        size
      }
    }
  }
})

const store = new Vuex.Store<IRootState>({
  plugins: [vuexLocal]
})

export const getVuexStorage = (key = 'vuex'): IRootState => {
  const storage = localStorage.getItem(key)
  return storage ? JSON.parse(storage) : {}
}

export default store
