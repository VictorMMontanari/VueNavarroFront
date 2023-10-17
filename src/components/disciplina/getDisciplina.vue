<script setup>
const props = defineProps(["userId", "nome", "valor", "disponivel", "ead"]);
</script>

<template>
        <tbody>
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ nome }}</td>
                <td>{{ valor }}</td>
                <td>{{ disponivel ? 'Sim' : 'Não' }}</td>
                <td>{{ ead ? 'Sim' : 'Não' }}</td>
            </tr>
        </tbody>
</template>
