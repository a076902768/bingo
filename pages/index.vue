<template>
  <div class="container"></div>
</template>

<script>
export default {
  data() {
    return {
      nowUser: 'A',
    }
  },
  mounted() {
    const vm = this
    if (vm.nowUser === 'A') {
      vm.$router.push('/playerA')
    }
  },
  methods: {},
}
</script>

<style></style>
