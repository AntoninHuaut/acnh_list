<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/aclogo.png')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Bienvenue sur ACNH List</h1>

        <p class="subheading font-weight-regular">Les informations sont pour l'hémisphère nord</p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Choisissez la liste à consulter</h2>

        <v-row justify="center">
          <router-link
            v-for="(next, i) in list"
            :key="i"
            :to="next.href"
            class="subheading mx-3"
          >{{ next.text }}</router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SelectList",

  data: () => ({
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
    ]
  })
};
</script>
