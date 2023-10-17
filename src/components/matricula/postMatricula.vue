<script setup>
import { ref } from 'vue';
import axios from 'axios';
const { alunos, disciplinas } = defineProps(['alunos', 'disciplinas']);

const formData = ref({
  alunoId: '',
  disciplinaId: '',
  data: new Date().toISOString(), // Data atual em formato ISO
});

const selectedUserIds = ref({
  alunoId: '',
  disciplinaId: '',
})

axios.interceptors.request.use((config) => {
  console.log('Dados a serem enviados:', config.data);
  return config;
});

//Post Matricula
const enviarFormulario = () => {
  const idAluno = selectedUserIds.value.alunoId.userId;
  const idDisciplina = selectedUserIds.value.disciplinaId.$id;
  console.log('idAluno:', idAluno);
  console.log('idDisciplina:', idDisciplina);


  axios.post(`https://localhost:7127/api/matricula?idAluno=${idAluno}&idDisciplina=${idDisciplina}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formData.value.alunoId = '';
      formData.value.disciplinaId = '';

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
              POST Matrícula
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form class="row" @submit.prevent="enviarFormulario">

                <div class="col-12">
                  <label for="inputState1" class="form-label">Selecione Id do Aluno</label>
                  <select id="inputState1" class="form-select" v-model="selectedUserIds.alunoId">
                    <option v-for="aluno in alunos" :key="aluno.userId" :value="aluno">{{ aluno.userId }}  |  {{ aluno.nome }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputState2" class="form-label">Selecione Id da Disciplina</label>
                  <select id="inputState2" class="form-select" v-model="selectedUserIds.disciplinaId">
                    <option v-for="disciplina in disciplinas" :key="disciplina.userId" :value="disciplina">{{ disciplina.userId }}  |  {{ disciplina.nome }}</option>
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