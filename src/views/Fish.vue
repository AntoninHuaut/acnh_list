<template>
  <div class="fish">
    <ListBF name="Poissons" type="fish" />
  </div>
</template>

<script>
// @ is an alias to /src
import ListBF from "@/components/ListBF.vue";

export default {
  components: {
    ListBF
  }
};
</script>
