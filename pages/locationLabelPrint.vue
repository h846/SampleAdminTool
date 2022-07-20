<template>
  <div class="sheets">
    <div class="sheet">
      <v-row no-gutters>
        <v-col cols="4" v-for="(item, idx) in printList" :key="idx">
          <div class="cell">
            <div class="location">{{ item.LOCATION }}</div>
            <div>
              <span v-if="item.STY_NUM !== ''">{{ item.STY_NUM }} /</span>
              <span v-if="item.STY_NAME_JP !== ''"
                >{{ item.STY_NAME_JP }} /</span
              >
              <span v-if="item.CLR_DSC_JP !== ''">{{ item.CLR_DSC_JP }}</span>
            </div>
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
      return this.$store.state.sampleData.filter((val) => {
        return val.LOC_PRINT_FLG === 1
      })
    },
  },
  mounted() {
    // console.log(this.printList)
    window.print()
  },
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap');

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
