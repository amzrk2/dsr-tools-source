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
  async mounted() {
    const response = await this.$api.get('/dsr-tools/minecraft/a.json');
  },
};
</script>

<style lang="scss" scoped>
</style>
