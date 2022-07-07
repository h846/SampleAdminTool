<template>
  <div class="sheets">
    <div class="sheet">
      <v-row no-gutters>
        <v-col cols="6" v-for="(item, idx) in printList" :key="idx">
          <div class="cell">
            <div>
              <span>商品番号: </span><span>{{ item.STY_NUM }}</span>
            </div>
            <div>
              <span>{{ item.STY_NAME_JP }} </span>
            </div>
            <div>
              <span>カラー: </span><span>{{ item.CLR_DSC_JP }}</span>
            </div>
            <div>
              <span>サイズ: </span><span>{{ item.SIZ }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div style="text-align: center; padding-top: 50px">
      <v-btn to="/" nuxt x-large>印刷済</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  computed: {
    printList: function () {
      return this.$store.state.sampleData.filter((val) => {
        return val.STY_PRINT_FLG === 1
      })
    },
  },
  mounted() {
    console.log(this.printList)
    window.print()
  },
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap');
body {
  width: 100%;
}
.sheet {
  page-break-after: always;
}

/* hide in print */
@media print {
  .sheets > :not(.sheet) {
    display: none;
  }
  .sheet {
    width: 210mm;
    height: 297mm;
    display: block;
    padding: 21.2mm 18.6mm;
    font-family: 'Kiwi Maru', serif;
    font-size: 15px;
    .cell {
      padding: 5mm 3mm;
      width: 86.4mm;
      height: 50.8mm;
      // border: 1px solid #ccc;
      div {
        margin-bottom: 2mm;
      }
    }
  }
}
/* for preview */
@media screen {
  .sheet {
    display: none;
  }
}
</style>
