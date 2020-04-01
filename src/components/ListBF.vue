<template>
  <v-container>
    <v-snackbar color="error" v-model="snackbar">
      Une erreur est survenue pendant la récupération des données
      <v-btn text @click="snackbar = false;">Fermer</v-btn>
    </v-snackbar>

    <v-card class="bench elevation-5">
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
        :items-per-page="15"
        :dense="mainTab.dense"
        :loading="loading"
      >
        <template v-slot:top>
          <v-row class="pl-5">
            <v-col cols="6"></v-col>
            <v-col cols="3">
              <v-switch
                v-model="onlyCurrentMonth"
                @change="updateList"
                label="Disponible durant ce mois"
                class="pa-3"
              ></v-switch>
            </v-col>

            <v-col cols="3">
              <v-switch
                v-model="onlyAvailable"
                @change="updateList"
                label="Disponible actuellement"
                class="pa-3"
              ></v-switch>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.image="{ item }">
          <div class="p-2">
            <v-img :src="item.img" :alt="item.name" width="92px"></v-img>
          </div>
        </template>

        <template v-slot:item.hours="{ item }">
          <v-col class="pb-1 pt-1" v-for="(subFor, index) in getPeriod(item.hours)" :key="index">
            <v-chip :color="getColorHour(subFor)">{{getHour(subFor)}}</v-chip>
          </v-col>
        </template>

        <template v-slot:item.months="{ item }">
          <v-data-table
            class="monthsTable"
            :headers="monthTab.headers"
            :items="format(item.months)"
            :hide-default-footer="monthTab.hideFooter"
            :hide-default-header="monthTab.hideHeader"
          >
            <template v-slot:item.monthA="{ item }">
              <v-chip :color="getColorMonth(item.selectedA)">{{ item.monthA }}</v-chip>
            </template>
            <template v-slot:item.monthB="{ item }">
              <v-chip :color="getColorMonth(item.selectedB)">{{ item.monthB }}</v-chip>
            </template>
            <template v-slot:item.monthC="{ item }">
              <v-chip :color="getColorMonth(item.selectedC)">{{ item.monthC }}</v-chip>
            </template>
            <template v-slot:item.monthD="{ item }">
              <v-chip :color="getColorMonth(item.selectedD)">{{ item.monthD }}</v-chip>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
function isValueInArray(array, i) {
  return array.filter(value => value === i).length > 0;
}

import moment from "moment";

export default {
  name: "ListBF",
  props: {
    name: String,
    type: String
  },
  methods: {
    updateList() {
      if (this.onlyAvailable && !this.onlyCurrentMonth)
        setTimeout(() => (this.onlyCurrentMonth = true), 1);

      const currentHour = moment().hours();
      const currentMonth = moment().month() + 1;

      this.mainTab.dataList = this.mainTab.dataListOrigin.filter(item => {
        if (item.name == "barreleye") console.log(item);

        if (this.onlyAvailable) {
          return (
            isValueInArray(item.hours, currentHour) &&
            isValueInArray(item.months, currentMonth)
          );
        } else if (this.onlyCurrentMonth)
          return isValueInArray(item.months, currentMonth);
        else return true;
      });
    },
    getColorHour(hours) {
      const currentHour = moment().hours();
      const minHour = Math.min.apply(null, hours);
      const maxHour = Math.max.apply(null, hours);

      if (currentHour < minHour || currentHour > maxHour) return "#EF9A9A";
      else if (currentHour == maxHour) return "#FFCC80";
      else return "#A5D6A7";
    },
    getHour(hours) {
      if (hours.length == 24) return "Toute la journée";

      let msg = "";

      let minHour = Math.min.apply(null, hours);
      let maxHour = Math.max.apply(null, hours) + 1;

      if (minHour < 10) minHour = "0" + minHour;
      if (maxHour < 10) maxHour = "0" + maxHour;

      if (msg.length != 0) msg += "\n";
      msg += `${minHour}h00 » ${maxHour}h00`;

      return msg;
    },
    getPeriod(hours) {
      let periodes = [];
      let history = [];

      for (let value of hours) {
        if (history.length > 1) {
          let oldValue = history[history.length - 1];

          if (oldValue != value - 1) {
            periodes.push(history.slice());
            history.splice(0, history.length);
          }
        }

        history.push(value);
      }
      periodes.push(history);

      return periodes;
    },
    getColorMonth(selected) {
      return selected ? "#A5D6A7" : "#EF9A9A";
    },
    format(items) {
      const months = [
        ["Jan.", "Fev.", "Mars", "Avril"],
        ["Mai", "Juin", "Juil.", "Août"],
        ["Sep.", "Oct.", "Nov.", "Déc."]
      ];
      let res = [];

      for (let i = 1; i <= 12; i++) {
        const line = Math.floor((i - 1) / 4);
        const col = (i - 1) % 4;
        const letter = col == 0 ? "A" : col == 1 ? "B" : col == 2 ? "C" : "D";

        if (col == 0) res.push({});

        const val = res[Math.floor((i - 1) / 4)];

        val["month" + letter] = months[line][col];
        val["selected" + letter] = isValueInArray(items, i);
      }

      return res;
    }
  },
  data() {
    let mainTabHeaders = [
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
        align: "center",
        value: "months"
      },
      {
        text: "Heures d'apparition",
        align: "center",
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
    ];

    if (this.type === "fish")
      mainTabHeaders.push({
        text: "Taille",
        value: "shadow",
        sortable: true
      });

    return {
      onlyCurrentMonth: false,
      onlyAvailable: false,
      loading: true,
      snackbar: false,
      monthTab: {
        hideHeader: true,
        hideFooter: true,
        headers: [
          {
            value: "monthA"
          },
          {
            value: "monthB"
          },
          {
            value: "monthC"
          },
          {
            value: "monthD"
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
        headers: mainTabHeaders
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
          item.price = item.price == -1 ? "N/A" : item.price;
          return item;
        });
        this.mainTab.dataListOrigin = this.mainTab.dataList.slice();

        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.snackbar = true;
      });
  }
};
</script>

<style lang="scss">
.monthsTable > div > table > tbody > tr > .text-start {
  border-bottom: none !important;
}
</style>