<template>
  <div class="sheets">
    <div class="sheet" v-for="(item, idx) in printList" :key="idx">
      <v-row no-gutters>
        <v-col cols="4" v-for="(i, idx) in item" :key="idx">
          <div class="cell">
            <template v-if="i !== ''">
              <div class="location">{{ i.LOCATION }}</div>
              <div>
                <span v-if="i.STY_NUM !== ''">{{ i.STY_NUM }} /</span>
                <span v-if="i.STY_NAME_JP !== ''">{{ i.STY_NAME_JP }} /</span>
                <span v-if="i.CLR_DSC_JP !== ''">{{ i.CLR_DSC_JP }}</span>
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
      let list = this.$store.state.sampleData.filter((val) => {
        return val.LOC_PRINT_FLG === 1
      })

      // Get print start position
      let startPos = this.$store.getters.getPrintStartPosition
      // Enter blank data to shift the print start position
      for (let i = 0; i < startPos; i++) {
        list.unshift('')
      }
      // Separate data by 10 cases.
      let ary = []
      for (let i = 0; i < list.length; i += 21) {
        ary.push(list.slice(i, i + 21))
      }
      return ary
    },
  },
  mounted() {
    // console.log(this.printList)
    window.print()
  },
}
</script>
<style lang="scss" scoped>
.sheet {
  page-break-after: always;
  font-family: 'Kiwi Maru', serif;
  .location {
    font-size: 50px;
    text-align: center;
  }
}

@page {
  size: A4;
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

    .cell {
      padding: 5mm 5mm;
      width: 69.67mm;
      height: 42mm;
      font-size: 10px;
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
