<template>
<div class="sheets">
  <v-row>
    <v-col cols="6" v-for='(item, idx) in printList' :key='idx'>
  <div class="sheet" >
  <div>
    <span>商品番号: </span><span>{{item.STY_NUM}}</span>
  </div>
  <div>
    <span>商品名: </span><span>{{item.STY_NAME_JP}}</span>
  </div>
  <div>
    <span>カラー: </span><span>{{item.CLR_DSC_JP}}</span>
  </div>
  <div>
    <span>サイズ: </span><span>{{item.SIZ}}</span>
  </div>
  </div>
  </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  layout:'empty',
  computed:{
    printList: function(){
      return this.$store.state.sampleData.filter(val=>{
        return val.STY_PRINT_FLG === 1;
      })
    }
  },
  mounted(){
    console.log(this.printList)
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap');
.sheet {
  page-break-after: always;
}

/* hide in print */
@media print {
  .sheets > :not(.sheet) {
    display: none;
  }
  .sheet {
    display: block;
    padding-top: 6mm;
    padding-left: 6mm;
    font-family: 'Sawarabi Mincho', serif;
    font-size: 20px;
  }
}

/* for preview */
/*
@media screen {
  .sheet {
    display: none;
  }
}
*/
</style>
<style lang="scss">
/* for preview */
@media screen {
  BODY {
    background: #eee;
  }
}