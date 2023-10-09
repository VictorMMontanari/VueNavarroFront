<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const formData = ref({
  nome: '',
  sobrenome: '',
  email: '',
  login: '',
  senha: '',
  dataCadastro: new Date().toISOString(), // Data atual em formato ISO
  ativo: true,
  nivelAtuacao: '',
});

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//POST Programador
const enviarFormulario = () => {
  axios.post('https://localhost:7127/api/programador', formData.value, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formData.value.nome = '';
      formData.value.sobrenome = '';
      formData.value.email = '';
      formData.value.login = '';
      formData.value.senha = '';
      formData.value.ativo = '';
      formData.value.nivelAtuacao = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

//GET Programador
const programadores = ref([]);
const searchTerm = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/programador');
    programadores.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro
const filteredProgramadores = computed(() => {
  if (!searchTerm.value) {
    return programadores.value;
  }

  const searchId = parseInt(searchTerm.value);
  return programadores.value.filter(programador => programador.$id == searchId);
});

//PUT Programador
const selectedUserId = ref(null); // Inicialmente, nenhum programador está selecionado

// Crie um objeto formDataPUT para o formulário PUT
const formDataPUT = ref({
  $id: '',
  nome: '',
  sobrenome: '',
  email: '',
  login: '',
  senha: '',
  dataCadastro: '',
  ativo: true,
  nivelAtuacao: '',
});

// Atualize o formDataPUT quando selectedUserId mudar
watch(selectedUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataPUT com os dados do programador selecionado
    formDataPUT.value.$id = newUserId.$id;
    formDataPUT.value.nome = newUserId.nome;
    formDataPUT.value.sobrenome = newUserId.sobrenome;
    formDataPUT.value.email = newUserId.email;
    formDataPUT.value.login = newUserId.login;
    formDataPUT.value.senha = newUserId.senha;
    formDataPUT.value.ativo = newUserId.ativo;
    formDataPUT.value.nivelAtuacao = newUserId.nivelAtuacao;
  } else {
    // Limpe o formDataPUT quando nenhum programador estiver selecionado
    formDataPUT.value.$id = '';
    formDataPUT.value.nome = '';
    formDataPUT.value.sobrenome = '';
    formDataPUT.value.email = '';
    formDataPUT.value.login = '';
    formDataPUT.value.senha = '';
    formDataPUT.value.ativo = true;
    formDataPUT.value.nivelAtuacao = '';
  }
});

