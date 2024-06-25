<template>
  <div class="legal-person-container">
    <button @click="openForm('create')">Cadastrar</button>
    <button @click="openForm('update')">Atualizar</button>
    <button @click="openForm('search')">Pesquisar</button>
    <button @click="openForm('delete')">Deletar</button>

    <div v-if="formType === 'create'" class="modal">
      <form @submit.prevent="submitForm('create')" class="form-content">
        <h2>Cadastrar pessoa jurídica</h2>
        <input type="text" v-model="legalPerson.CorporateReason" placeholder="Razão Social" required />
        <input type="text" v-model="legalPerson.FantasyName" placeholder="Nome Fantasia" required />
        <input type="text" v-model="legalPerson.CNPJ" placeholder="CNPJ" required @input="validateCnpj" />
        <input type="text" v-model="legalPerson.Address" placeholder="Endereço" required />
        <input type="email" v-model="legalPerson.Contact.Email" placeholder="E-mail" required />
        <input type="tel" v-model="legalPerson.Contact.Telephone" placeholder="Telefone" required />
        <button type="submit">Confirmar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="formType === 'update'" class="modal">
      <form @submit.prevent="submitForm('update')" class="form-content">
        <div><br></div>
        <div><br></div>
        <h2>Atualizar pessoa jurídica</h2>
        <input type="text" v-model="updateForm.CNPJ" placeholder="CNPJ" required @input="validateCnpj" />
        <input type="text" v-model="updateForm.CorporateReason" placeholder="Novo Razão Social" />
        <input type="text" v-model="updateForm.FantasyName" placeholder="Novo Nome Fantasia" />
        <input type="text" v-model="updateForm.Address" placeholder="Novo Endereço" />
        <input type="email" v-model="updateForm.Contact.Email" placeholder="Novo E-mail" />
        <input type="tel" v-model="updateForm.Contact.Telephone" placeholder="Novo Telefone" />
        <button type="submit">Confirmar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="formType === 'search'" class="modal">
      <form @submit.prevent="submitForm('search')" class="form-content">
        <h2>Pesquisar pessoa jurídica</h2>
        <input type="text" v-model="searchCnpj" placeholder="CNPJ" required />
        <button type="submit">Buscar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>

    <div v-if="searchedLegalPersonModal && searchedLegalPersonModal.length > 0" class="modal-small">
      <div class="modal-content">
        <h3>Detalhes da Pessoa Juridica</h3>
        <ul>
          <li v-for="person in searchedLegalPersonModal" :key="person.id">
            <strong>Razão Social:</strong> {{ person.razaoSocial }}<br>
            <strong>Nome Fantasia:</strong> {{ person.nomeFantasia || '-' }}<br>
            <strong>CNPJ:</strong> {{ person.cnpj }}<br>
            <strong>Endereço:</strong> {{ person.endereco || '-' }}<br>
            <span v-if="person.contatos && person.contatos.length > 0">
            {{ person.contatos[0].email }}
            </span>
            <strong>Telefone:</strong>
            <span v-if="person.contatos && person.contatos.length > 0">
              {{ person.contatos[0].telefone }}
            </span>
            <span v-else>
              Sem contato
            </span>
          </li>
        </ul>
        <button type="button" @click="closeSearchModal">Fechar</button>
      </div>
    </div>

    <div v-if="formType === 'delete'" class="modal">
      <form @submit.prevent="submitForm('delete')" class="form-content">
        <h2>Deletar pessoa jurídica</h2>
        <input type="text" v-model="deleteCnpj" placeholder="CNPJ" required @input="validateCnpj" />
        <button type="submit">Deletar</button>
        <button type="button" @click="closeForm">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script src="../../js/LegalPersonJs/LegalPersonScript.js"></script>

<style src="../css/PersonStyle.css"></style>