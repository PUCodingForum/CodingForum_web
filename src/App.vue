<template>
  <sidenav :custom_class="this.$store.state.mcolor" :class="[
    this.$store.state.isTransparent,
    this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
  ]" v-if="this.$store.state.showSidenav" />

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''">

    <navbar :class="[navClasses]" :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize" v-if="this.$store.state.showNavbar" />

    <router-view />

    <!-- <app-footer v-show="this.$store.state.showFooter" /> -->

    <configurator :toggle="toggleConfigurator" :class="[
      this.$store.state.showConfig ? 'show' : '',
      this.$store.state.hideConfigButton ? 'd-none' : '',
    ]" />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");

#app {
  font-family: "Noto Sans TC", sans-serif;
}

.el-button {
  font-family: "Noto Sans TC", sans-serif;
}

.youtube_img_fix {
  width: 104% !important;
  margin-left: -2%;
}

.container_video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.youtub {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.downborder {
  border-left: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-bottom-left-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
}

.el-main {
  overflow: inherit !important;
}

.placeholder {
  cursor: alias !important;
}
</style>