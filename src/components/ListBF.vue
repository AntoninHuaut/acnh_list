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
        <v-text-field
          class="search"
          v-model="mainTab.search"
          label="Recherche"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="mainTab.search"
        multi-sort
        :headers="mainTab.headers"
        :items="mainTab.dataList"
        :items-per-page="-1"
        :dense="mainTab.dense"
        :loading="loading"
      >
        <template v-slot:item.image="{ item }">
          <div class="p-2">
            <v-img :src="item.img" :alt="item.name" width="92px"></v-img>
          </div>
        </template>

        <template v-slot:item.months="{ item }">
          <v-data-table
            :headers="monthTab.headers"
            :items="format(item.months)"
            :hide-default-footer="monthTab.hideFooter"
            :hide-default-header="monthTab.hideHeader"
          ></v-data-table>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
function isSelect(items, i) {
  return i in items;
}

export default {
  name: "ListBF",
  props: {
    name: String,
    type: String
  },
  methods: {
    format(items) {
      const months = [
        ["Janv", "Fev", "Mars", "Avril"],
        ["Mai", "Juin", "Juil", "Août"],
        ["Sept", "Oct", "Nov", "Dec"]
      ];
      let res = [];

      for (let i = 1; i <= 12; i++) {
        if (i % 4 == 1) res.push({});
        let val = res[Math.floor((i - 1) / 4)];

        val["selected" + i] = isSelect(items, i);

        let line;
        let col;

        if ((i - 1) / 4 < 1) line = 0;
        else if ((i - 1) / 4 < 2) line = 1;
        else if ((i - 1) / 4 < 3) line = 2;
        else col = 4;

        if (i % 4 == 1) col = 0;
        else if (i % 4 == 2) col = 1;
        else if (i % 4 == 3) col = 2;
        else if (i % 4 == 0) col = 3;

        val["month" + (col + 1)] = months[line][col];
      }

      return res;
    }
  },
  data() {
    return {
      loading: true,
      snackbar: false,
      monthTab: {
        hideHeader: true,
        hideFooter: true,
        headers: [
          {
            value: "month1",
            divider: true
          },
          {
            value: "month2",
            divider: true
          },
          {
            value: "month3",
            divider: true
          },
          {
            value: "month4",
            divider: true
          }
        ]
      },
      mainTab: {
        dataList: [],
        search: "",
        dense: true,
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
            text: "Image",
            value: "image"
          },
          {
            text: "Nom EN",
            align: "start",
            value: "name",
            sortable: true
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
            value: "location",
            sortable: true
          },
          {
            text: "Prix",
            value: "price",
            sortable: true
          }
        ]
      }
    };
  },
  mounted() {
    fetch(
      `https://raw.githubusercontent.com/Cat333Pokemon/critterpedia/master/db/${this.type}.json`
    )
      .then(res => res.json())
      .then(res => {
        this.mainTab.dataList = res.map(item => {
          item.img = `https://raw.githubusercontent.com/Cat333Pokemon/critterpedia/master/images/${this.type}/${item.name}.png`;
          return item;
        });

        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.snackbar = true;
      });
  }
};
</script>

<style>
  .text-start.v-data-table__divider {
    border: thin solid rgba(0, 0, 0, 0.12);
  }
</style>