const enviarFormularioPUT = () => {
  const programadorId = selectedUserId.value; // Obtém o programador selecionado

  if (!programadorId || !programadorId.$id) {
    console.error('Nenhum programador selecionado para atualização.');
    return;
  }

  // Crie um objeto com os dados do programador para atualização
  const programadorParaAtualizar = {
    $id: programadorId.$id,
    nome: formDataPUT.value.nome,
    sobrenome: formDataPUT.value.sobrenome,
    email: formDataPUT.value.email,
    login: formDataPUT.value.login,
    senha: formDataPUT.value.senha,
    dataCadastro: programadorId.dataCadastro, // Defina a dataCadastro com base em programadorId
    ativo: formDataPUT.value.ativo,
    nivelAtuacao: formDataPUT.value.nivelAtuacao,
  };

  // Combine as informações existentes do programador com as informações do formulário
  const programadorAtualizado = { ...programadorId, ...programadorParaAtualizar };

  const url = 'https://localhost:7127/api/programador'; // URL para atualizar o programador

  axios.put(url, programadorAtualizado, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataPUT.value.nome = '';
      formDataPUT.value.sobrenome = '';
      formDataPUT.value.email = '';
      formDataPUT.value.login = '';
      formDataPUT.value.senha = '';
      formDataPUT.value.ativo = true;
      formDataPUT.value.nivelAtuacao = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalPUT'));
      successModal.show();

      // Redefinir o programador selecionado para vazio após o sucesso
      selectedUserId.value = null;


    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

// DELETE Programador
const selectedDeleteUserId = ref(null); // Inicialmente, nenhum programador está selecionado

// Crie um objeto formDataDELETE para o formulário DELETE
const formDataDETELE = ref({
  $id: '',
  nome: '',
  sobrenome: '',
  email: '',
  login: '',
  senha: '',
  dataCadastro: '',
  ativo: true,
  nivelAtuacao: '',
});

// Atualize o formDataDELETE quando selectedDeleteUserId mudar
watch(selectedDeleteUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataDELETE com os dados do programador selecionado
    formDataDETELE.value.$id = newUserId.$id;
    formDataDETELE.value.nome = newUserId.nome;
    formDataDETELE.value.sobrenome = newUserId.sobrenome;
    formDataDETELE.value.email = newUserId.email;
    formDataDETELE.value.login = newUserId.login;
    formDataDETELE.value.senha = newUserId.senha;
    formDataDETELE.value.ativo = newUserId.ativo;
    formDataDETELE.value.nivelAtuacao = newUserId.nivelAtuacao;
  } else {
    // Limpe o formDataDELETE quando nenhum programador estiver selecionado
    formDataDETELE.value.$id = '';
    formDataDETELE.value.nome = '';
    formDataDETELE.value.sobrenome = '';
    formDataDETELE.value.email = '';
    formDataDETELE.value.login = '';
    formDataDETELE.value.senha = '';
    formDataDETELE.value.ativo = true;
    formDataDETELE.value.nivelAtuacao = '';
  }
});
const confirmarExclusao = () => {
  const confirmacao = window.confirm('Tem certeza que deseja apagar este programador?');

  if (confirmacao) {
    // Chama a função para apagar o programador
    enviarFormularioDELETE();
  }
}
const enviarFormularioDELETE = () => {
  const programadorId = selectedDeleteUserId.value; // Obtém o programador selecionado

  if (!programadorId || !programadorId.$id) {
    console.error('Nenhum programador selecionado para deletar.');
    return;
  }

  // Crie um objeto com os dados do programador para deletar
  const programadorParaApagar = {
    $id: programadorId.$id,
    nome: formDataDETELE.value.nome,
    sobrenome: formDataDETELE.value.sobrenome,
    email: formDataDETELE.value.email,
    login: formDataDETELE.value.login,
    senha: formDataDETELE.value.senha,
    dataCadastro: programadorId.dataCadastro, // Defina a dataCadastro com base em programadorId
    ativo: formDataDETELE.value.ativo,
    cargaHoraria: formDataDETELE.value.nivelAtuacao,
  };

  // Combine as informações existentes do programador com as informações do formulário
  const programadorAtualizado = { ...programadorId, ...programadorParaApagar };


  // const programadorJSON = JSON.stringify(programadorParaApagar);

  const url = `https://localhost:7127/api/programador`; // URL para excluir o programador com base no ID

  axios.delete(url, {
    data: programadorAtualizado,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataDETELE.value.nome = '';
      formDataDETELE.value.sobrenome = '';
      formDataDETELE.value.email = '';
      formDataDETELE.value.login = '';
      formDataDETELE.value.senha = '';
      formDataDETELE.value.ativo = true;
      formDataDETELE.value.nivelAtuacao = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalDELETE'));
      successModal.show();

      // Redefinir o programador selecionado para vazio após o sucesso
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
              POST Programador
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
                  <label for="inputLast" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formData.sobrenome">
                </div>
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" v-model="formData.email">
                </div>
                <div class="col-md-6">
                  <label for="inputLogin4" class="form-label">Login</label>
                  <input type="text" class="form-control" id="inputLogin4" v-model="formData.login">
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" v-model="formData.senha">
                </div>
                <input type="hidden" id="inputDate" v-model="formData.dataCadastro">
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Ativo</label>
                  <select id="inputState" class="form-select" v-model="formData.ativo">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-8">
                  <label for="inputFirst" class="form-label">Nível de Atuação</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formData.nivelAtuacao">
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
              GET Programador
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
                    <th scope="col">Nível de Atuação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="programador in filteredProgramadores" :key="programador.$id">
                    <th scope="row">{{ programador.$id }}</th>
                    <td>{{ programador.nome }}</td>
                    <td>{{ programador.sobrenome }}</td>
                    <td>{{ programador.email }}</td>
                    <td>{{ programador.login }}</td>
                    <td>{{ programador.senha }}</td>
                    <td>{{ programador.dataCadastro }}</td>
                    <td>{{ programador.ativo ? 'Sim' : 'Não' }}</td>
                    <td>{{ programador.nivelAtuacao }}</td>
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
              PUT Programador
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="enviarFormularioPUT">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Programador</label>
                  <select id="inputState" class="form-select" v-model="selectedUserId">
                    <option v-for="programador in filteredProgramadores" :key="programador.$id" :value="programador">{{ programador.$id }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataPUT.nome">
                </div>
                <div class="col-md-6">
                  <label for="inputLast" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formDataPUT.sobrenome">
                </div>
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" v-model="formDataPUT.email">
                </div>
                <div class="col-md-6">
                  <label for="inputLogin4" class="form-label">Login</label>
                  <input type="text" class="form-control" id="inputLogin4" v-model="formDataPUT.login">
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" v-model="formDataPUT.senha">
                </div>
                <input type="hidden" id="inputDate" v-model="formDataPUT.dataCadastro">
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Ativo</label>
                  <select id="inputState" class="form-select" v-model="formDataPUT.ativo">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-8">
                  <label for="inputFirst" class="form-label">Nível de Atuação</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataPUT.nivelAtuacao">
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
              DELETE Programador
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="confirmarExclusao">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Programador</label>
                  <select id="inputState" class="form-select" v-model="selectedDeleteUserId">
                    <option v-for="programador in filteredProgramadores" :key="programador.$id" :value="programador">{{ programador.$id }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataDETELE.nome"
                    disabled="isInputLocked">
                </div>
                <div class="col-md-6">
                  <label for="inputLast" class="form-label">Sobrenome</label>
                  <input type="text" class="form-control" id="inputLast" v-model="formDataDETELE.sobrenome"
                    disabled="isInputLocked">
                </div>
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" v-model="formDataDETELE.email"
                    disabled="isInputLocked">
                </div>
                <div class="col-md-6">
                  <label for="inputLogin4" class="form-label">Login</label>
                  <input type="text" class="form-control" id="inputLogin4" v-model="formDataDETELE.login"
                    disabled="isInputLocked">
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" v-model="formDataDETELE.senha"
                    disabled="isInputLocked">
                </div>
                <input type="hidden" id="inputDate" v-model="formDataDETELE.dataCadastro" disabled="isInputLocked">
                <div class="col-md-4">
                  <label for="inputState" class="form-label">Ativo</label>
                  <select id="inputState" class="form-select" v-model="formDataDETELE.ativo" disabled="isInputLocked">
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputFirst" class="form-label">Nível de Atuação</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataDETELE.nivelAtuacao"
                    disabled="isInputLocked">
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