<template>
  <div>
    <b-container >
      <div>
        <h3> Edit a show</h3>
        <br>
      </div>
      <div v-if="show">
        <h4>You show has been Edit</h4>
      </div>
      <div v-if="showDelete">
        <h4>You show has been Delete</h4>
      </div>
      <b-row v-if="!show || !showDelete">
        <b-col>
          
          <b-form @submit.prevent="editShow(serie)" @reset.prevent="onReset"  @delete.prevent="deleteShow(serie)" class="form">
            <b-form-group label="Title: ">
              <b-form-input v-model="serie.title" required placeholder="Enter Title" ></b-form-input>
            </b-form-group>
            <b-form-group label="Image:">
              <b-form-input v-model="serie.urlImage" required placeholder="Enter a valid url for picture" ></b-form-input>
            </b-form-group>
            <b-form-group label="Description: ">
              <b-form-input v-model="serie.description" required placeholder="Enter a description" ></b-form-input>
            </b-form-group>
            <b-form-group label="Trailer:">
              <b-form-input v-model="serie.urlTrailer" required placeholder="Enter a youtube url for trailer" ></b-form-input>
            </b-form-group>
             <b-form-group  label="Category">
               <b-form-select v-model="serie.category" :options="category" required></b-form-select>
            </b-form-group>
            <b-row>
              <b-col>
                <b-button type="submit" variant="sucess">Edit</b-button>
              </b-col>
              <b-col>
                <b-button type="reset" variant="primary">Reset</b-button>    
              </b-col>
              <b-col>
                <b-button type="delete" variant="danger">Delete</b-button>    
              </b-col>
            </b-row>
            
          </b-form>
        </b-col>
        
        <b-col>
          <div>
            <div>
              <h2>Card Preview </h2>
            </div>
                <b-card 
                    :header="serie.category"
                    :title="serie.title"
                    :img-src="serie.urlImage"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 "
                >
                    <div>
                        <b-button  class="deleteButton"  variant="danger">X</b-button>
                    </div>
                    <b-card-text>
                        {{serie.description}}
                    </b-card-text>
                    <b-row>
                    <b-col>
                        <b-button class="buttonCard" variant="primary">Edit</b-button>
                    </b-col>
                    <b-col>
                        <b-button class="buttonCard"  variant="primary">Trailer </b-button>
                    </b-col>
                    </b-row>
                </b-card>
            </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'edit',
    data(){
        return{
            serie:{},
            category: [{ text: 'Select A Category', value: null }, 'Anime', 'Cartoon', 'Serie', 'Movie'],
            show: false ,
            showDelete :false
        }
    },
    created(){
        this.getSerie();
    },
    methods:{
        async getSerie(){
            try{
                console.log( this.$route.params.id)
                let responde = await axios.get('/api/items/' + this.$route.params.id);
                this.serie = responde.data.item;
            }
            catch(error){
                console.log("inside edit delete")
                console.log(error)
            }
        },
        async editShow(show){
            try {
            await axios.put("/api/items/" + show._id, {
            title: this.findItem.title,
            });
            this.show = true;
            this.onReset(event)
        } catch (error) {
        console.log(error);
        }
        },
        async deleteShow(show){
            try {
                await axios.delete("/api/items/" + show._id); 
                this.show = true;
                this.onReset(event);        
            } 
            catch (error) {
                console.log(error);
            }
        },
        onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.serie.title = ''
        this.serie.urlImage = ''
        this.serie.description = ''
        this.serie.urlTrailer=''
        this.serie.category= null
        // Trick to reset/clear native browser form validation state
        
      }

    }
}
</script>

<style>
.info{
    color:aqua;
}
</style>