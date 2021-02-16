<template>
  <div class="fill-height">
    <div class="image-wrapper">
      <v-img :src="$api.resolve(`/dsr-tools/sdv/stardew.webp`)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SDV',
  mounted() {
    this.$message({ type: 'error', text: '模块尚未完工', duration: 10000 });
  },
};
</script>

<style lang="scss" scoped>
</style>
