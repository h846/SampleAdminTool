<template>
  <v-card class="mt-5 pa-5">
    <v-row>
      <v-col cols="3">
        <v-text-field
          @keyup.enter="searchItem('style')"
          v-model="style"
          outlined
          label="Style Search"
          placeholder="S#"
          hide-details
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          @keyup.enter="searchItem('loc')"
          v-model="loc"
          outlined
          label="Location Search"
          placeholder="LO"
          hide-details
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          @keyup.enter="searchItem('cCode')"
          v-model="cCode"
          outlined
          label="Color Code Search"
          placeholder="Color"
          hide-details
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          @keyup.enter="searchItem('cName')"
          v-model="cName"
          outlined
          label="Color Name Search"
          placeholder="Color"
          hide-details
          dense
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" md="4">
        <p class="ma-0 mb-1 btn-title">Create New</p>
        <!--
        <v-btn color="primary" width="90" small>Create</v-btn>
        -->
        <new-create />
      </v-col>
      <v-col cols="6" md="4">
        <p class="ma-0 mb-1 btn-title">Label List</p>
        <v-row>
          <v-col cols="5">
            <v-btn color="success" width="90" small>Style</v-btn>
          </v-col>
          <v-col cols="5">
            <v-btn color="success" width="90" small>Loc</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" md="4">
        <p class="ma-0 mb-1 btn-title">Label Print</p>
        <v-btn color="error" width="90" small>Label Print</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import NewCreate from './newCreate.vue'
export default {
  name: 'IndexPage',
  data() {
    return {
      style: '',
      loc: '',
      cCode: '',
      cName: '',
      result: [],
    }
  },
  computed: {
    sampleData() {
      return this.$store.state.sampleData
    },
  },
  methods: {
    searchItem(type) {
      switch (type) {
        case 'style':
          this.result = this.sampleData.filter((val) => {
            return String(val.STY_NUM).indexOf(this.style) !== -1
          })
          break
        case 'loc':
          this.result = this.sampleData.filter((val) => {
            return String(val.LOCATION).indexOf(this.loc) !== -1
          })
          break
        case 'cCode':
          this.result = this.sampleData.filter((val) => {
            return String(val.CLR).indexOf(this.cCode) !== -1
          })
          break
        case 'cName':
          this.result = this.sampleData.filter((val) => {
            return String(val.CLR_DSC_JP).indexOf(this.cName) !== -1
          })
          break
      }
      this.$store.commit('setSearchResult', this.result)
      console.log(this.result)
    },
  },
  components: { NewCreate },
}
</script>
<style scoped>
.btn-title {
  font-weight: bold !important;
  color: #000 !important;
  font-size: 1rem !important;
  width: 110px;
}
</style>
