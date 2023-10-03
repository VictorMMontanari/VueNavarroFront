<script setup>
import { ref } from 'vue';
</script>

<template>
  <header class="cabecalho">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">DDD</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="main">
    <RouterView></RouterView>
  </div>  
</template>

<style>

</style>
