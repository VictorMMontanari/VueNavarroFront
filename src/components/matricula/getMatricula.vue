<script setup>
const props = defineProps(["userId", "alunoNome", "disciplinaNome"]);
</script>

<template>
        <tbody>
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ alunoNome }}</td>
                <td>{{ disciplinaNome }}</td>
            </tr>
        </tbody>
</template>
