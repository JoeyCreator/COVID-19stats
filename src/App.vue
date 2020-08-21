<template>
  <div id="app">
    <header class="header flex flex-row align-center justify-space-between">
      <div class="logo">
        <div class="logo-title">COVID-19 Health</div>
      </div>
      <div class="links flex flex-row align-center">
        <nav class="nav flex flex-row align-center">
          <router-link
            v-for="route in $router.options.routes"
            :key="route.name"
            :to="route.path"
            class="mr-lg nav-item"
          >{{route.name}}</router-link>
        </nav>
        <a
          class="button button-cta button-pill"
          href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
          target="_blank"
        >
          Learn About Covid-19
          <i class="uil uil-external-link-alt"></i>
        </a>
      </div>
      <a
        href="#"
        @click.prevent="$store.state.navDrawerOpen = !$store.state.navDrawerOpen"
        class="menu-icon flex flex-row align-center"
      >
        Menu
        <i class="uil uil-bars icon-lg"></i>
      </a>
      <transition name="nav" mode="out-in">
        <nav-drawer :class="{ 'open': $store.state.navDrawerOpen }" v-if="viewportWidth < 900"/>
      </transition>
    </header>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$store.state.loading"></router-view>
    </transition>
    <footer class="footer">
      <div class="text-center">
        <i class="uil uil-github-alt text-cta"></i> Data provided by
        <a href="https://github.com/joeycreator" target="_blank">Joey Cadieux</a>
      </div>
    </footer>
  </div>
</template>

<script>
import NavDrawer from "./components/NavDrawer";

export default {
  name: "App",
  components: {
    NavDrawer
  },
  computed: {
    viewportWidth: function() {
      return window.innerWidth;
    }
  },
  mounted() {
    this.$store.dispatch("getData");
  }
};
</script>
