<template>
  <div class="physical-person-container">
    <button @click="openForm('create')">Cadastrar</button>
    <button @click="openForm('update')">Atualizar</button>
    <button @click="openForm('search')">Pesquisar</button>
    <button @click="openForm('delete')">Deletar</button>

    <div v-if="formType === 'create'" class="modal">
      <form @submit.prevent="submitForm('create')" class="form-content">
        <h2>Cadastrar Pessoa Física</h2>
        <input type="text" v-model="physicalPerson.FullName" placeholder="Nome completo" required />
        <input type="text" v-model="physicalPerson.CPF" @input="formatarCampo(physicalPerson, 'CPF', '###.###.###-##')" placeholder="CPF" required />
        <input type="date" v-model="physicalPerson.DateOfBirth" placeholder="Data de nascimento" required />
        <input type="text" v-model="physicalPerson.Address" placeholder="Endereço" required />
        <input type="tel" v-model="physicalPerson.contatos.Telephone" @input="formatarCampo(physicalPerson.contatos, 'Telephone', '##-#####-####')" placeholder="Telefone" required />
        <input type="email" v-model="physicalPerson.contatos.Email" placeholder="E-mail" required />
        <button type="submit">Confirmar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="formType === 'update'" class="modal">
      <form @submit.prevent="submitForm('update')" class="form-content">
        <h2>Atualizar Pessoa Física</h2>
        <input type="text" v-model="updateForm.CPF" @input="formatarCampo(updateForm, 'CPF', '###.###.###-##')" placeholder="CPF" required />
        <div><br></div>
        <div><br></div>
        <input type="text" v-model="updateForm.FullName" placeholder="Novo nome completo" />
        <input type="date" v-model="updateForm.DateOfBirth" placeholder="Nova data de nascimento" />
        <input type="text" v-model="updateForm.Address" placeholder="Novo endereço" />
        <input type="tel" v-model="updateForm.contatos.Telephone" @input="formatarCampo(updateForm.contatos, 'Telefone', '##-#####-####')" placeholder="Novo telefone"/>
        <input type="email" v-model="updateForm.contatos.Email" placeholder="Novo e-mail" />
        <button type="submit">Confirmar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="formType === 'search'" class="modal">
      <form @submit.prevent="searchPhysicalPerson" class="form-content">
        <h2>Pesquisar Pessoa Física</h2>
        <input type="text" v-model="searchCpf" placeholder="CPF" />
        <button type="submit">Buscar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="searchedPhysicalPersonModal && searchedPhysicalPersonModal.length > 0" class="modal-small">
      <div class="modal-content">
        <h3>Detalhes da Pessoa Física</h3>
        <ul>
          <li v-for="person in searchedPhysicalPersonModal" :key="person.id">
            <strong>Nome Completo:</strong> {{ person.nomeCompleto }}<br>
            <strong>CPF:</strong> {{ person.cpf }}<br>
            <strong>Data de Nascimento:</strong> {{ person.dataDeNascimento }}<br>
            <strong>Endereço:</strong> {{ person.endereco }}<br>
            <strong>Contato:</strong> 
            <span v-if="person.contatos.length > 0">
              {{ person.contatos[0].telefone }} / {{ person.contatos[0].email }}
            </span>
            <span v-else>Sem contato</span>
          </li>
        </ul>
        <button type="button" @click="closeSearchModal">Fechar</button>
      </div>
    </div>

    <div v-if="formType === 'delete'" class="modal">
      <form @submit.prevent="submitForm('delete')" class="form-content">
        <h2>Deletar Pessoa Física</h2>
        <input type="text" v-model="deleteCpf" placeholder="CPF" />
        <button type="submit">Deletar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>
  </div>
</template>


<script src="../../js/PhysicalPersonJs/PhysicalPersonsScript.js"></script>

<style src="../css/PersonStyle.css"></style>