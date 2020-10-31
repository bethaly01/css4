<template>
  <div>
    <b-container >
      <div class="EditDiv">
        <h3 class="EditTitle"> You watch another show ?? You have to add it to the list !! </h3>
        <br>
      </div>
      <div class="EditDiv2" v-if="show">
        <h4 class="EditTitle2" >Your show has been added. Go home or add another show</h4>
      </div>
      <b-row>
        <b-col class="EditCol02">
          
          <b-form @submit.prevent="upload" @reset="onReset" class="form">
            <b-form-group >
              <label>Title: </label>
              <b-form-input v-model="form.title" required placeholder="Enter Title" ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label>Image:</label>
              <b-form-input v-model="form.urlImage" required placeholder="Enter a valid url for picture" ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label>Description: </label>
              <b-form-input v-model="form.description" required placeholder="Enter a description" ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label>Trailer:</label>
              <b-form-input v-model="form.urlTrailer" required placeholder="Enter a youtube url for trailer" ></b-form-input>
            </b-form-group>
             <b-form-group>
               <label>Category</label>
               <b-form-select v-model="form.category" :options="category" required></b-form-select>
            </b-form-group>
            <b-row>
              <b-col>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-col>
              <b-col>
                <b-button type="reset" variant="danger">Reset</b-button>    
              </b-col>
            </b-row>
            
          </b-form>
        </b-col>
        
        <b-col>
          <div>
            <div>
              <h2  style="color:white">Card Preview </h2>
              </div>
              <b-card 
                    :header="form.category"
                    :title="form.title"
                    :img-src="form.urlImage"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 "
                >
                <div>
                    <b-button  class="deleteButton"  variant="danger">X</b-button>
                </div>
                <b-card-text>
                {{form.description}}
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
  name: 'New',
   data() {
      return {
        form: {
          title: "Title",
          urlImage:"https://live.staticflickr.com/7564/16139596337_750b216bfe.jpg",
          description:"",
          urlTrailer:"",
          category:null  
        },
        category: [{ text: 'Select A Category', value: null }, 'Anime', 'Cartoon', 'Serie', 'Movie'],      
        show: false
      }
    },
    methods: {
   
    async upload() {
      try {
        console.log(this.form)
         await axios.post('/api/items', {
           
          title: this.form.title,
          urlImage:this.form.urlImage,
          description:this.form.description,
          urlTrailer : this.form.urlTrailer,
          category:this.form.category
        });
        this.show = true;
        this.onReset(event)
      } catch (error) {
        console.log(error);
      }
    },onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.title = ''
        this.form.urlImage = ''
        this.form.description = ''
        this.form.urlTrailer=''
        this.form.category= null
        // Trick to reset/clear native browser form validation state
        
      }
  }
}
</script>

<style>
    .deleteButton{
        position: absolute;
        bottom: 87%;
        right: 2%;
        border: 2px solid #141d10;    
    }
    a{
        color:beige;
    }
    .buttonCard{
      width: 100px;
    }   
    .mb-2{
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
    }
    .form{
      width: 75%;
      margin: 0 auto; /* Added */
      float: none; /* Added */
      margin-bottom: 10px; /* Added */
    }
    .EditCol02{
      padding-top: 7%;
    }
</style>