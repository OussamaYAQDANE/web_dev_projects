<template>
  <div id="JobsList">
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: blueviolet;
        position: relative;
      "
    >
      <span style="padding: 12px; font-size: 20px; font-weight: 600"
        >Jobs:</span
      >
      <span
        class="material-icons"
        style="cursor: pointer; padding: 6px"
        @click="addModal = true"
        >add</span
      >
    </div>
    <div class="scrollable-div">
      <JobListTile
        v-for="job in jobs"
        :key="job.id"
        :jobId="job.id"
        class="tile"
      />
    </div>

    <ModalVue v-model="addModal">
      <div id="change-form">
        <label>Titre</label>
        <input class="inp" type="text" v-model="jobTitle" />
        <label>Description</label>
        <input class="inp" type="text" v-model="jobDescription" />
        <label>Salaire</label>
        <input class="inp" type="text" v-model="jobSalary" />
        <label>Date de création</label>
        <input class="inp" type="text" v-model="jobDate" />
        <button class="button" @click="() => {addJob()}">Add Job</button>
      </div>
    </ModalVue>
  </div>
</template>

<script setup>
import JobListTile from "./JobListTile.vue";
import ModalVue from "./ModalVue.vue";
import { inject, ref } from "vue";

const jobs = inject("jobs");
const addModal = ref(false);

const jobTitle = ref("");
const jobDescription = ref("");
const jobDate = ref("");
const jobSalary = ref("");

function addJob() {
  fetch("http://localhost:3000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titre: jobTitle.value,
      description: jobDescription.value,
      'date de création': jobDate.value,
      salaire: jobSalary.value,
    }),
  });
  addModal.value = false;
}

</script>

<style scoped>
#JobsList {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(45, 45, 45);
}

.scrollable-div {
  overflow: auto;
  position: relative;
  scrollbar-color: #fff rgb(45, 45, 45);
  scrollbar-width: thin;
}

.tile {
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);
}
.tile:last-child {
  border-bottom: none;
}
.material-icons {
  border-radius: 50%;
}
.material-icons:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.button {
  width: fit-content;
  border: none;
  padding: 12px;
  background-color: red;
  color: white;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
}
#change-form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 500px;
}

label {
  margin-top: 8px;
}
.inp {
  height: 30px;
  outline: none;
  border-radius: 5px;
}
</style>