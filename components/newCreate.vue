<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" small width="90" dark v-bind="attrs" v-on="on"
        >Create New
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">新規登録</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="sku"
                label="SKU NUMBER"
                outlined
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="location"
                outlined
                label="LOCATION"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                outlined
                full-width
                hide-details
                label="DESCRIPTION"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="sencondry" text @click="close()"> CLOSE </v-btn>
        <v-btn color="primary" text @click="creating()"> CREATE </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { dialog: false, sku: null, location: null, description: null }
  },
  methods: {
    async creating() {
      console.log(this.sku, this.location)
      if (!this.sku || !this.location) {
        alert('SKUもしくはLocationを入力してください。')
        return
      }
      let sql = `INSERT INTO CSNET.CS_SAMPLE_DB(SKU_NUM, LOCATION, NOTE, ENT_DT) VALUES ('${
        this.sku
      }','${this.location}','${this.description}','${this.$dayjs().format(
        'YYYY/MM/DD'
      )}')`

      await axios
        .post('http://lejnet/api-test/csnet/sample_item', { sql })
        .then((res) => {
          this.dialog = false
        })
    },
    close() {
      this.dialog = false
      this.sku = this.location = this.description = null
    },
  },
}
</script>

<style></style>
