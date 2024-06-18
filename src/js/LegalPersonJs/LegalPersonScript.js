import http from '@/http-common';

export default {
  data() {
    return {
      legalPerson: {
        CorporateReason: '',
        FantasyName: '',
        CNPJ: '',
        Address: '',
        Contact: {
          Email: '',
          Telephone: ''
        }
      },
      updateForm: {
        CNPJ: '',
        CorporateReason: '',
        FantasyName: '',
        Address: '',
        Contact: {
          Email: '',
          Telephone: ''
        }
      },
      searchCnpj: '',
      deleteCnpj: '',
      formType: ''
    };
  },
  methods: {
    async submitForm(action) {
      switch (action) {
        case 'create':
          await this.createLegalPerson();
          break;
        case 'update':
          await this.updateLegalPerson();
          break;
        case 'search':
          await this.searchLegalPerson();
          break;
        case 'delete':
          await this.deleteLegalPerson();
          break;
        default:
          break;
      }
    },
    async createLegalPerson() {
      try {
        const response = await http.post('/api/Pessoas/add-pessoa-juridica', this.legalPerson);
        console.log('Pessoa jurídica criada com sucesso:', response.data);
        this.closeForm();
      } catch (error) {
        console.error('Erro ao criar pessoa jurídica:', error);
        throw error;
      }
    },
    async updateLegalPerson() {
      try {
        const response = await http.put(`/api/Pessoas/update-pessoa-juridica/${this.updateForm.CNPJ}`, this.updateForm);
        console.log('Pessoa jurídica atualizada com sucesso:', response.data);
        this.closeForm();
      } catch (error) {
        console.error('Erro ao atualizar pessoa jurídica:', error);
        throw error;
      }
    },
    async searchLegalPerson() {
      try {
        const response = await http.get(`/api/Pessoas/get-pessoa-juridica/${this.searchCnpj}`);
        console.log('Pessoa jurídica encontrada:', response.data);
      } catch (error) {
        console.error('Erro ao buscar pessoa jurídica:', error);
        throw error;
      }
    },
    async deleteLegalPerson() {
      try {
        const response = await http.delete(`/api/Pessoas/delete-pessoa-juridica/${this.deleteCnpj}`);
        console.log('Pessoa jurídica excluída com sucesso:', response.data);
        this.deleteCnpj = '';
        this.closeForm();
      } catch (error) {
        console.error('Erro ao excluir pessoa jurídica:', error);
        throw error;
      }
    },
    openForm(type) {
      this.formType = type;
    },
    closeForm() {
      this.formType = '';
    }
  }
};