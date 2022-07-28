<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        class="mt-6 mx-4"
        dark
        small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small left dark>mdi-trash-can </v-icon>
        REMOVE</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">本当に削除してよろしいですか？</span>
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-4" @click="dialog = false">
          キャンセル
        </v-btn>
        <v-btn color="red darken-1" dark @click="removeData()">
          削除する
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
    }
  },
  methods: {
    async removeData() {
      const id = this.id
      const sql = `DELETE FROM CSNET.CS_SAMPLE_DB WHERE ID = ${id}`
      await axios
        .post('http://lejnet/api-test/csnet/sample_item', { sql })
        .then((res) => {
          console.log(res.status)
          window.location.reload()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>

<style></style>
