<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Animal Crossing New Horizons Logo"
          class="shrink mr-2"
          contain
          src="https://univers-crossing.com/assets/image/jeu/animal-crossing-new-horizons/new-horizons-logo.png"
          transition="scale-transition"
          width="82"
        />

        <v-toolbar-title>ACNH List</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
