<template>
    <div class="container" ref="containerRef" @click="(e)=>{
        element = e.currentTarget;
        for (let x of element.parentElement.children){
            x.classList.remove('focused');
        }
        element.classList.add('focused');
        
        change(jobId);
        }" >
        <span id="title">{{ title }}</span>
        <div style="width:100%"></div>
        <span class="material-icons-outlined" @click="changeJob(jobId)">edit</span>
        <span class="material-icons-outlined" @click="event=>{event.stopPropagation(); toDeleteJob = jobId; showDeleteModal()}" >delete</span>
    </div>
</template>

<script setup>
import {inject, defineProps, computed} from 'vue';

const showDeleteModal = inject('showDeleteModal');

let change = inject('changeSelectedJob');
const toDeleteJob = inject('toDeleteJob')
const props = defineProps({
    jobId: {type: Number, require: true}
})

const jobs = inject('jobs');
const title = computed(()=>{
    let t = "";
    for (let i in jobs.value){
        if (jobs.value[i].id == props.jobId) t = jobs.value[i].titre;
    }
    return t;
});



let changeJob = inject('changeJob');


</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background-color: rgb(45,45,45);
    border-left: 2px solid transparent;
}

#title{
    font-weight:600;
    white-space: nowrap;
    color: white
}

.focused{
    border-left: 2px solid white;
}

.material-icons-outlined{
    cursor: pointer;
    border-radius: 50%;
    padding: 8px;
    color: white;
}
.material-icons-outlined:hover{
    background-color: rgba(0,0,0,0.4);
}



</style>