<template>
  <b-container>
  <div class="homeDiv">
    <h1 class="homeTitle">Welcome back</h1>
    <div class="homeButton">
      <b-button block variant="outline-light" href="/new">Click here to add a show!</b-button>
    </div>
  </div>
  <br>
  <div class="homeCategorybutton">
    <b-button-group>
      <b-button variant="outline-light" @click="getItems()">All Categories</b-button>
      <b-button variant="outline-light" @click="chooseCategory('Anime')" >Anime</b-button>
      <b-button variant="outline-light" @click="chooseCategory('Cartoon')">Cartoon</b-button>
      <b-button variant="outline-light" @click="chooseCategory('Serie')">Serie</b-button>
      <b-button variant="outline-light" @click="chooseCategory('Movie')">Movie</b-button>
    </b-button-group>
</div>
  <b-row align-v="center">
      <ShowList :series="series"/>
  </b-row>
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
        return true;
      } catch (error) {
        console.log(error);

      }
    },
    async chooseCategory(categoryID){
     try {
       let response = await axios.get ('api/items/a/'+ categoryID);
       this.items = response.data;
       return true;
     }
     catch(error){
       console.log(error)
     }
    }
    
  }
}
</script>
<style>
.homeButton{
text-align: center;
  width: 550px ;
  display: inline-flex;
}
.homeTitle{
  font-family: inherit;
    font-size: xxx-large;
    font-weight: bold;
    margin-bottom: 20px;
    padding:12px;
}
.homeDiv{
  background-color: #13a2b8;
  margin-bottom: 55px;
  height: 160px;
}
.homeCategorybutton{
  text-align: left;
  margin-left: 58px;
}
btn-outline-secondary{
  max-width: 130px;

}
</style>



