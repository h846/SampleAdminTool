<template>
  <v-card class="mt-5 pa-5" elevation="5">
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
      <v-col cols="2" md="2">
        <p class="ma-0 mb-1 btn-title">Create New</p>
        <New-Create />
      </v-col>
      <v-col cols="2" md="2">
        <p class="ma-0 mb-1 btn-title">一括解除</p>
        <v-btn color="indigo" dark small @click="allPrtFlgRelease()">
          <v-icon small>mdi-printer</v-icon
          ><span class="ml-2">Release</span></v-btn
        >
      </v-col>
      <v-col cols="5" md="4">
        <p class="ma-0 mb-1 btn-title">Label List</p>
        <v-row>
          <v-col cols="5">
            <v-btn
              color="success"
              width="90"
              small
              @click="searchItem('style-print')"
              >STYLE</v-btn
            >
          </v-col>
          <v-col cols="5">
            <v-btn
              color="success"
              width="90"
              small
              @click="searchItem('location-print')"
              >Loc</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" md="4">
        <p class="ma-0 mb-1 btn-title">Label Print</p>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small color="red lighten-2" dark v-bind="attrs" v-on="on">
              Label Print
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              ラベルの種類を選択
            </v-card-title>
            <v-card-text class="text-center pt-5">
              <v-row>
                <v-col cols="6">
                  <v-btn width="200" color="primary" nuxt to="productLablePrint"
                    >商品ラベル印刷</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    width="200"
                    color="primary"
                    nuxt
                    to="locationLabelPrint"
                    >ロケーションラベル印刷</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="selectedItem"
                    :items="items"
                    outlined
                    @change="changeStartPosition"
                    label="印刷位置を指定してください"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text x-small @click="dialog = false">
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <nuxt-link to="/PrintManual.pdf" target="_blank">印刷方法</nuxt-link>
      </v-col>
    </v-row>
    <!-- SNACK BAR-->
    <v-snackbar v-model="snackbar">
      検索結果はありませんでした。
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template></v-snackbar
    >
  </v-card>
</template>

<script>
import axios from 'axios'

import NewCreate from './newCreate.vue'
import CardItems from './cardItems.vue'
export default {
  name: 'IndexPage',
  data() {
    return {
      style: '',
      loc: '',
      cCode: '',
      cName: '',
      snackbar: false,
      dialog: false,
      selectedItem: 0,
      items: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
    }
  },

  methods: {
    searchItem(type) {
      let list = [...this.$store.state.sampleData]
      let result
      // console.log(list)
      switch (type) {
        case 'style':
          result = list.filter((val) => {
            return String(val.STY_NUM).indexOf(this.style) !== -1
          })
          break
        case 'loc':
          result = list.filter((val) => {
            return String(val.LOCATION).indexOf(this.loc) !== -1
          })
          break
        case 'cCode':
          result = list.filter((val) => {
            return String(val.CLR).indexOf(this.cCode) !== -1
          })
          break
        case 'cName':
          result = list.filter((val) => {
            return String(val.CLR_DSC_JP).indexOf(this.cName) !== -1
          })
          break
        case 'style-print':
          result = list.filter((val) => {
            return val.STY_PRINT_FLG == '1'
          })
          break
        case 'location-print':
          result = list.filter((val) => {
            return val.LOC_PRINT_FLG == '1'
          })

          break
      }

      if (result.length == 0) {
        this.snackbar = true
      }

      this.$store.commit('setSearchResult', result)
      console.log(result)
    },
    changeStartPosition() {
      this.$store.commit('setPrintStartPosition', this.selectedItem)
    },
    async allPrtFlgRelease() {
      let sql =
        'UPDATE CSNET.CS_SAMPLE_DB SET STY_PRINT_FLG = 0, LOC_PRINT_FLG = 0'
      await axios
        .post('http://lejnet/api-test/csnet/sample_item', {
          sql,
        })
        .then((res) => {
          this.$store.dispatch('getSampleData').then(() => {
            let sampleData = this.$store.getters.getSampleData
            let searchResult = this.$store.getters.getSearchResult
            // if it has already been searched
            if (searchResult.length > 0) {
              let result = sampleData.filter((val) => {
                return searchResult.find((e) => e.ID == val.ID)
              })
              this.$store.commit('setSearchResult', result)
              console.log({ result })
            }
          })
        })
    },
  },
  components: { NewCreate, CardItems },
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
