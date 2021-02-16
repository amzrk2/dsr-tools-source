<template>
  <v-container fluid class="drawer-logo">
    <v-avatar class="my-10" height="7.5rem" width="7.5rem">
      <v-img :src="$api.resolve('/dsr-tools/home/dsrca_head.webp')" />
    </v-avatar>
  </v-container>
</template>

<script>
export default {
  name: 'NavLogo',
};
</script>

<style lang="scss" scoped>
.drawer-logo {
  text-align: center;
  background-color: $color-primary;
}
</style>
