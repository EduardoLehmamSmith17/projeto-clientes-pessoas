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
      searchedLegalPersonModal: null,
      formType: 'search'
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
        if (!this.validateCNPJ(this.legalPerson.CNPJ)) {
          alert('CNPJ inválido');
          return;
        }

        const requestBody = {
          razaoSocial: this.legalPerson.CorporateReason,
          cnpj: this.legalPerson.CNPJ,
          nomeFantasia: this.legalPerson.FantasyName,
          endereco: this.legalPerson.Address,
          contatos: [
            {
              id: 0,
              telefone: this.legalPerson.Contact.Telephone,
              email: this.legalPerson.Contact.Email
            }
          ]
        };
    
        console.log('Dados enviados:', requestBody);
    
        const response = await http.post('/add-pessoa-juridica', requestBody);
        console.log('Pessoa jurídica criada com sucesso:', response.data);
        alert('Pessoa jurídica criada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar pessoa jurídica:', error);
        alert('Erro ao criar pessoa jurídica.');
        throw error;
      }
    },
    async updateLegalPerson() {
      if (!this.updateForm.CNPJ || !this.validateCNPJ(this.updateForm.CNPJ)) {
        alert('CNPJ inválido ou não fornecido');
        return;
      }
      
      const requestBody = {
        razaoSocial: this.updateForm.CorporateReason || '',
        cnpj: this.legalPerson.CNPJ,
        nomeFantasia: this.updateForm.FantasyName || '',
        endereco: this.updateForm.Address || 'teste',
        contatos: [
          {
            id: 0,
            email: this.updateForm.Contact.Email || 'teste@teste.com',
            telefone: this.updateForm.Contact.Telephone || '00000000000'
          }
        ]
      };
    
      try {
        console.log('Dados enviados:', requestBody);
    
        const response = await http.put(`/update-pessoa-juridica/${this.legalPerson.CNPJ}`, requestBody);
        console.log('Pessoa jurídica atualizada com sucesso:', response.data);
        alert('Pessoa jurídica atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar pessoa jurídica:', error);
        alert('Erro ao atualizar pessoa jurídica.');
      }
    },
    async searchLegalPerson() {
      try {
        const response = await http.get(`/get-pessoa-juridica/${this.searchCnpj}`);
        
        if (response.status === 200) {
          if (response.data) {
            this.searchedLegalPersonModal = response.data;
            this.formType = 'info';
            this.$nextTick(() => { 
              this.openSearchModal();
            });
          } else {
            alert('Pessoa jurídica não encontrada.');
          }
        } else {
          alert('Erro ao buscar pessoa jurídica.');
        }
      } catch (error) {
        console.error('Erro ao buscar pessoa jurídica:', error);
        alert('Erro ao buscar pessoa jurídica.');
      }
    },
    openSearchModal() {
      const modal = document.querySelector('.modal-small');
      if (modal) {
        modal.style.display = 'block';
      } else {
        console.error('.modal-small não encontrado.');
      }
    },
    closeSearchModal() {
      const modal = document.querySelector('.modal-small');
      if (modal) {
        modal.style.display = 'none';
        this.formType = 'search';
        this.searchedLegalPersonModal = null; 
      } else {
        console.error('.modal-small não encontrado.');
      }
    },
    async deleteLegalPerson() {
      try {
        const response = await http.delete(`/delete-pessoa-juridica/${this.deleteCnpj}`);
        
        if (response.status === 200) {
          console.log('Pessoa jurídica excluída com sucesso:', response.data);
          alert('Pessoa jurídica excluída com sucesso!');
        } else {
          alert('Erro ao excluir pessoa jurídica.');
        }
      } catch (error) {
        console.error('Erro ao excluir pessoa jurídica:', error);
        alert('Erro ao excluir pessoa jurídica.');
      }
    },
    openForm(type) {
      this.formType = type;
    },
    closeForm() {
      this.formType = '';
    },
    closeModal() {
      this.showLegalPersonModal = false;
    },
    validateCNPJ(cnpj) {
      const cleanedCNPJ = cnpj.replace(/\D/g, '');
    
      if (cleanedCNPJ.length !== 14) {
        return false;
      }
    
      return true;
    },
    formatarCNPJ(cpf) {
      return cpf.replace(/[^\d]/g, '');
    }
  }
};