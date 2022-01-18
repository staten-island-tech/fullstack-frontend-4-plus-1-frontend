<template>
  <h1>Song: {{ id }}</h1>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.id
    },
  },
}
</script>

<style></style>
