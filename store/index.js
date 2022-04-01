export const state = () => ({
  sampleData: [],
  searchResult: [],
})

export const mutations = {
  setSampleData(state, data) {
    state.sampleData = data
  },
  setSearchResult(state, data) {
    state.searchResult = data
  },
}

export const actions = {}
