<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const formData = ref({
  nome: '',
  valor: '',
  disponivel: true,
  ead: true,
});

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//Post Disciplina
const enviarFormulario = () => {
  axios.post('https://localhost:7127/api/disciplina', formData.value, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formData.value.nome = '';
      formData.value.valor = '';
      formData.value.disponivel = true;
      formData.value.ead = true;

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

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

//PUT Disciplina
const selectedUserId = ref(null); // Inicialmente, nenhuma disciplina está selecionada

// Crie um objeto formDataPUT para o formulário PUT
const formDataPUT = ref({
  $id: '',
  nome: '',
  valor: '',
  disponivel: true,
  ativo: true,
});

// Atualize o formDataPUT quando selectedUserId mudar
watch(selectedUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataPUT com os dados da disciplina selecionada
    formDataPUT.value.$id = newUserId.$id;
    formDataPUT.value.nome = newUserId.nome;
    formDataPUT.value.valor = newUserId.valor;
    formDataPUT.value.disponivel = newUserId.disponivel;
    formDataPUT.value.ead = newUserId.ead;
  } else {
    // Limpe o formDataPUT quando nenhuma disciplina estiver selecionada
    formDataPUT.value.$id = '';
    formDataPUT.value.nome = '';
    formDataPUT.value.valor = '';
    formDataPUT.value.disponivel = true;
    formDataPUT.value.ead = true;
  }
});

