<script setup>
const props = defineProps(["userId", "nome", "sobrenome", "email", "login", "senha", "dataCadastro", "ativo", "nivelAtuacao"]);

</script>

<template>
        <tbody>
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ nome }}</td>
                <td>{{ sobrenome }}</td>
                <td>{{ email }}</td>
                <td>{{ login }}</td>
                <td>{{ senha }}</td>
                <td>{{ dataCadastro }}</td>
                <td>{{ ativo ? 'Sim' : 'Não' }}</td>
                <td>{{ nivelAtuacao }}</td>
            </tr>
        </tbody>
</template>