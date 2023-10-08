<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

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
  const idAluno = selectedUserIds.value.alunoId.$id;
  const idDisciplina = selectedUserIds.value.disciplinaId.$id;
  // console.log('idAluno:', idAluno);
  // console.log('idDisciplina:', idDisciplina);


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

//GET Matricula
const matriculas = ref([]);
const searchMat = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/matricula');
    matriculas.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Matricula
const filteredMatriculas = computed(() => {
  if (!searchMat.value) {
    return matriculas.value;
  }

  const searchIdMatricula = parseInt(searchMat.value);
  return matriculas.value.filter(matricula => matricula.$id == searchIdMatricula);
});

//GET Aluno
const alunos = ref([]);
const searchAluno = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7127/api/aluno');
    alunos.value = response.data.$values;
  } catch (error) {
    console.error('Erro na solicitação:', error);
  }
});

// Filtro Aluno
const filteredAlunos = computed(() => {
  if (!searchAluno.value) {
    return alunos.value;
  }

  const searchIdAluno = parseInt(searchAluno.value);
  return alunos.value.filter(aluno => aluno.$id == searchIdAluno);
});

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

// Filtro Disciplina
const filteredDisciplinas = computed(() => {
  if (!searchDisp.value) {
    return disciplinas.value;
  }

  const searchIdDisciplina = parseInt(searchDisp.value);
  return disciplinas.value.filter(disciplina => disciplina.$id == searchIdDisciplina);
});




//PUT Matricula
const selectedUserId = ref(null); // Inicialmente, nenhuma matricula está selecionada

// Crie um objeto formDataPUT para o formulário PUT
const formDataPUT = ref({
  $id: '',
  alunoId: '',
  disciplinaId: '',
});

// Atualize o formDataPUT quando selectedUserId mudar
watch(selectedUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataPUT com os dados da matricula selecionada
    formDataPUT.value.$id = newUserId.$id;
    formDataPUT.value.nome = newUserId.alunoId;
    formDataPUT.value.valor = newUserId.disciplinaId;
  } else {
    // Limpe o formDataPUT quando nenhuma matricula estiver selecionada
    formDataPUT.value.$id = '';
    formDataPUT.value.alunoId = '';
    formDataPUT.value.disciplinaId = '';
  }
});

const enviarFormularioPUT = () => {
  const matriculaId = selectedUserId.value; // Obtém a matricula selecionada

  if (!matriculaId || !matriculaId.$id) {
    console.error('Nenhuma matricula selecionada para atualização.');
    return;
  }

  // Crie um objeto com os dados da matricula para atualização
  const matriculaParaAtualizar = {
    $id: matriculaId.$id,
    nome: formDataPUT.value.alunoId,
    valor: formDataPUT.value.disciplinaId,
  };

  // Combine as informações existentes da matricula com as informações do formulário
  const matriculaAtualizado = { ...matriculaId, ...matriculaParaAtualizar };

  const url = 'https://localhost:7127/api/matricula'; // URL para atualizar a matricula

  axios.put(url, matriculaAtualizado, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataPUT.value.alunoId = '';
      formDataPUT.value.disciplinaId = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalPUT'));
      successModal.show();

      // Redefinir a matricula selecionada para vazio após o sucesso
      selectedUserId.value = null;


    })
    .catch(error => {
      console.error('Erro ao enviar formulário:', error);
    });
};

// DELETE Matricula
const selectedDeleteUserId = ref(null); // Inicialmente, nenhuma matricula está selecionada

// Crie um objeto formDataDELETE para o formulário DELETE
const formDataDETELE = ref({
  $id: '',
  alunoId: '',
  disciplinaId: '',
});

// Atualize o formDataDELETE quando selectedDeleteUserId mudar
watch(selectedDeleteUserId, (newUserId) => {
  if (newUserId) {
    // Preencha o formDataDELETE com os dados da matricula selecionada
    formDataDETELE.value.$id = newUserId.$id;
    formDataDETELE.value.nome = newUserId.alunoId;
    formDataDETELE.value.valor = newUserId.disciplinaId;
  } else {
    // Limpe o formDataDELETE quando nenhuma matricula estiver selecionada
    formDataDETELE.value.$id = '';
    formDataDETELE.value.alunoId = '';
    formDataDETELE.value.disciplinaId = '';
  }
});
const confirmarExclusao = () => {
  const confirmacao = window.confirm('Tem certeza que deseja apagar esta matrícula?');

  if (confirmacao) {
    // Chama a função para apagar a matricula
    enviarFormularioDELETE();
  }
}
const enviarFormularioDELETE = () => {
  const matriculaId = selectedDeleteUserId.value; // Obtém a matricula selecionada

  if (!matriculaId || !matriculaId.$id) {
    console.error('Nenhuma matricula selecionada para deletar.');
    return;
  }

  // Crie um objeto com os dados da matricula para deletar
  const matriculaParaApagar = {
    $id: matriculaId.$id,
    nome: formDataDETELE.value.alunoId,
    valor: formDataDETELE.value.disciplinaId,
  };

  // Combine as informações existentes da matricula com as informações do formulário
  const matriculaAtualizado = { ...matriculaId, ...matriculaParaApagar };


  // const matriculasJSON = JSON.stringify(matriculaParaApagar);

  const url = `https://localhost:7127/api/matricula`; // URL para excluir a matricula com base no ID

  axios.delete(url, {
    data: matriculaAtualizado,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Resposta da API:', response.data);

      // Limpar o formulário
      formDataDETELE.value.alunoId = '';
      formDataDETELE.value.disciplinaId = '';

      // Exibir o modal de sucesso
      const successModal = new bootstrap.Modal(document.getElementById('successModalDELETE'));
      successModal.show();

      // Redefinir a matricula selecionada para vazio após o sucesso
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
              POST Matrícula
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form class="row" @submit.prevent="enviarFormulario">

                <div class="col-12">
                  <label for="inputState1" class="form-label">Selecione Id do Aluno</label>
                  <select id="inputState1" class="form-select" v-model="selectedUserIds.alunoId">
                    <option v-for="aluno in filteredAlunos" :key="aluno.$id" :value="aluno">{{ aluno.$id }}  |  {{ aluno.nome }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputState2" class="form-label">Selecione Id da Disciplina</label>
                  <select id="inputState2" class="form-select" v-model="selectedUserIds.disciplinaId">
                    <option v-for="disciplina in filteredDisciplinas" :key="disciplina.$id" :value="disciplina">{{ disciplina.$id }}  |  {{ disciplina.nome }}</option>
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


        <!-- GET -->
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              GET Matrícula
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <div class="input-group input-group-sm mb-3">
                <input type="text" class="form-control" v-model="searchMat" placeholder="Pesquisa por Id" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Aluno Id</th>
                    <th scope="col">Disciplina Id</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="matricula in filteredMatriculas" :key="matricula.$id">
                    <th scope="row">{{ matricula.$id }}</th>
                    <td>{{ matricula.alunoId }}</td>
                    <td>{{ matricula.disciplinaId }}</td>
                  </tr>
                </tbody>
              </table>

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