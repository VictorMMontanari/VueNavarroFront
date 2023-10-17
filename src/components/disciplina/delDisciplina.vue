<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
const { disciplinas } = defineProps(['disciplinas']);

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
                    <option v-for="disciplina in disciplinas" :key="disciplina.$id" :value="disciplina">{{ disciplina.$id }} | {{ disciplina.nome }}</option>
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
</template>