const enviarFormularioPUT = () => {
  const disciplinaId = selectedUserId.value; // Obtém a disciplina selecionada

  if (!disciplinaId || !disciplinaId.$id) {
    console.error('Nenhuma disciplina selecionada para atualização.');
    return;
  }

  // Crie um objeto com os dados da disciplina para atualização
  const disciplinaParaAtualizar = {
    $id: disciplinaId.$id,
    nome: formDataPUT.value.nome,
    valor: formDataPUT.value.valor,
    disponivel: formDataPUT.value.disponivel,
    ead: formDataPUT.value.ead,
  };

  // Combine as informações existentes da disciplina com as informações do formulário
  const disciplinaAtualizado = { ...disciplinaId, ...disciplinaParaAtualizar };

  const url = 'https://localhost:7127/api/disciplina'; // URL para atualizar a disciplina

  axios.put(url, disciplinaAtualizado, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataPUT.value.nome = '';
      formDataPUT.value.valor = '';
      formDataPUT.value.disponivel = true;
      formData.value.ead = true;

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalPUT'));
      successModal.show();

      // Redefinir a disciplina selecionada para vazio após o sucesso
      selectedUserId.value = null;


    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

// DELETE Disciplina
const selectedDeleteUserId = ref(null); // Inicialmente, nenhuma disciplina está selecionada

// Crie um objeto formDataDELETE para o formulário DELETE
const formDataDETELE = ref({
  $id: '',
  nome: '',
  valor: '',
  disponivel: true,
  ead: true,
});

// Atualize o formDataDELETE quando selectedDeleteUserId mudar
watch(selectedDeleteUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataDELETE com os dados da disciplina selecionada
    formDataDETELE.value.$id = newUserId.$id;
    formDataDETELE.value.nome = newUserId.nome;
    formDataDETELE.value.valor = newUserId.valor;
    formDataDETELE.value.disponivel = newUserId.disponivel;
    formDataDETELE.value.ead = newUserId.ead;
  } else {
    // Limpe o formDataDELETE quando nenhuma disciplina estiver selecionada
    formDataDETELE.value.$id = '';
    formDataDETELE.value.nome = '';
    formDataDETELE.value.valor = '';
    formDataDETELE.value.disponivel = true;
    formDataDETELE.value.ead = true;
  }
});
const confirmarExclusao = () => {
  const confirmacao = window.confirm('Tem certeza que deseja apagar esta disciplina?');

  if (confirmacao) {
    // Chama a função para apagar a disciplina
    enviarFormularioDELETE();
  }
}
const enviarFormularioDELETE = () => {
  const disciplinaId = selectedDeleteUserId.value; // Obtém a disciplina selecionada

  if (!disciplinaId || !disciplinaId.$id) {
    console.error('Nenhuma disciplina selecionada para deletar.');
    return;
  }

  // Crie um objeto com os dados da disciplina para deletar
  const disciplinaParaApagar = {
    $id: disciplinaId.$id,
    nome: formDataDETELE.value.nome,
    valor: formDataDETELE.value.valor,
    disponivel: formDataDETELE.value.disponivel,
    ead: formDataDETELE.value.ead,
  };

  // Combine as informações existentes da disciplina com as informações do formulário
  const disciplinaAtualizado = { ...disciplinaId, ...disciplinaParaApagar };


  // const disciplinaJSON = JSON.stringify(disciplinaParaApagar);

  const url = `https://localhost:7127/api/disciplina`; // URL para excluir a disciplina com base no ID

  axios.delete(url, {
    data: disciplinaAtualizado,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataDETELE.value.nome = '';
      formDataDETELE.value.valor = '';
      formDataDETELE.value.disponivel = true;
      formDataDETELE.value.ead = true;

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalDELETE'));
      successModal.show();

      // Redefinir a disciplina selecionada para vazio após o sucesso
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
              POST Disciplina
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form class="row" @submit.prevent="enviarFormulario">
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formData.nome">
                </div>
                <div class="col-md-6">
                  <label for="inputLast" class="form-label">Valor</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formData.valor">
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Disponível</label>
                  <select id="inputState" class="form-select" v-model="formData.disponivel">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">EAD</label>
                  <select id="inputState" class="form-select" v-model="formData.ead">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-12">
                  <br>
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
              </form>
              <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel"
                aria-hidden="true">
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
                <tbody>
                  <tr v-for="disciplina in filteredDisciplinas" :key="disciplina.$id">
                    <th scope="row">{{ disciplina.$id }}</th>
                    <td>{{ disciplina.nome }}</td>
                    <td>{{ disciplina.valor }}</td>
                    <td>{{ disciplina.disponivel ? 'Sim' : 'Não' }}</td>
                    <td>{{ disciplina.ead ? 'Sim' : 'Não' }}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>


        <!-- PUT -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              PUT Disciplina
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="enviarFormularioPUT">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Disciplina</label>
                  <select id="inputState" class="form-select" v-model="selectedUserId">
                    <option v-for="disciplina in filteredDisciplinas" :key="disciplina.$id" :value="disciplina">{{ disciplina.$id }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataPUT.nome">
                </div>
                <div class="col-md-6">
                  <label for="inputLast" class="form-label">Valor</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formDataPUT.valor">
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Disponível</label>
                  <select id="inputState" class="form-select" v-model="formDataPUT.disponivel">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">EAD</label>
                  <select id="inputState" class="form-select" v-model="formDataPUT.ead">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-12">
                  <br>
                  <button type="submit" class="btn btn-primary">Atualizar</button>
                </div>
              </form>

              <div class="modal fade" id="successModalPUT" tabindex="-1" aria-labelledby="successModalLabel"
                aria-hidden="true">
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



        <!-- DELETE -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              DELETE Disciplina
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="confirmarExclusao">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Disciplina</label>
                  <select id="inputState" class="form-select" v-model="selectedDeleteUserId">
                    <option v-for="disciplina in filteredDisciplinas" :key="disciplina.$id" :value="disciplina">{{ disciplina.$id }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataDETELE.nome"
                    disabled="isInputLocked">
                </div>
                <div class="col-md-6">
                  <label for="inputLast" class="form-label">Valor</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formDataDETELE.valor"
                    disabled="isInputLocked">
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Disponível</label>
                  <select id="inputState" class="form-select" v-model="formDataDETELE.disponivel" disabled="isInputLocked">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">EAD</label>
                  <select id="inputState" class="form-select" v-model="formDataDETELE.ead" disabled="isInputLocked">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-12">
                  <br>
                  <button type="submit" class="btn btn-danger">Apagar</button>
                </div>
              </form>

              <div class="modal fade" id="successModalDELETE" tabindex="-1" aria-labelledby="successModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="successModalLabel">Sucesso</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                      Seu formulário foi apagado com sucesso!
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