<script setup>
import { ref } from 'vue';
import axios from 'axios';
const { gerentes, programadores } = defineProps(['gerentes', 'programadores']);

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
  // console.log('idGerente:', idGerente);
  // console.log('idProgramador:', idProgramador);


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
</script>

<template>
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
                    <option v-for="gerente in gerentes" :key="gerente.userId" :value="gerente">{{ gerente.userId }}  |  {{ gerente.nome }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputState2" class="form-label">Selecione Id do Programador</label>
                  <select id="inputState2" class="form-select" v-model="selectedUserIds.programadorId">
                    <option v-for="programador in programadores" :key="programador.userId" :value="programador">{{ programador.userId }}  |  {{ programador.nome }}</option>
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
</template >