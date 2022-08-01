<template>
  <v-row>
    <v-col cols="12" v-for="(i, idx) in resultList" :key="idx">
      <v-card elevation="5" class="mt-10 mx-auto" tile outlined min-width="700">
        <v-container>
          <v-row>
            <v-col cols="12" md="7">
              <dl class="ma-3">
                <dt>STYLE</dt>
                <dd>{{ i.STY_NUM }}</dd>
                <dt>DESC</dt>
                <dd>{{ i.STY_NAME_JP }}</dd>
                <dt>COLOR</dt>
                <dd>{{ i.CLR_DSC_JP }}</dd>
                <dt>C_CODE</dt>
                <dd>{{ i.CLR }}</dd>
                <dt>SIZE</dt>
                <dd>{{ i.SIZ }}</dd>
                <dt>PRICE</dt>
                <dd>{{ i.ORIGINAL_PRICE }}</dd>
                <dt>SELLING PRICE</dt>
                <dd>{{ i.SELLING_PRICE }}</dd>
                <dt>ID</dt>
                <dd>{{ i.ID }}</dd>
                <dt>LOCATION</dt>
                <dd>{{ i.LOCATION }}</dd>
              </dl>
            </v-col>
            <v-col cols="12" md="5">
              <div class="note" v-if="!!i.NOTE">
                <div class="mb-3">
                  <v-icon>mdi-comment</v-icon>
                  <span>NOTE</span>
                </div>
                {{ i.NOTE }}
              </div>
              <v-card-actions>
                <div>
                  <p class="ma-0 text-caption">STYLE</p>
                  <v-btn
                    @click="updtFlg(i, 'STY')"
                    small
                    class="mr-5"
                    fab
                    dark
                    :color="
                      i.STY_PRINT_FLG == 1 ? 'green accent-4' : 'red darken-4'
                    "
                  >
                    <v-icon dark>
                      {{
                        i.STY_PRINT_FLG == 1 ? 'mdi-printer' : 'mdi-printer-off'
                      }}</v-icon
                    >
                  </v-btn>
                </div>
                <div>
                  <p class="ma-0 text-caption">LOCATION</p>
                  <v-btn
                    @click="updtFlg(i, 'LOC')"
                    small
                    fab
                    dark
                    :color="
                      i.LOC_PRINT_FLG == 1 ? 'green accent-4' : 'red darken-4'
                    "
                  >
                    <v-icon dark>
                      {{
                        i.LOC_PRINT_FLG == 1 ? 'mdi-printer' : 'mdi-printer-off'
                      }}</v-icon
                    >
                  </v-btn>
                </div>
                <!-- Edit Dialog -->
                <edit-info :id="i.ID" />
                <!-- 401059 -->
                <!-- Remove Dialog -->
                <remove-data :id="i.ID" />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'

import editInfo from './editInfo.vue'
import removeData from './removeData.vue'
export default {
  components: { editInfo, removeData },
  computed: {
    resultList: function () {
      return this.$store.state.searchResult.length === 0
        ? this.$store.state.sampleData.slice(0, 19)
        : this.$store.state.searchResult
    },
  },
  methods: {
    async updtFlg(item, flgType) {
      let flg, sql
      if (flgType == 'STY') {
        flg = parseInt(item.STY_PRINT_FLG) == 1 ? 0 : 1
        sql = `UPDATE CSNET.CS_SAMPLE_DB SET STY_PRINT_FLG = ${flg} WHERE ID = ${item.ID}`
      } else if ((flgType = 'LOC')) {
        flg = parseInt(item.LOC_PRINT_FLG) == 1 ? 0 : 1
        sql = `UPDATE CSNET.CS_SAMPLE_DB SET LOC_PRINT_FLG = ${flg} WHERE ID = ${item.ID}`
      }

      await axios
        .post('http://lejnet/api-test/csnet/sample_item', {
          sql,
        })
        .then((res) => {
          console.log(res.status)
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
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style socoped>
dl {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
dt {
  width: 30%;
}
dd {
  width: 70%;
}

/* NOTE */
.note {
  padding: 10px;
  width: 100%;
  height: 250px;
  border: 1px solid #333;
  border-radius: 2px;
}
</style>
