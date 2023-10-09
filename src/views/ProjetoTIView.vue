<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const formData = ref({
  gerenteId: '',
  programadorId: '',
  dataEntrega: new Date().toISOString(), // Data atual em formato ISO
});

const selectedUserIds = ref({
  gerenteId: '',
  programadorId: '',
})

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//Post ProjetoTI
const enviarFormulario = () => {
  const idGerente = selectedUserIds.value.gerenteId.userId;
  const idProgramador = selectedUserIds.value.programadorId.userId;
  console.log('idGerente:', idGerente);
  console.log('idProgramador:', idProgramador);


  axios.post(`https://localhost:7127/api/projetoti?idGerente=${idGerente}&idProgramador=${idProgramador}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formData.value.gerenteId = '';
      formData.value.programadorId = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

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
  return projetosTI.value.filter(protojetoTI => protojetoTI.$id == searchIdProjetoTI);
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
  return gerentes.value.filter(gerente => gerente.$id == searchIdGerente);
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
  return programadores.value.filter(programador => programador.$id == searchIdProgramador);
});




//PUT ProjetoTI
const selectedUserId = ref(null); // Inicialmente, nenhum projetoTI está selecionada

// Crie um objeto formDataPUT para o formulário PUT
const formDataPUT = ref({
  $id: '',
  gerenteId: '',
  programadorId: '',
});

// Atualize o formDataPUT quando selectedUserId mudar
watch(selectedUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataPUT com os dados do projetoTI selecionada
    formDataPUT.value.$id = newUserId.$id;
    formDataPUT.value.nome = newUserId.gerenteId;
    formDataPUT.value.valor = newUserId.programadorId;
  } else {
    // Limpe o formDataPUT quando nenhum projetoTI estiver selecionada
    formDataPUT.value.$id = '';
    formDataPUT.value.gerenteId = '';
    formDataPUT.value.programadorId = '';
  }
});

const enviarFormularioPUT = () => {
  const projetoTIId = selectedUserId.value; // Obtém o projetoTI selecionada

  if (!projetoTIId || !projetoTIId.$id) {
    console.error('Nenhuma projetoTI selecionada para atualização.');
    return;
  }

  // Crie um objeto com os dados do projetoTI para atualização
  const projetoTIParaAtualizar = {
    $id: projetoTIId.$id,
    nome: formDataPUT.value.gerenteId,
    valor: formDataPUT.value.programadorId,
  };

  // Combine as informações existentes do projetoTI com as informações do formulário
  const projetoTIAtualizado = { ...projetoTIId, ...projetoTIParaAtualizar };

  const url = 'https://localhost:7127/api/projetoTI'; // URL para atualizar o projetoTI

  axios.put(url, projetoTIAtualizado, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataPUT.value.gerenteId = '';
      formDataPUT.value.programadorId = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalPUT'));
      successModal.show();

      // Redefinir o projetoTI selecionada para vazio após o sucesso
      selectedUserId.value = null;


    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

// DELETE ProjetoTI
const selectedDeleteUserId = ref(null); // Inicialmente, nenhum projetoTI está selecionada

// Crie um objeto formDataDELETE para o formulário DELETE
const formDataDETELE = ref({
  $id: '',
  gerenteId: '',
  programadorId: '',
});

// Atualize o formDataDELETE quando selectedDeleteUserId mudar
watch(selectedDeleteUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataDELETE com os dados do projetoTI selecionada
    formDataDETELE.value.$id = newUserId.$id;
    formDataDETELE.value.nome = newUserId.gerenteId;
    formDataDETELE.value.valor = newUserId.programadorId;
  } else {
    // Limpe o formDataDELETE quando nenhum projetoTI estiver selecionada
    formDataDETELE.value.$id = '';
    formDataDETELE.value.gerenteId = '';
    formDataDETELE.value.programadorId = '';
  }
});
const confirmarExclusao = () => {
  const confirmacao = window.confirm('Tem certeza que deseja apagar este projetoTI?');

  if (confirmacao) {
    // Chama a função para apagar o projetoTI
    enviarFormularioDELETE();
  }
}
const enviarFormularioDELETE = () => {
  const projetoTIId = selectedDeleteUserId.value; // Obtém o projetoTI selecionado

  if (!projetoTIId || !projetoTIId.$id) {
    console.error('Nenhum projetoTI selecionado para deletar.');
    return;
  }

  // Crie um objeto com os dados do projetoTI para deletar
  const projetoTIParaApagar = {
    $id: projetoTIId.$id,
    nome: formDataDETELE.value.gerenteId,
    valor: formDataDETELE.value.programadorId,
  };

  // Combine as informações existentes do projetoTI com as informações do formulário
  const projetoTIAtualizado = { ...projetoTIId, ...projetoTIParaApagar };


  // const projetosTIJSON = JSON.stringify(projetoTIParaApagar);

  const url = `https://localhost:7127/api/projetoTI`; // URL para excluir o projetoTI com base no ID

  axios.delete(url, {
    data: projetoTIAtualizado,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataDETELE.value.gerenteId = '';
      formDataDETELE.value.programadorId = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalDELETE'));
      successModal.show();

      // Redefinir o projetoTI selecionada para vazio após o sucesso
      selectedDeleteUserId.value = null;


    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

</script>

<template>
  <main class="principal">


    <div class="container-fluid conteudo2">
      <div class="accordion" id="accordionExample">

        <!-- POST -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              POST Projeto TI
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form class="row" @submit.prevent="enviarFormulario">

                <div class="col-12">
                  <label for="inputState1" class="form-label">Selecione Id do Gerente</label>
                  <select id="inputState1" class="form-select" v-model="selectedUserIds.gerenteId">
                    <option v-for="gerente in filteredGerentes" :key="gerente.userId" :value="gerente">{{ gerente.userId }}  |  {{ gerente.nome }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputState2" class="form-label">Selecione Id do Programador</label>
                  <select id="inputState2" class="form-select" v-model="selectedUserIds.programadorId">
                    <option v-for="programador in filteredProgramadores" :key="programador.userId" :value="programador">{{ programador.userId }}  |  {{ programador.nome }}</option>
                  </select>
                </div>

                <input type="hidden" id="inputDate" v-model="formData.dataCadastro">
                <div class="col-12">
                  <br>
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
              </form>
              <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="successModalLabel">Sucesso</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                      Seu formulário foi enviado com sucesso!
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Projeto TI
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchProg" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Gerente Id</th>
                    <th scope="col">Programador Id</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="projetoTI in filteredProjetosTI" :key="projetoTI.$id">
                    <th scope="row">{{ projetoTI.$id }}</th>
                    <td>{{ projetoTI.gerenteId }} </td>
                    <td>{{ projetoTI.programadorId }}</td>
                  </tr>
                </tbody>
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