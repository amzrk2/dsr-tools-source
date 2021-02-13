<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <Logo />
      <Navigation :routes="routes" :drawer="drawer" />
    </v-navigation-drawer>

    <v-app-bar app dense dark color="primary">
      <v-app-bar-nav-icon @click.stop="switchDrawerActive"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.meta.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ clock }}</span>
    </v-app-bar>

    <v-main>
      <div class="content">
        <router-view></router-view>
      </div>

      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import routes from '@/router/routes';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Logo,
    Navigation,
    Footer,
  },
  data() {
    return {
      routes,
      drawer: null,
      clock: '',
    };
  },
  methods: {
    switchDrawerActive() {
      this.drawer = !this.drawer;
    },
    updateClock() {
      let date = new Date();
      let h = `${date.getHours()}`.padStart(2, '0');
      let m = `${date.getMinutes()}`.padStart(2, '0');
      let s = `${date.getSeconds()}`.padStart(2, '0');
      this.clock = `${h}:${m}:${s}`;
    },
  },
  mounted() {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 50px;
  height: 100%;
  min-height: 100%;
}
</style>
