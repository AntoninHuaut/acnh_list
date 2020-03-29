<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Animal Crossing New Horizons Logo"
            class="shrink mr-2"
            contain
            src="https://univers-crossing.com/assets/image/jeu/animal-crossing-new-horizons/new-horizons-logo.png"
            transition="scale-transition"
            width="82"
          />
        </router-link>

        <v-toolbar-title class="itemAppbar" style="cursor: pointer" @click="$router.push('/')">Accueil</v-toolbar-title>
        <v-toolbar-title class="itemAppbar" style="cursor: pointer" @click="$router.push('/bugs')">Insectes</v-toolbar-title>
        <v-toolbar-title class="itemAppbar" style="cursor: pointer" @click="$router.push('/fish')">Poissons</v-toolbar-title>
        <v-toolbar-title class="itemAppbar" style="cursor: pointer" @click="$router.push('/fossils')">Fossiles</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.itemAppbar {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
