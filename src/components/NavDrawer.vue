
<template>
  <aside class="nav-drawer">
    <div class="title-area flex flex-row align-center justify-space-between">
      <h4 class="logo-title">Menu</h4>
      <a
        href="#"
        @click.prevent="$store.state.navDrawerOpen = !$store.state.navDrawerOpen"
        class="close-icon icon-lg"
      >
        <i class="uil uil-arrow-right"></i>
      </a>
    </div>
    <div class="list">
      <nav class="flex flex-column">
        <router-link
          v-for="route in $router.options.routes"
          :key="route.name"
          :to="route.path"
          class="mt-lg nav-item"
        >
          <div @click="$store.state.navDrawerOpen = !$store.state.navDrawerOpen">{{route.name}}</div>
        </router-link>
      </nav>
      <a
        class="button button-cta button-pill mt-lg"
        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
        target="_blank"
      >
        Learn About Covid-19
        <i class="uil uil-external-link-alt"></i>
      </a>
    </div>
  </aside>
</template>

<script>
export default {
  name: "NavDrawer"
};
</script>