<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title
        ><NuxtLink to="/" tag="div" style="cursor: pointer">
          CS-Net Sample Administration</NuxtLink
        ></v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>
