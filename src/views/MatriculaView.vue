<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import postMatricula from '../components/matricula/postMatricula.vue';
import getMatricula from '../components/matricula/getMatricula.vue';

//GET Matricula
const matriculas = ref([]);
const searchMat = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/matricula');
    matriculas.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Matricula
const filteredMatriculas = computed(() => {
  if (!searchMat.value) {
    return matriculas.value;
  }

  const searchIdMatricula = parseInt(searchMat.value);
  return matriculas.value.filter(matricula => matricula.userId == searchIdMatricula);
});

//GET Aluno
const alunos = ref([]);
const searchAluno = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/aluno');
    alunos.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Aluno
const filteredAlunos = computed(() => {
  if (!searchAluno.value) {
    return alunos.value;
  }

  const searchIdAluno = parseInt(searchAluno.value);
  return alunos.value.filter(aluno => aluno.userId == searchIdAluno);
});

//GET Disciplina
const disciplinas = ref([]);
const searchDisp = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/disciplina');
    disciplinas.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Disciplina
const filteredDisciplinas = computed(() => {
  if (!searchDisp.value) {
    return disciplinas.value;
  }

  const searchIdDisciplina = parseInt(searchDisp.value);
  return disciplinas.value.filter(disciplina => disciplina.userId == searchIdDisciplina);
});

</script>

<template>
  <main class="principal">


    <div class="container-fluid conteudo2">
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postMatricula :alunos="alunos" :disciplinas="disciplinas"/>


        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Matrícula
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchMat" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Aluno Id</th>
                    <th scope="col">Disciplina Id</th>
                  </tr>
                </thead>
                <getMatricula v-for="matricula in filteredMatriculas"
                  :key="matricula.matriculaId"
                  :userId="matricula.matriculaId"
                  :alunoId="matricula.alunoId"
                  :disciplinaId="matricula.disciplinaId"/>
              </table>

            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style>
.conteudo2 {
  position: relative;
  padding: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 10px;
}

.principal {
  grid-area: principal;
  height: calc(100vh - 110px);
  background-color: #f0f0f0;
  padding: 20px;
}
</style>