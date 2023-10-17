<script setup>
const props = defineProps(["userId", "alunoId", "disciplinaId"]);
</script>

<template>
        <tbody>
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ alunoId }}</td>
                <td>{{ disciplinaId }}</td>
            </tr>
        </tbody>
</template>
