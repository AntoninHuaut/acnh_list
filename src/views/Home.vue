<template>
  <div class="home">
    <SelectList/>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectList from "@/components/SelectList.vue";

export default {
  name: "Home",
  components: {
    SelectList
  }
};
</script>
