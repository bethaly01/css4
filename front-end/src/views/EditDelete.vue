<template>
    <b-container>
        <b-row>
          <div class="mt-4">
            <h4>Left and Right (or Start and End)</h4>
            <b-card :img-src="serie.urlImage" img-alt="Card image" img-left class="mb-3">
                <b-row class="info">
                    <h3>{{serie.title}}</h3>
                    <h6>{{serie.category}}</h6>
                    <p>{{serie.description}}</p>
                </b-row>
                <b-row class="trailer">
                <iframe width="560" height="315" :src="serie.urlTrailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </b-row>
            </b-card>
            <b-col cols="4">
                <h2></h2>
            </b-col>
            <b-col cols="8">
            <b-row class="info">
                <h2>{{serie.title}}</h2>
            </b-row>
            
            </b-col>
            </div>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
export  default{
    name:'editDelete',
    data(){
        return{
            serie:{}
        }
    },
    created(){
        this.getSerie();
    },
    methods:{
        async getSerie(){
            try{
                
                let responde = axios.get('/api/items/'+this.$route.params.id);
                this.serie = responde
            
            }
            catch(error){
                console.log("inside edit delete")
                console.log(error)
            }
        }

    }
}
</script>


<style>
.info{
    color:aqua;
}
</style>