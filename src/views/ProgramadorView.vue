<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import postProgramador from '../components/programador/postProgramador.vue';
import getProgramadorGerente from '../components/programador/getProgramadorGerente.vue';
import putProgramador from '../components/programador/putProgramador.vue';
import delProgramador from '../components/programador/delProgramador.vue';
import RefreshButton  from '../components/RefreshButton .vue';

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//GET Programador
const programadores = ref([]);
const searchTerm = ref('');

const fetchData = async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/programador');
    programadores.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
};

onMounted(() => {
  fetchData();
});

// Filtro
const filteredProgramadores = computed(() => {
  if (!searchTerm.value) {
    return programadores.value;
  }

  const searchId = parseInt(searchTerm.value);
  return programadores.value.filter(programador => programador.userId == searchId);
});

const handleRefresh = () => {
  fetchData();
};
</script>

<template>
  <main class="principal">

    <div class="container-fluid conteudo2 text-bg-warning">
      <div class="mb-3" style="max-width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">CRUD Programador</h5>
          </div>
        </div>
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postProgramador/>

        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Programador
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body" style="overflow-x:auto;">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchTerm" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Sobrenome</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Login</th>
                    <th scope="col">Senha</th>
                    <th scope="col">Data de Cadastro</th>
                    <th scope="col">Ativo</th>
                    <th scope="col">Nível de Atuação</th>
                  </tr>
                </thead>
                <getProgramadorGerente v-for="programador in filteredProgramadores"
                  :key="programador.userId"
                  :userId="programador.userId"
                  :nome="programador.nome"
                  :sobrenome="programador.sobrenome"
                  :email="programador.email"
                  :login="programador.login"
                  :senha="programador.senha"
                  :dataCadastro="programador.dataCadastro"
                  :ativo="programador.ativo"
                  :nivelAtuacao="programador.nivelAtuacao"/>
              </table>

            </div>
          </div>
        </div>

        <!-- PUT -->
        <putProgramador :programadores="programadores"/>

        <!-- DELETE -->
        <delProgramador :programadores="programadores"/>

      </div>
      <RefreshButton  @refresh="handleRefresh"/>
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