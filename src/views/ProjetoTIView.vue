<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import postProjetoTI from '../components/projetoTI/postProjetoTI.vue';
import getProjetoTI from '../components/projetoTI/getProjetoTI.vue';

//GET ProjetoTI
const projetosTI = ref([]);
const searchMat = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/projetoti');
    projetosTI.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro ProjetoTI
const filteredProjetosTI = computed(() => {
  if (!searchMat.value) {
    return projetosTI.value;
  }

  const searchIdProjetoTI = parseInt(searchMat.value);
  return projetosTI.value.filter(protojetoTI => protojetoTI.userId == searchIdProjetoTI);
});

//GET Gerente
const gerentes = ref([]);
const searchGerente = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/gerente');
    gerentes.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Gerente
const filteredGerentes = computed(() => {
  if (!searchGerente.value) {
    return gerentes.value;
  }

  const searchIdGerente = parseInt(searchGerente.value);
  return gerentes.value.filter(gerente => gerente.userId == searchIdGerente);
});

//GET Programador
const programadores = ref([]);
const searchProg = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/programador');
    programadores.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Programador
const filteredProgramadores = computed(() => {
  if (!searchProg.value) {
    return programadores.value;
  }

  const searchIdProgramador = parseInt(searchProg.value);
  return programadores.value.filter(programador => programador.userId == searchIdProgramador);
});

function procurarGerente(gerenteId){
  const formGerente = this.gerentes.find(gerente => gerente.userId == gerenteId);
  // console.log('Gerente Nome-> ', formGerente.nome);
  return formGerente.nome;
}

function procurarProgramador(programadorId){
  const formProgramador = this.programadores.find(programador => programador.userId == programadorId);
  // console.log('Gerente Nome-> ', formProgramador.nome);
  return formProgramador.nome;
}
</script>

<template>
  <main class="principal">

    <div class="p-3" style="display: flex; justify-content: center;">
      <div class="nav-link">
        <div class="card text-bg-info mb-3" style="max-width: 18rem;">
          <div class="card-header">ProjetoTI</div>
          <div class="card-body">
            <h5 class="card-title">CRUD ProjetoTI</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid conteudo2">
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postProjetoTI :gerentes="gerentes" :programadores="programadores"/>

        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Projeto TI
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body" style="overflow-x:auto;">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchProg" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Gerente</th>
                    <th scope="col">Programador</th>
                  </tr>
                </thead>
                  <getProjetoTI v-for="projetoTI in filteredProjetosTI"
                  :key="projetoTI.projetoId"
                  :userId="projetoTI.projetoId"
                  :gerenteNome="procurarGerente(projetoTI.gerenteId)"
                  :programadorNome="procurarProgramador(projetoTI.programadorId)"/>
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