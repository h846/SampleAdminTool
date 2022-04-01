<template>
  <v-row>
    <v-col cols="12" v-for="(i, idx) in resultList" :key="idx">
      <v-card class="mt-10 mx-auto" tile outlined min-width="700">
        <v-row>
          <v-col cols="7">
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
          <v-col cols="5">
            <v-textarea
              label="NOTE"
              class="ma-2"
              outlined
              prepend-inner-icon="mdi-comment"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    resultList() {
      return this.$store.state.searchResult
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
</style>
