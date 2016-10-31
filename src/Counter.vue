<template>
  <div>You have been here for {{ counter }} seconds.</div>
</template>

<script>
export default {
  data () {
    return {
      counter: 0
    }
  },
  mounted () {
    setInterval(() => { this.counter += 1 }, 1000)
  }
}
</script>