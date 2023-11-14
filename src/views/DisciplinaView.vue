<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import postDisciplina from '../components/disciplina/postDisciplina.vue';
import getDisciplina from '../components/disciplina/getDisciplina.vue';
import putDisciplina from '../components/disciplina/putDisciplina.vue';
import delDisciplina from '../components/disciplina/delDisciplina.vue'

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

// Filtro
const filteredDisciplinas = computed(() => {
  if (!searchDisp.value) {
    return disciplinas.value;
  }

  const searchId = parseInt(searchDisp.value);
  return disciplinas.value.filter(disciplina => disciplina.$id == searchId);
});
</script>

<template>
  <main class="principal">

    <div class="p-3" style="display: flex; justify-content: center;">
      <div class="nav-link">
        <div class="card text-bg-secondary mb-3" style="max-width: 18rem;">
          <div class="card-header">Disciplina</div>
          <div class="card-body">
            <h5 class="card-title">CRUD Disciplina</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid conteudo2">
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postDisciplina/>
        

        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Disciplina
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchDisp" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Disponível</th>
                    <th scope="col">EAD</th>
                  </tr>
                </thead>
                  <getDisciplina v-for="disciplina in filteredDisciplinas"
                    :key="disciplina.$id"
                    :userId="disciplina.$id"
                    :nome="disciplina.nome"
                    :valor="disciplina.valor"
                    :disponivel="disciplina.disponivel"
                    :ead="disciplina.ead"/>
              </table>

            </div>
          </div>
        </div>


        <!-- PUT -->
        <putDisciplina :disciplinas="disciplinas"/>
        

        <!-- DELETE -->
        <delDisciplina :disciplinas="disciplinas"/>


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