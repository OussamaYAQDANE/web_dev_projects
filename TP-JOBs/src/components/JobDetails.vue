<template>
    <div style="height: 100%; background-color: gray; padding:10px">
        <h3>{{ obj[0] }}</h3>
        <br>
        <h3>{{ obj[1] }}</h3>
        <br>
        <h3>{{ obj[2] }}</h3>
        <br>
        <h3>{{ obj[3] }}</h3>
    </div>
</template>

<script setup>
import {inject, computed} from 'vue';
const jobId = inject('selectedJob')

console.log(jobId.value);
const jobs = inject('jobs');


const obj = computed(()=>{
    let title, salary, date, description;
    for (let job of jobs.value){
    if (job.id == jobId.value){
        title = job.titre;
        salary = job.salaire;
        date = job["date de création"];
        description = job.description;
    }
    
}

    return [title, salary, date, description];
})

</script>

<style scoped>

</style>