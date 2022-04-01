<template>
  <v-sheet>
    <search-form />
    <card-items />
  </v-sheet>
</template>

<script>
import axios from 'axios'
import CardItems from '~/components/cardItems.vue'
import searchForm from '~/components/searchForm.vue'
export default {
  components: { searchForm, CardItems },
  async fetch({ store }) {
    await axios
      .post('http://lejnet/api-test/csnet/sample_item/')
      .then((res) => {
        store.commit('setSampleData', res.data)
        console.log(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  },
}
</script>

<style></style>
