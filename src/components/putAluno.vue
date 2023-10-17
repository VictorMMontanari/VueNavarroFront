<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import axios from 'axios';
const { alunos } = defineProps(['alunos']);

//PUT Aluno
const selectedUserId = ref(null); // Inicialmente, nenhum aluno está selecionado

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
});

// Atualize o formDataPUT quando selectedUserId mudar
watch(selectedUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataPUT com os dados do aluno selecionado
    formDataPUT.value.$id = newUserId.$id;
    formDataPUT.value.nome = newUserId.nome;
    formDataPUT.value.sobrenome = newUserId.sobrenome;
    formDataPUT.value.email = newUserId.email;
    formDataPUT.value.login = newUserId.login;
    formDataPUT.value.senha = newUserId.senha;
    formDataPUT.value.ativo = newUserId.ativo;
  } else {
    // Limpe o formDataPUT quando nenhum aluno estiver selecionado
    formDataPUT.value.$id = '';
    formDataPUT.value.nome = '';
    formDataPUT.value.sobrenome = '';
    formDataPUT.value.email = '';
    formDataPUT.value.login = '';
    formDataPUT.value.senha = '';
    formDataPUT.value.ativo = true;
  }
});

const enviarFormularioPUT = () => {
  const alunoId = selectedUserId.value; // Obtém o aluno selecionado

  if (!alunoId || !alunoId.$id) {
    console.error('Nenhum aluno selecionado para atualização.');
    return;
  }

  // Crie um objeto com os dados do aluno para atualização
  const alunoParaAtualizar = {
    $id: alunoId.$id,
    nome: formDataPUT.value.nome,
    sobrenome: formDataPUT.value.sobrenome,
    email: formDataPUT.value.email,
    login: formDataPUT.value.login,
    senha: formDataPUT.value.senha,
    dataCadastro: alunoId.dataCadastro, // Defina a dataCadastro com base em alunoId
    ativo: formDataPUT.value.ativo,
  };

  // Combine as informações existentes do aluno com as informações do formulário
  const alunoAtualizado = { ...alunoId, ...alunoParaAtualizar };

  const url = 'https://localhost:7127/api/aluno'; // URL para atualizar o aluno

  axios.put(url, alunoAtualizado, {
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

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalPUT'));
      successModal.show();

      // Redefinir o aluno selecionado para vazio após o sucesso
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
              PUT Aluno
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="enviarFormularioPUT">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Aluno</label>
                  <select id="inputState" class="form-select" v-model="selectedUserId">
                    <option v-for="aluno in alunos" :key="aluno.$id" :value="aluno">{{ aluno.$id }}</option>
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