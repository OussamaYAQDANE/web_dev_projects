<template>
    <div class="window">
        <JobsList style="width: 50%" />
        <JobDetails style="width: 50%;" />
    </div>
</template>

<script setup>
import JobsList from "./JobsList.vue";
import JobDetails from "./JobDetails.vue"





</script>

<style scoped>
.window{
    display: flex;
    width: 80%;
    background-color: blue;
    height: 80vh;
    border-radius: 5px;
    overflow: hidden;
}
</style>