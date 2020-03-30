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

        <router-link to="/">
          <v-btn text>
            <span class="mr-2">Accueil</span>
          </v-btn>
        </router-link>
        <router-link to="/bugs">
          <v-btn text>
            <span class="mr-2">Insectes</span>
          </v-btn>
        </router-link>
        <router-link to="/fish">
          <v-btn text>
            <span class="mr-2">Poissons</span>
          </v-btn>
        </router-link>
        <router-link to="/fossils">
          <v-btn text>
            <span class="mr-2">Fossiles</span>
          </v-btn>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-badge>{{currentDate}}</v-badge>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      currentDate: ""
    };
  },
  methods: {
    setDate: function() {
      setInterval(() => {
        this.currentDate = moment().format("[Date actuelle :] DD/MM/YYYY HH[h]mm");
      }, 1000);
    }
  },
  mounted() {
    this.setDate();
  }
};
</script>

<style scoped>
.itemAppbar {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
