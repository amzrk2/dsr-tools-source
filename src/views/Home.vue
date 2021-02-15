<template>
  <div class="home">
    <v-container class="home-bg fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col offset="1" offset-md="2">
          <h1 class="text-title text-h3 text-md-h2 text-no-wrap mb-4 ml-1">{{ title }}</h1>
          <template v-for="link of titleLinks">
            <v-btn class="text-btn ma-2" large :href="link.src" target="_blank" :key="link.src">
              {{ link.name }}
            </v-btn>
          </template>
        </v-col>
      </v-row>
      <div class="license">{{ license }}</div>
    </v-container>
  </div>
</template>

<script>
import CDN from '@/utils/cdn';
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      title: '',
      titleLinks: [],
      license: '',
    };
  },
  methods: {
    CDN,
  },
  async mounted() {
    try {
      const response = await axios.get(CDN('/dsr-tools/home/index.json'));
      const res = response.data;
      if (res.title) {
        this.title = res.title;
        this.titleLinks = res.links;
        this.license = res.license;
      }
    } catch (e) {
      console.error('[dsr-tools]', e);
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.home-bg {
  background-image: url('https://cdn.jsdelivr.net/gh/dsrkafuu/dsr-api@1.1/dsr-tools/home/cover-row.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 768px) {
    background-image: url('https://cdn.jsdelivr.net/gh/dsrkafuu/dsr-api@1.1/dsr-tools/home/cover-col.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.text-title {
  color: rgba(255, 255, 255, 0.6) !important;
  font-weight: 400 !important;
}

.text-btn {
  color: rgba(0, 0, 0, 0.5) !important;
  background-color: rgba(245, 245, 245, 0.6) !important;
}

.license {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3.125rem;
  padding: 0.3rem 0.5rem;
}
</style>
