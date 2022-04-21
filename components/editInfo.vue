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
        <v-textarea outlined label="NOTE" dense hide-details></v-textarea>
        <v-text-field
          class="mt-3"
          outlined
          label="LOCATION"
          dense
          hide-details
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondry" text @click="dialog = false">
          キャンセル
        </v-btn>
        <v-btn color="green darken-1" text @click="dialog = false">
          更新する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style></style>
