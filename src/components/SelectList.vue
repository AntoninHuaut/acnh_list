<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/aclogo.png')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Bienvenue sur un guide pour ACNH</h1>

        <p class="subheading font-weight-regular">Les informations sont pour l'hémisphère nord</p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h1 class="headline font-weight-bold mb-3">Choisissez la liste à consulter</h1>

        <v-row justify="center">
          <router-link v-for="(next, i) in list" :key="i" :to="next.href" class="subheading mx-3">
            <v-img
              :alt="next.text"
              :src="require(`../assets/menus/${next.img}`)"
              class="my-3"
              contain
              height="200"
            />
          </router-link>
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
        img: "cat_bugs.png",
        href: "/bugs"
      },
      {
        text: "Poissons",
        img: "cat_fish.png",
        href: "/fish"
      },
      {
        text: "Fossiles",
        img: "cat_fossils.png",
        href: "/fossils"
      }
    ]
  })
};
</script>
