<template>
  <div>
    <b-container >
      <div class="EditDiv">
        <h3 class="EditTitle" > Edit a show</h3>
        <br>
      </div>
      <div  class="EditDiv2" v-if="show">
        <h4 class="EditTitle2">Your show has been Edit</h4>
      </div>
     
      <b-row v-if="noForm">
        <b-col class="EditCol">
          
          <b-form @submit.prevent="editShow(serie)" @reset.prevent="onReset" class="form">
            <b-form-group>
              <label>Title </label>
            <b-form-input v-model="serie.title" required placeholder="Enter Title" ></b-form-input>
            </b-form-group>
            <b-form-group >
              <label> Image: </label>
              <b-form-input v-model="serie.urlImage" required placeholder="Enter a valid url for picture" ></b-form-input>
            </b-form-group>
            <b-form-group >
              <label> Description: </label>
              <b-form-input v-model="serie.description" required placeholder="Enter a description" ></b-form-input>
            </b-form-group>
            <b-form-group >
              <label>Trailer: </label>
              <b-form-input v-model="serie.urlTrailer" required placeholder="Enter a youtube url for trailer" ></b-form-input>
            </b-form-group>
             <b-form-group>
               <label>Category</label>
               <b-form-select v-model="serie.category" :options="category" required></b-form-select>
            </b-form-group>
            <b-row>
              <b-col>
                <b-button class="button-form" type="submit" variant="success">Submit</b-button>
              </b-col>
              <b-col>
                <b-button class="button-form" type="reset" variant="primary">Reset</b-button>    
              </b-col>
              
            </b-row>
            
          </b-form>
        </b-col>
        
        <b-col>
          <div>
            <div>
              <h2 style="color:white">Card Preview </h2>
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
            showDelete :false,
            noForm:true
        }
    },
    created(){
        this.getSerie();
    },
    methods:{
        async getSerie(){
            try{
                console.log(this.$route.params.id)
                let responde = await axios.get('/api/items/' + this.$route.params.id);
                console.log(responde.data.item)
                this.serie = responde.data.item;
            }
            catch(error){
                console.log(error)
                console.log("es en edit")
            }
        },
        async editShow(show){
            try {
                await axios.put("/api/items/" + show._id, {
                title: show.title,
                urlImage : show.urlImage,
                description: show.description,
                urlTrailer: show.urlTrailer,
                category :show.category
            });
            
        } catch (error) {
          console.log(error);
        }
         this.show = true;
         this.noForm = false;
        this.onReset(event)
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

.button-form{
    width: 90px;
}

.EditTitle{
  font-family: inherit;
  font-size: xx-large;
  font-weight: bold;
  padding:30px;
}
.EditTitle2{
  font-family: inherit;
  font-weight: bold;
  padding:30px;
}
.EditDiv{
  background-color: #13a2b8;
  margin-bottom: 25px;
  height: 110px;
}
.EditDiv2{
  background-color: #cfe9ec;
  margin-bottom: 25px;
  margin: auto;
  width: 50%;
  border-radius: 15px;
}
label{
  width: 130px;
  margin-right:20px;
  float: left;
  font-weight: bold;
  color: white;
  border-radius: 15px;
  background-color: #13a2b8;
}
.form-control{
  display: nones;
  width: 60%;
}
.custom-select{
  display: nones;
  width: 55%;
}
.EditCol{
  padding-top: 10%;
}
</style>