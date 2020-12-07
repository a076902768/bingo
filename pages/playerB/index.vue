<template>
  <div class="app">
    <div class="title">BINGO!</div>
    <div class="container">
      <div
        v-for="(box, index) in boxList"
        :key="index"
        class="box"
        :class="{ circle: box.isCircle, blue: box.isBingo }"
        @click="chooseBox(box.value)"
      >
        {{ box.value }}
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase.js'
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
    const ref = db.collection('bingo').doc('userData')
    ref.get().then((doc) => {
      console.log(doc.data())
    })
    const vm = this
    vm.boxinit()
    window.addEventListener('beforeunload', (e) => vm.closeEvent(e))
  },
  destroyed() {
    const vm = this
    window.removeEventListener('beforeunload', (e) => vm.closeEvent(e))
  },
  methods: {
    // 當頁面關閉時執行
    closeEvent() {
      const ref = db.collection('bingo').doc('userData')
      ref
        .update({
          userB: false,
        })
        .then(() => {
          alert('userB已變更為false')
        })
    },
    // 取得隨機亂數
    getRandom() {
      return Math.floor(Math.random() * 25) + 1
    },
    // 將BOX放入每條線中(rows、cols還有slashs)
    putBox() {
      const vm = this
      vm.row.row1 = [
        vm.boxList[0],
        vm.boxList[1],
        vm.boxList[2],
        vm.boxList[3],
        vm.boxList[4],
      ]
      vm.row.row2 = [
        vm.boxList[5],
        vm.boxList[6],
        vm.boxList[7],
        vm.boxList[8],
        vm.boxList[9],
      ]
      vm.row.row3 = [
        vm.boxList[10],
        vm.boxList[11],
        vm.boxList[12],
        vm.boxList[13],
        vm.boxList[14],
      ]
      vm.row.row4 = [
        vm.boxList[15],
        vm.boxList[16],
        vm.boxList[17],
        vm.boxList[18],
        vm.boxList[19],
      ]
      vm.row.row5 = [
        vm.boxList[20],
        vm.boxList[21],
        vm.boxList[22],
        vm.boxList[23],
        vm.boxList[24],
      ]

      vm.col.col1 = [
        vm.boxList[0],
        vm.boxList[5],
        vm.boxList[10],
        vm.boxList[15],
        vm.boxList[20],
      ]
      vm.col.col2 = [
        vm.boxList[1],
        vm.boxList[6],
        vm.boxList[11],
        vm.boxList[16],
        vm.boxList[21],
      ]
      vm.col.col3 = [
        vm.boxList[2],
        vm.boxList[7],
        vm.boxList[12],
        vm.boxList[17],
        vm.boxList[22],
      ]
      vm.col.col4 = [
        vm.boxList[3],
        vm.boxList[8],
        vm.boxList[13],
        vm.boxList[18],
        vm.boxList[23],
      ]
      vm.col.col5 = [
        vm.boxList[4],
        vm.boxList[9],
        vm.boxList[14],
        vm.boxList[19],
        vm.boxList[24],
      ]

      vm.slash.slash1 = [
        vm.boxList[0],
        vm.boxList[6],
        vm.boxList[12],
        vm.boxList[18],
        vm.boxList[24],
      ]
      vm.slash.slash2 = [
        vm.boxList[4],
        vm.boxList[8],
        vm.boxList[12],
        vm.boxList[16],
        vm.boxList[20],
      ]
    },
    // 初始化
    boxinit() {
      const vm = this
      const randomBox = []
      let random = 0
      let count = 1
      let obj = {}
      vm.boxList = []
      while (vm.boxList.length < 25) {
        random = vm.getRandom()
        if (!randomBox.find((item) => item === random)) {
          obj = {
            id: count,
            value: random,
            isCircle: false,
            isSlash: false,
            isBingo: false,
          }
          for (const prop in vm.slash) {
            if (vm.slash[prop].find((item) => item === count)) {
              obj.isSlash = true
              break
            }
          }
          vm.boxList.push(obj)
          randomBox.push(random)
          // console.log('id : ' + count, 'value' + random)
          count++
        }
      }
      vm.putBox()
    },
    // 檢查是否產生連線 連線成功後的box渲染
    checkBingo() {
      const vm = this
      let count = 0
      for (const prop in vm.row) {
        bingoEvent(prop, 'row')
      }

      for (const prop in vm.col) {
        bingoEvent(prop, 'col')
      }

      for (const prop in vm.slash) {
        bingoEvent(prop, 'slash')
      }

      function bingoEvent(prop, type) {
        const bingo = vm[type][prop].every((item) => item.isCircle === true)
        if (bingo) {
          vm[type][prop].forEach((item) => {
            item.isBingo = true
          })
          count++
          console.log('達成' + count + '條線')
        }
      }

      vm.lineCount = count
    },
    // 檢查是否獲勝
    checkWin() {
      const vm = this
      if (vm.lineCount >= 3) {
        console.log('win')
        vm.reset()
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
    // 遊戲重置
    reset() {
      const vm = this
      console.log('reset')
      vm.boxinit()
    },
  },
}
</script>
