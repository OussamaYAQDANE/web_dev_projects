<template>
  <div class="MainPage">
    <JobWindow />
    <ModalVue v-model="deletedModal">
      <div id="delete-form">
        <span style="font-weight: 600"
          >Are you sure you want to delete that job?</span
        >
        <button
          class="button"
          @click="
            removeJob(toDeleteJob);
            deletedModal = false;
          "
        >
          Click here to confirm
        </button>
      </div>
    </ModalVue>

    <ModalVue v-model="changeModal">
      <div id="change-form">
        <label>Titre</label>
        <input class="inp" type="text" v-model="jobTitle" />
        <label>Description</label>
        <input class="inp" type="text" v-model="jobDescription" />
        <label>Salaire</label>
        <input class="inp" type="text" v-model="jobSalary" />
        <label>Date de création</label>
        <input class="inp" type="text" v-model="jobDate" />
        <button
          class="button"
          @click="updateJob
          "
        >
          Save changes
        </button>
      </div>
    </ModalVue>
  </div>
</template>

<script setup>
import JobWindow from "@/components/JobWindow.vue";
import ModalVue from "@/components/ModalVue.vue";
import { ref, provide } from "vue";

function updateJob() {
  let i = 0;
  while (i < jobs.value.length) {
    if (jobs.value[i].id === toChange.value) break;
    i++;
  }
  
  fetch(`http://localhost:3000/jobs/${toChange.value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titre: jobTitle.value,
      description: jobDescription.value,
      salaire: jobSalary.value,
      'date de création': jobDate.value
    })
  });
}
const deletedModal = ref(false);

const selectedJob = ref(null);
provide('selectedJob', selectedJob);

const toDeleteJob = ref(null);

function changeSelectedJob(id) {
  selectedJob.value = id;
}
function removeJob() {
  fetch("http://localhost:3000/jobs/"+toDeleteJob.value, {
  method: "DELETE"
});
}
function showDeleteModal() {
  deletedModal.value = true;
}
const jobs = ref([]);

////////////////////////////////////////////// ChangeForm ////////////////////////////////////
const toChange = ref(null);
const changeModal = ref(false);

function changeJob(id) {
  toChange.value = id;
  let i = 0;
  while (i < jobs.value.length) {
    if (jobs.value[i].id === toChange.value) break;
    i++;
  }
  jobTitle.value = jobs.value[i].titre;
  jobDate.value = jobs.value[i]["date de création"];
  jobSalary.value = jobs.value[i].salaire;
  jobDescription.value = jobs.value[i].description;

  changeModal.value = true;
}
provide("changeJob", changeJob);
const jobTitle = ref("");
const jobDescription = ref("");
const jobDate = ref("");
const jobSalary = ref("");

/////////////////////////////////////////////////////////////////////////////////////////////

fetch("http://localhost:3000/jobs")
  .then((response) => response.json())
  .then((data) => {
    jobs.value = data;
  })
  .catch((error) => {
    console.log(error);
  });
provide("jobs", jobs);
provide("showDeleteModal", showDeleteModal);
provide("changeSelectedJob", changeSelectedJob);
provide("toDeleteJob", toDeleteJob);
</script>











<style scoped>
.MainPage {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #242424;
  height: 100vh;
}

#delete-form {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
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