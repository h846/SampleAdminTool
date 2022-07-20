<template>
  <v-sheet>
    <search-form />
    <card-items />
  </v-sheet>
</template>

<script>
import CardItems from '~/components/cardItems.vue'
import searchForm from '~/components/searchForm.vue'
export default {
  components: { searchForm, CardItems },
  created() {
    this.$store.dispatch('getSampleData')
  },
}
</script>

<style></style>
