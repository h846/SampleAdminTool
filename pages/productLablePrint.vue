<template>
  <div class="sheets">
    <div class="sheet" v-for="(item, idx) in printList" :key="idx">
      <v-row no-gutters>
        <v-col cols="6" v-for="(i, idx) in item" :key="idx">
          <div class="cell">
            <template v-if="i !== ''">
              <div>
                <span>商品番号: </span><span>{{ i.STY_NUM }}</span>
              </div>
              <div>
                <span>{{ i.STY_NAME_JP }} </span>
              </div>
              <div>
                <span>カラー: </span><span>{{ i.CLR_DSC_JP }}</span>
              </div>
              <div>
                <span>サイズ: </span><span>{{ i.SIZ }}</span>
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
    </div>
    <div style="text-align: center; padding-top: 50px">
      <v-btn to="/" nuxt x-large>トップページへ</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  computed: {
    printList: function () {
      // Get data with print flag 1.
      let list = this.$store.state.sampleData.filter((val) => {
        return val.STY_PRINT_FLG === 1
      })
      // Get print start position
      let startPos = this.$store.getters.getPrintStartPosition
      // Enter blank data to shift the print start position
      for (let i = 0; i < startPos; i++) {
        list.unshift('')
      }
      // Separate data by 10 cases.
      let ary = []
      for (let i = 0; i < list.length; i += 10) {
        ary.push(list.slice(i, i + 10))
      }
      return ary
    },
  },
  mounted() {
    // console.log(this.printList, this.$store.getters.getPrintStartPosition)
    window.print()
  },
}
</script>
<style lang="scss" scoped>
.sheet {
  page-break-after: always;
  font-family: 'Kiwi Maru', serif;
  font-size: 15px;
}

@page {
  size: A4; // portrait;
  margin: 0;
}

/* hide in print */
@media print {
  .sheets > :not(.sheet) {
    display: none;
  }
  .sheet {
    // border: 1px solid #000;
    width: 210mm;
    height: 297mm;
    display: block;
    padding: 21.2mm 18.6mm;

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
