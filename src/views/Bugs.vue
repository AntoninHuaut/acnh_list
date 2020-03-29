<template>
  <div class="bugs">
    <ListBF name="Insectes" type="bugs" />
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