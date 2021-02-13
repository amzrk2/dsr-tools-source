<template>
  <v-container fluid class="drawer-logo">
    <v-avatar class="my-10" height="7.5rem" width="7.5rem">
      <img :src="CDN('/dsr-tools/home/dsrca_head.webp')" />
    </v-avatar>
  </v-container>
</template>

<script>
import CDN from '@/utils/cdn';

export default {
  name: 'NavLogo',
  methods: {
    CDN,
  },
};
</script>

<style lang="scss" scoped>
.drawer-logo {
  text-align: center;
  background-color: $color-primary;
}
</style>
