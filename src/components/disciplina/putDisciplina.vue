<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import axios from 'axios';
const { disciplinas } = defineProps(['disciplinas']);

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
      formDataPUT.value.ead = true;

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
</script>

<template>
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
                    <option v-for="disciplina in disciplinas" :key="disciplina.$id" :value="disciplina">{{ disciplina.$id }} | {{ disciplina.nome }}</option>
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
</template>