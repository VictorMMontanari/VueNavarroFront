<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import axios from 'axios';
import postAluno from '../components/aluno/postAluno.vue';
import getAluno from '../components/aluno/getAluno.vue';
import putAluno from '../components/aluno/putAluno.vue';
import delAluno from '../components/aluno/delaluno.vue';
import RefreshButton  from '../components/RefreshButton .vue';

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

const alunos = ref([]);
const searchTerm = ref('');

const fetchData = async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/aluno');
    alunos.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
};

onMounted(() => {
  fetchData();
});

const filteredAlunos = computed(() => {
  if (!searchTerm.value) {
    return alunos.value;
  }
  const searchId = parseInt(searchTerm.value);
  return alunos.value.filter(aluno => aluno.userId === searchId);
});

const handleRefresh = () => {
  fetchData();
};

</script>

<template>
  <main class="principal">

    <div class="container-fluid conteudo2 text-bg-primary">
      <div class="mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">CRUD Aluno</h5>  
        </div>
      </div>
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postAluno />

        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Aluno
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
                  </tr>
                </thead>
                <getAluno v-for="aluno in filteredAlunos" :key="aluno.userId" :userId="aluno.userId" :nome="aluno.nome"
                  :sobrenome="aluno.sobrenome" :email="aluno.email" :login="aluno.login" :senha="aluno.senha"
                  :dataCadastro="aluno.dataCadastro" :ativo="aluno.ativo" />
              </table>
            </div>
          </div>
        </div>

        <!-- PUT -->
        <putAluno :alunos="alunos" />

        <!-- DELETE -->
        <delAluno :alunos="alunos" />

      </div>
      <RefreshButton @refresh="handleRefresh"/>
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