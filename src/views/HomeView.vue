<script setup>

</script>

<template>
  <main class="principal">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center" style="margin-top: 2rem;">
        <div class="card" style="width: 60rem;">
          <div class="card-body">
            <div class="container px-4 text-center">
              <div class="row gx-5">
                <div class="col-md-4 col-12">

                  <div class="p-3">
                    <router-link to="/aluno" class="nav-link">
                      <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
                        <div class="card-header">Aluno</div>
                        <div class="card-body">
                          <h5 class="card-title">CRUD Aluno</h5>
                          <p class="card-text">Clique neste Card para acessar o Aluno</p>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>

                <div class="col-md-4 col-12">
                  <div class="p-3">
                    <router-link to="/disciplina" class="nav-link">
                      <div class="card text-bg-secondary mb-3" style="max-width: 18rem;">
                        <div class="card-header">Disciplina</div>
                        <div class="card-body">
                          <h5 class="card-title">CRUD Disciplina</h5>
                          <p class="card-text">Clique neste Card para acessar o Disciplina</p>
                        </div>
                      </div>
                    </router-link>

                  </div>
                </div>

                <div class="col-md-4 col-12">
                  <div class="p-3">
                    <router-link to="/matricula" class="nav-link">
                    <div class="card text-bg-success mb-3" style="max-width: 18rem;">
                      <div class="card-header">Matrícula</div>
                      <div class="card-body">
                        <h5 class="card-title">CRUD Matrícula</h5>
                        <p class="card-text">Clique neste Card para acessar o Matrícula</p>
                      </div>
                    </div>
                  </router-link>
                  </div>
                </div>
              </div>

              <div class="row gx-5">
                <div class="col-md-4 col-12">
                  <div class="p-3">
                    <router-link to="/gerente" class="nav-link">
                    <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
                      <div class="card-header">Gerente</div>
                      <div class="card-body">
                        <h5 class="card-title">CRUD Gerente</h5>
                        <p class="card-text">Clique neste Card para acessar Gerente</p>
                      </div>
                    </div>
                  </router-link>
                  </div>
                </div>

                <div class="col-md-4 col-12">
                  <div class="p-3">
                    <router-link to="/programador" class="nav-link">
                    <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
                      <div class="card-header"> Programador </div>
                      <div class="card-body">
                        <h5 class="card-title">CRUD Programador</h5>
                        <p class="card-text">Clique neste Card para acessar o Programador</p>
                      </div>
                    </div>
                  </router-link>
                  </div>
                </div>

                <div class="col-md-4 col-12">
                  <div class="p-3">

                    <div class="card text-bg-info mb-3" style="max-width: 18rem;">
                      <div class="card-header">ProjetoTI</div>
                      <div class="card-body">
                        <h5 class="card-title">ProjetoTI</h5>
                        <p class="card-text">Clique neste Card para acessar ProjetoTI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
