<template>
  <div class="container"></div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      nowUser: 'A',
      user: undefined,
    }
  },
  mounted() {
    // const vm = this
    // vm.getUserType()
  },
  methods: {
    // 判斷進入的user類型 userA userB 或是 userC(進入聊天室)
    getUserType() {
      const vm = this
      const ref = db.collection('bingo').doc('userData')
      ref.get().then((doc) => {
        console.log(doc.data())
        if (
          (doc.data().userA === false && doc.data().userA === false) ||
          (doc.data().userA === false && doc.data().userB === true)
        ) {
          calc('A')
        } else if (doc.data().userA === true && doc.data().userB === false) {
          calc('B')
        } else {
          vm.user = 'userC'
          console.log('目前已客滿，請進入聊天室等待...')
        }
      })

      function calc(type) {
        vm.user = `user${type}`
        vm.$router.push(`/player${type}`)
        ref
          .update({
            [`user${type}`]: true,
          })
          .then(() => {
            console.log(vm.user)
            console.log(`user${type}已變更為true`)
          })
      }
    },
  },
}
</script>

<style></style>
