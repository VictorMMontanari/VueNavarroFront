<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
const { gerentes } = defineProps(['gerentes']);

// DELETE Gerente
const selectedDeleteUserId = ref(null); // Inicialmente, nenhum gerente está selecionado

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
  cargaHoraria: '',
});

// Atualize o formDataDELETE quando selectedDeleteUserId mudar
watch(selectedDeleteUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataDELETE com os dados do gerente selecionado
    formDataDETELE.value.$id = newUserId.$id;
    formDataDETELE.value.nome = newUserId.nome;
    formDataDETELE.value.sobrenome = newUserId.sobrenome;
    formDataDETELE.value.email = newUserId.email;
    formDataDETELE.value.login = newUserId.login;
    formDataDETELE.value.senha = newUserId.senha;
    formDataDETELE.value.ativo = newUserId.ativo;
    formDataDETELE.value.cargaHoraria = newUserId.cargaHoraria;
  } else {
    // Limpe o formDataDELETE quando nenhum gerente estiver selecionado
    formDataDETELE.value.$id = '';
    formDataDETELE.value.nome = '';
    formDataDETELE.value.sobrenome = '';
    formDataDETELE.value.email = '';
    formDataDETELE.value.login = '';
    formDataDETELE.value.senha = '';
    formDataDETELE.value.ativo = true;
    formDataDETELE.value.cargaHoraria = '';
  }
});
const confirmarExclusao = () => {
  const confirmacao = window.confirm('Tem certeza que deseja apagar este gerente?');

  if (confirmacao) {
    // Chama a função para apagar o gerente
    enviarFormularioDELETE();
  }
}
const enviarFormularioDELETE = () => {
  const gerenteId = selectedDeleteUserId.value; // Obtém o gerente selecionado

  if (!gerenteId || !gerenteId.$id) {
    console.error('Nenhum gerente selecionado para deletar.');
    return;
  }

  // Crie um objeto com os dados do gerente para deletar
  const gerenteParaApagar = {
    $id: gerenteId.$id,
    nome: formDataDETELE.value.nome,
    sobrenome: formDataDETELE.value.sobrenome,
    email: formDataDETELE.value.email,
    login: formDataDETELE.value.login,
    senha: formDataDETELE.value.senha,
    dataCadastro: gerenteId.dataCadastro, // Defina a dataCadastro com base em gerenteId
    ativo: formDataDETELE.value.ativo,
    cargaHoraria: formDataDETELE.value.cargaHoraria,
  };

  // Combine as informações existentes do gerente com as informações do formulário
  const gerenteAtualizado = { ...gerenteId, ...gerenteParaApagar };


  // const gerenteJSON = JSON.stringify(gerenteParaApagar);

  const url = `https://localhost:7127/api/gerente`; // URL para excluir o gerente com base no ID

  axios.delete(url, {
    data: gerenteAtualizado,
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
      formDataDETELE.value.cargaHoraria = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalDELETE'));
      successModal.show();

      // Redefinir o gerente selecionado para vazio após o sucesso
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
              DELETE Gerente
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <form class="row" @submit.prevent="confirmarExclusao">
                <div class="col-12">
                  <label for="inputState" class="form-label">Selecione Gerente</label>
                  <select id="inputState" class="form-select" v-model="selectedDeleteUserId">
                    <option v-for="gerente in gerentes" :key="gerente.$id" :value="gerente">{{ gerente.$id }} | {{ gerente.nome }}</option>
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
                  <label for="inputFirst" class="form-label">Carga Horária</label>
                  <input type="text" class="form-control" id="inputFirst" v-model="formDataDETELE.cargaHoraria"
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