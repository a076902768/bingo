<template>
  <div class="app">
    <div class="title">BINGO!</div>
    <div class="container">
      <div
        v-for="(box, index) in boxList"
        :key="index"
        class="box"
        :class="{ circle: box.isCircle }"
        @click="chooseBox(box.value)"
      >
        {{ box.id - 1 }}
      </div>
    </div>
  </div>
</template>
<script>
// import { db } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      boxCount: 25,
      boxList: [],
      // 定義勝利規則
      row: {
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
      },
      col: {
        col1: [],
        col2: [],
        col3: [],
        col4: [],
        col5: [],
      },
      slash: {
        slash1: [],
        slash2: [],
      },
      lineCount: 0,
    }
  },
  mounted() {
    // const ref = db.collection('test').doc('test')
    // ref.get().then((doc) => {
    //   console.log(doc.data())
    // })
    const vm = this
    vm.boxinit()
  },
  methods: {
    // 取得隨機亂數
    getRandom() {
      return Math.floor(Math.random() * 25) + 1
    },
    // 初始化每個格子的數字
    boxinit() {
      const vm = this
      const randomBox = []
      let random = 0
      let count = 1
      let obj = {}
      while (vm.boxList.length < 25) {
        random = vm.getRandom()
        if (!randomBox.find((item) => item === random)) {
          obj = {
            id: count,
            value: random,
            isCircle: false,
            // isRow: false,
            // isCol: false,
            isSlash: false,
          }

          // for (const prop in vm.row) {
          //   if (vm.row[prop].find((item) => item === count)) {
          //     obj.isRow = true
          //     break
          //   }
          // }
          // for (const prop in vm.col) {
          //   if (vm.col[prop].find((item) => item === count)) {
          //     obj.isCol = true
          //     break
          //   }
          // }
          for (const prop in vm.slash) {
            if (vm.slash[prop].find((item) => item === count)) {
              obj.isSlash = true
              break
            }
          }
          vm.boxList.push(obj)
          randomBox.push(random)
          console.log('id : ' + count, 'value' + random)
          count++
        }
      }
    },
    // 檢查是否產生連線
    checkBingo() {
      const vm = this
      vm.lineCount = 0
      vm.row.row1 = [
        vm.boxList[0].isCircle,
        vm.boxList[1].isCircle,
        vm.boxList[2].isCircle,
        vm.boxList[3].isCircle,
        vm.boxList[4].isCircle,
      ]
      vm.row.row2 = [
        vm.boxList[5].isCircle,
        vm.boxList[6].isCircle,
        vm.boxList[7].isCircle,
        vm.boxList[8].isCircle,
        vm.boxList[9].isCircle,
      ]
      vm.row.row3 = [
        vm.boxList[10].isCircle,
        vm.boxList[11].isCircle,
        vm.boxList[12].isCircle,
        vm.boxList[13].isCircle,
        vm.boxList[14].isCircle,
      ]
      vm.row.row4 = [
        vm.boxList[15].isCircle,
        vm.boxList[16].isCircle,
        vm.boxList[17].isCircle,
        vm.boxList[18].isCircle,
        vm.boxList[19].isCircle,
      ]
      vm.row.row5 = [
        vm.boxList[20].isCircle,
        vm.boxList[21].isCircle,
        vm.boxList[22].isCircle,
        vm.boxList[23].isCircle,
        vm.boxList[24].isCircle,
      ]

      vm.col.col1 = [
        vm.boxList[0].isCircle,
        vm.boxList[5].isCircle,
        vm.boxList[10].isCircle,
        vm.boxList[15].isCircle,
        vm.boxList[20].isCircle,
      ]
      vm.col.col2 = [
        vm.boxList[1].isCircle,
        vm.boxList[6].isCircle,
        vm.boxList[11].isCircle,
        vm.boxList[16].isCircle,
        vm.boxList[21].isCircle,
      ]
      vm.col.col3 = [
        vm.boxList[2].isCircle,
        vm.boxList[7].isCircle,
        vm.boxList[12].isCircle,
        vm.boxList[17].isCircle,
        vm.boxList[22].isCircle,
      ]
      vm.col.col4 = [
        vm.boxList[3].isCircle,
        vm.boxList[8].isCircle,
        vm.boxList[13].isCircle,
        vm.boxList[18].isCircle,
        vm.boxList[23].isCircle,
      ]
      vm.col.col5 = [
        vm.boxList[4].isCircle,
        vm.boxList[9].isCircle,
        vm.boxList[14].isCircle,
        vm.boxList[19].isCircle,
        vm.boxList[24].isCircle,
      ]

      vm.slash.slash1 = [
        vm.boxList[0].isCircle,
        vm.boxList[6].isCircle,
        vm.boxList[12].isCircle,
        vm.boxList[18].isCircle,
        vm.boxList[24].isCircle,
      ]
      vm.slash.slash2 = [
        vm.boxList[4].isCircle,
        vm.boxList[8].isCircle,
        vm.boxList[12].isCircle,
        vm.boxList[16].isCircle,
        vm.boxList[20].isCircle,
      ]
      for (const prop in vm.row) {
        const bingo = vm.row[prop].every((item) => item === true)
        if (bingo) {
          vm.lineCount++
          console.log('達成' + vm.lineCount + '條線')
        }
      }

      for (const prop in vm.col) {
        const bingo = vm.col[prop].every((item) => item === true)
        if (bingo) {
          vm.lineCount++
          console.log('達成' + vm.lineCount + '條線')
        }
      }

      for (const prop in vm.slash) {
        const bingo = vm.slash[prop].every((item) => item === true)
        if (bingo) {
          vm.lineCount++
          console.log('達成' + vm.lineCount + '條線')
        }
      }
    },
    // 檢查是否獲勝
    checkWin() {
      const vm = this
      if (vm.lineCount >= 3) {
        console.log('win')
      }
    },
    // 點選格子
    chooseBox(value) {
      const vm = this
      vm.boxList.some((item) => {
        if (item.value === value) {
          item.isCircle = true
          return true
        }
      })

      vm.checkBingo()
      vm.checkWin()
    },
  },
}
</script>
