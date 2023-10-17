<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import axios from 'axios';
const { programadores } = defineProps(['programadores']);

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
                    <option v-for="programador in programadores" :key="programador.$id" :value="programador">{{ programador.userId }} | {{ programador.nome }}</option>
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
</template>