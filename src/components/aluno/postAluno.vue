<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

const formData = ref({
    nome: '',
    sobrenome: '',
    email: '',
    login: '',
    senha: '',
    dataCadastro: new Date().toISOString(), // Data atual em formato ISO
    ativo: true,
});

axios.interceptors.request.use((config) => {
    console.log('Dados a serem enviados:', config.data);
    return config;
});

//POST Aluno
const enviarFormulario = () => {
    axios.post('https://localhost:7127/api/aluno', formData.value, {
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
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="false" aria-controls="collapseOne">
                POST Aluno
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
                            <option :value="true">Sim</option>
                            <option :value="false">Não</option>
                        </select>
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
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Fechar"></button>
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