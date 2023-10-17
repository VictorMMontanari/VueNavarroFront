<script setup>
const props = defineProps(["userId", "gerenteId", "programadorId"]);
</script>

<template>
        <tbody>
            <tr>
                <th scope="row">{{ userId }}</th>
                <td>{{ gerenteId }}</td>
                <td>{{ programadorId }}</td>
            </tr>
        </tbody>
</template>
