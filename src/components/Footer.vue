<template>
  <v-footer class="footer" absolute color="primary" dark>
    <v-container class="author text-center ma-0 pa-0" fluid>
      <v-icon small>{{ mdiCopyright }}</v-icon>
      <span>2019-{{ new Date().getFullYear() }}</span>
      <a href="https://dsrkafuu.co/" target="_blank">DSRKafuU</a>
    </v-container>
    <v-container class="version text-center ma-0 pa-0" fluid>
      <span>DSRToolS {{ version }}</span>
    </v-container>
  </v-footer>
</template>

<script>
import { mdiCopyright } from '@/utils/mdi';
import { version } from '@/assets/changelog';

export default {
  name: 'Footer',
  data() {
    return {
      version,
      mdiCopyright,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  height: 3.125rem;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  & > * {
    padding: 0 0.1rem;
  }
}

.version {
  font-size: 0.75rem;
}
</style>
