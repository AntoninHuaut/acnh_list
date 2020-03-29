<template>
  <v-container>
    <v-snackbar color="error" v-model="snackbar">
      Une erreur est survenue pendant la récupération des données
      <v-btn text @click="snackbar = false;">Fermer</v-btn>
    </v-snackbar>

    <v-card class="bench elevation-5" :loading="loading">
      <v-card-title>
        <h2>Liste des {{ name }}</h2>
        <v-spacer></v-spacer>
        <v-text-field class="search" v-model="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        multi-sort
        :headers="headers"
        :items="dataList"
        :items-per-page="5"
      >
        <template v-slot:item.timestamp="{ item }">
          <span>{{ new Date(item.timestamp).toLocaleDateString() }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ListBF",
  props: {
    name: String,
    type: String
  },
  data() {
    return {
      loading: true,
      search: "",
      dataList: [],
      snackbar: false,
      list: [
        {
          text: "Insectes",
          href: "/bugs"
        },
        {
          text: "Poissons",
          href: "/fish"
        },
        {
          text: "Fossiles",
          href: "/fossils"
        }
      ],
      headers: [
        {
          text: "Nom EN",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "Mois",
          value: "months"
        },
        {
          text: "Heures",
          value: "hours"
        },
        {
          text: "Location",
          value: "location"
        },
        {
          text: "Prix",
          value: "price"
        }
      ]
    };
  },
  mounted() {
    fetch(
      `https://raw.githubusercontent.com/Cat333Pokemon/critterpedia/master/db/${this.type}.json`
    )
      .then(res => res.json())
      .then(res => {
        this.dataList = res;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.snackbar = true;
      });
  }
};
</script>
