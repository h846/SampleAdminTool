<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small class="mt-6 mx-4" color="primary" v-bind="attrs" v-on="on"
        ><v-icon small left dark>mdi-application-edit </v-icon>
        EDIT
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5"> データ更新 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="note"
              outlined
              label="NOTE"
              dense
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="location"
              class="mt-3"
              outlined
              label="LOCATION"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-switch
              class="ma-0"
              v-model="styPrt"
              label="Style Label"
              :true-value="1"
              :false-value="0"
              hide-details
            ></v-switch>
          </v-col>
          <v-col cols="6">
            <v-switch
              class="ma-0"
              v-model="locPrt"
              label="Loc Label"
              :true-value="1"
              :false-value="0"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondry" text @click="dialog = false">
          キャンセル
        </v-btn>
        <v-btn color="green darken-1" text @click="updateData()">
          更新する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      note: '',
      location: '',
      styPrt: '',
      locPrt: '',
    }
  },

  computed: {
    list: function () {
      return this.$store.getters.getSampleData
        .filter((val) => {
          return val.ID == this.id
        })
        .pop()
    },
  },

  created() {
    // console.log(this.$store.getters.getSampleData)
    this.note = this.list.NOTE
    this.location = this.list.LOCATION
    this.styPrt = this.list.STY_PRINT_FLG
    this.locPrt = this.list.LOC_PRINT_FLG
  },

  watch: {
    list(val) {
      this.note = val.NOTE
      this.location = val.LOCATION
      this.styPrt = val.STY_PRINT_FLG
      this.locPrt = val.LOC_PRINT_FLG
    },
  },

  methods: {
    async updateData() {
      const sql = `UPDATE CSNET.CS_SAMPLE_DB SET NOTE = '${
        this.note
      }', location = '${this.location}', STY_PRINT_FLG = ${
        this.styPrt
      }, LOC_PRINT_FLG = ${this.locPrt}, UPD_DT = '${this.$dayjs().format(
        'YYYY/MM/DD'
      )}' WHERE ID = ${this.id}`
      console.log(sql)
      await axios
        .post('http://lejnet/api-test/csnet/sample_item', {
          sql,
        })
        .then((res) => {
          console.log(res.status)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.dialog = false
          location.reload()
        })
    },
  },
}
</script>

<style></style>
