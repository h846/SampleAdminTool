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
              <!--
              <v-textarea
                label="NOTE"
                class="ma-2"
                outlined
                :value="i.NOTE"
                prepend-inner-icon="mdi-comment"
              ></v-textarea>
              -->
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
                <edit-info :list="editList(i.ID)" />
                <!-- Remove Dialog -->
                <remove-data :list="editList(i.ID)" />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import editInfo from './editInfo.vue'
import RemoveData from './removeData.vue'
export default {
  components: { editInfo, RemoveData },
  computed: {
    resultList() {
      let sResult = [...this.$store.state.searchResult]
      let list = [...this.$store.state.sampleData]

      list.sort(function (a, b) {
        if (a.ID > b.ID) return -1
        if (a.ID < b.ID) return 1
        return 0
      })

      list = list.slice(0, 9)
      console.log(list)
      return sResult.length === 0 ? list : sResult
    },
  },
  methods: {
    editList(id) {
      return this.resultList.find((val) => {
        return val.ID == id
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
