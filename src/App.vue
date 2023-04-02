<template>
  <sidenav :custom_class="this.$store.state.mcolor" :class="[
    this.$store.state.isTransparent,
    'fixed-start',
  ]" v-if="this.$store.state.showSidenav" @changesort="ref_changesort" />

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <navbar :class="[navClasses]" :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize" v-if="this.$store.state.showNavbar" />

    <router-view v-slot="{ Component }">
      <component ref="view" :is="Component" />
    </router-view>

    <app-footer v-show="this.$store.state.showFooter" />
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
    ref_changesort(sort) {
      this.$refs.view.changesort(sort);
    }
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
<!-- @font-face {
  font-family: "Pixel";
  src: local("Pixel"),
    url(@/assets/K8x12.ttf) format("truetype");
} -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");

#app,
.el-button,
p,
.card .card-body,
a,
input,
textarea {
  font-family: "Noto Sans TC", sans-serif !important;
  font-weight: bold !important;
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

.logoicon {
  width: 38%;
}

.footer_logoicon {
  width: 10%;

}

.userimg {
  background-color: antiquewhite;
  width: 100%;
}

.ql-mention-list-container {
  max-height: 20vh;
}

@media (min-width: 1200px) {}

@media (max-width: 1200px) {
  .sidenav {
    z-index: 9999;
  }
}

textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {
  border-color: rgba(126, 239, 104, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: rgb(219, 219, 219);
}
</style>