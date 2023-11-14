<script setup>
const props = defineProps(["userId", "gerenteNome", "programadorNome"]);
</script>

<template>
    <tbody>
        <tr>
            <th scope="row">{{ userId }}</th>
            <td>{{ gerenteNome }}</td>
            <td>{{ programadorNome }}</td>
        </tr>
    </tbody>
</template>