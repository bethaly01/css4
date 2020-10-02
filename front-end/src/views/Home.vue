<template>
  <b-container>
  <div>
      <ShowList :series="series"/>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
import ShowList from "../components/ShowsList.vue"
export default {
  name: 'Home',
   data() {
    return {
     items: [],
    }
  },
  components:{
    ShowList
  },
  computed:{
    series(){
      return this.items
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get('/api/items');
        this.items = response.data;
        console.log(this.items[2].urlTrailer )
        return true;
      } catch (error) {
        console.log(error);

      }
    },
  }
}
</script>


