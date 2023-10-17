<script setup>
import { ref, computed, onMounted, watch } from 'vue';
const props = defineProps(["userId", "nome", "sobrenome", "email", "login", "senha", "dataCadastro", "ativo"]);

// const searchTerm = ref('');
// // Filtro
// const filteredAlunos = computed(() => {
//     if (!searchTerm.value) {
//         return alunos.value;
//     }

//     const searchId = parseInt(searchTerm.value);
//     return alunos.value.filter(aluno => aluno.userId == searchId);
// });


</script>

<template>
        <tbody>
            <!-- <tr v-for="aluno in filteredAlunos" :key="userId"> -->
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ nome }}</td>
                <td>{{ sobrenome }}</td>
                <td>{{ email }}</td>
                <td>{{ login }}</td>
                <td>{{ senha }}</td>
                <td>{{ dataCadastro }}</td>
                <td>{{ ativo ? 'Sim' : 'Não' }}</td>
            </tr>
        </tbody>
</template>