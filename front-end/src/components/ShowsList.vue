<template>
    <div>
            
           <b-card v-for="serie in series" :key="serie.id" eader-tag="header"
                :header="serie.category"
                :title="serie.title"
                :img-src="serie.urlImage"
                img-top
                tag="article"
                style="max-width: 20rem;"
            >
            <div>
                <b-button  class="deleteButton" @click="deleteShow(serie)" variant="danger">X</b-button>
            </div>
            <b-card-text>
            {{serie.description}}
            </b-card-text>
            <b-row>
                <b-col>
                    <router-link :to="{ name:'edit', params:{ id: serie._id}}"  class="click">
                        <b-button variant="primary" class="buttonCard" >
                            Edit 
                        </b-button>
                    </router-link>
                </b-col>
                <b-col>
                    <b-button :href="serie.urlTrailer"  class="buttonCard"  variant="info">
                        Trailer
                    </b-button>
                </b-col>
            </b-row>
                  
        </b-card>
  
  </div>

</template>

<script>
import axios from 'axios';
export default {
    name:'ShowsList',
    props:{
        series:Array
    },
    methods:{
        async deleteShow(show) {
            try {
                await axios.delete("/api/items/" + show._id); 
                location.reload();           
            } catch (error) {
                console.log(error);
            }
        },
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
      width: 80px;
    }

    .card{
        display: inline-table;
        margin: 8px;
    }
    .card-img-top{
        max-height: 238px;
    }
</style>