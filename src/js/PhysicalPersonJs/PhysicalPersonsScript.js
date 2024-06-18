import http from '@/http-common';

export default {
  data() {
    return {
      physicalPerson: {
        FullName: '',
        CPF: '',
        DateOfBirth: '',
        Address: '',
        Contact: {
          Telephone: '',
          Email: ''
        }
      },
      updateForm: {
        CPF: '',
        FullName: '',
        DateOfBirth: '',
        Address: '',
        Contact: {
          Telephone: '',
          Email: ''
        }
      },
      searchCpf: '',
      deleteCpf: '',
      searchedPhysicalPerson: null,
      formType: ''
    };
  },
  methods: {
    openForm(type) {
      this.formType = type;
    },
    closeForm() {
      this.formType = '';
      this.resetForms();
    },
    resetForms() {
      this.physicalPerson = {
        FullName: '',
        CPF: '',
        DateOfBirth: '',
        Address: '',
        Contact: {
          Telephone: '',
          Email: ''
        }
      };
      this.updateForm = {
        CPF: '',
        FullName: '',
        DateOfBirth: '',
        Address: '',
        Contact: {
          Telephone: '',
          Email: ''
        }
      };
      this.searchCpf = '';
      this.deleteCpf = '';
      this.searchedPhysicalPerson = null;
    },
    async createPhysicalPerson() {
      try {
        const response = await http.post('https://localhost:7054/api/Pessoas/add-pessoa-fisica', this.physicalPerson);
        console.log('Pessoa física cadastrada com sucesso:', response.data);
        alert('Pessoa física cadastrada com sucesso!');
        this.closeForm();
      } catch (error) {
        console.error('Erro ao cadastrar pessoa física:', error);
        alert('Erro ao cadastrar pessoa física. Verifique o console para mais detalhes.');
      }
    },
    async updatePhysicalPerson() {
      try {
        const response = await http.put(`https://localhost:7054/api/Pessoas/update-pessoa-fisica/${this.updateForm.CPF}`, this.updateForm);
        console.log('Pessoa física atualizada com sucesso:', response.data);
        alert('Pessoa física atualizada com sucesso!');
        this.closeForm();
      } catch (error) {
        console.error('Erro ao atualizar pessoa física:', error);
        alert('Erro ao atualizar pessoa física. Verifique o console para mais detalhes.');
      }
    },
    async searchPhysicalPerson() {
      try {
        const response = await http.get(`https://localhost:7054/api/Pessoas/get-pessoa-fisica/${this.searchCpf}`);
        if (response.data) {
          this.searchedPhysicalPerson = response.data;
        } else {
          alert('Pessoa física não encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar pessoa física:', error);
        alert('Erro ao buscar pessoa física. Verifique o console para mais detalhes.');
      }
    },
    async deletePhysicalPerson() {
      try {
        const response = await http.delete(`https://localhost:7054/api/Pessoas/delete-pessoa-fisica/${this.deleteCpf}`);
        console.log('Pessoa física excluída com sucesso:', response.data);
        alert('Pessoa física excluída com sucesso!');
        this.closeForm();
      } catch (error) {
        console.error('Erro ao excluir pessoa física:', error);
        alert('Erro ao excluir pessoa física. Verifique o console para mais detalhes.');
      }
    }
  }
};