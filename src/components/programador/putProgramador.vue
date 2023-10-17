<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import axios from 'axios';
const { programadores } = defineProps(['programadores']);

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
</script>

<template>
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
                    <option v-for="programador in programadores" :key="programador.$id" :value="programador">{{ programador.userId }} | {{ programador.nome }}</option>
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
</template>