<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import postGerente from '../components/gerente/postGerente.vue';
import getGerente from '../components/gerente/getGerente.vue';
import putGerente from '../components/gerente/putGerente.vue';
import delGerente from '../components/gerente/delGerente.vue'

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//GET Gerente
const gerentes = ref([]);
const searchTerm = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/gerente');
    gerentes.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro
const filteredGerentes = computed(() => {
  if (!searchTerm.value) {
    return gerentes.value;
  }

  const searchId = parseInt(searchTerm.value);
  return gerentes.value.filter(gerente => gerente.userId == searchId);
});
</script>

<template>
  <main class="principal">


    <div class="container-fluid conteudo2">
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <postGerente/>


        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Gerente
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

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
                    <th scope="col">Carga Horária</th>
                  </tr>
                </thead>
                <getGerente v-for="gerente in filteredGerentes"
                  :key="gerente.userId"
                  :userId="gerente.userId"
                  :nome="gerente.nome"
                  :sobrenome="gerente.sobrenome"
                  :email="gerente.email"
                  :login="gerente.login"
                  :senha="gerente.senha"
                  :dataCadastro="gerente.dataCadastro"
                  :ativo="gerente.ativo"
                  :cargaHoraria="gerente.cargaHoraria"/>
              </table>

            </div>
          </div>
        </div>


        <!-- PUT -->
        <putGerente :gerentes="gerentes"/>


        <!-- DELETE -->
        <delGerente :gerentes="gerentes"/>


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