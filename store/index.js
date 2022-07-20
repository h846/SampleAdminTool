import axios from 'axios'
export const state = () => ({
  sampleData: [],
  searchResult: [],
})

export const mutations = {
  setSampleData(state, data) {
    const result = data.map((val) => {
      for (const k in val) {
        if (val[k] == 'null') {
          val[k] = ''
        }else if(k=='STY_PRINT_FLG' || k=='LOC_PRINT_FLG'){
          val[k] = parseInt(val[k])
        }
      }
      return val
    })
    state.sampleData = result
  },
  setSearchResult(state, data) {
    state.searchResult = data
  },
}

export const actions = {
  getSampleData: async function({commit}){
    return axios
      .post('http://lejnet/api-test/csnet/sample_item/')
      .then((res) => {
        commit('setSampleData', res.data)
        console.log(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
