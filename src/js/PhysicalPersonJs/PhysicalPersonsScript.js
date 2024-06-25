import http from '@/http-common';

export default {
  data() {
    return {
      physicalPerson: {
        FullName: '',
        CPF: '',
        DateOfBirth: '',
        Address: '',
        contatos: [
          {
            Telephone: '',
            Email: ''
          }
        ]
      },
      updateForm: {
        FullName: '',
        CPF: '',
        DateOfBirth: '',
        Address: '',
        contatos: [
          {
            Telefone: '',
            Email: ''
          }
        ]
      },
      searchCpf: '' ,
      deleteCpf: '',
      formType: 'search',
      searchedPhysicalPerson: null,
      searchedPhysicalPersonModal: null,
    };
  },
  methods: {
    openForm(type) {
      this.formType = type;
    },
    formatarCPF(cpf) {
      return cpf.replace(/[^\d]/g, '');
    },
    validateCPF(cpf) {
      cpf = cpf.replace(/\D/g, '');
      return cpf.length === 11;
    },
    formatarCampo(objeto, campo, mascara) {
      if (objeto[campo] === null || objeto[campo] === undefined) {
        objeto[campo] = '';
      }
    
      let valorFormatado = objeto[campo].replace(/[^\d]/g, '');
    
      if (campo === 'telefone') {
        let telefoneFormatado = '';
        let j = 0;
    
        for (let i = 0; i < mascara.length; i++) {
          if (mascara[i] === '#') {
            if (j < valorFormatado.length) {
              telefoneFormatado += valorFormatado[j];
              j++;
            } else {
              break; 
            }
          } else {
            telefoneFormatado += mascara[i];
          }
        }
    
        objeto[campo] = telefoneFormatado;
      }
    
      if (campo === 'CPF') {
        let cpfFormatado = '';
    
        for (let i = 0; i < mascara.length; i++) {
          if (mascara[i] === '#') {
            if (valorFormatado.length > 0) {
              cpfFormatado += valorFormatado[0];
              valorFormatado = valorFormatado.slice(1);
            } else {
              break;
            }
          } else {
            cpfFormatado += mascara[i];
          }
        }
    
        objeto[campo] = cpfFormatado;
      }
    },
    async submitForm(type) {
      switch (type) {
        case 'create':
          await this.createPhysicalPerson();
          break;
        case 'update':
          await this.updatePhysicalPerson();
          break;
        case 'search':
          await this.searchPhysicalPerson();
          break;
        case 'delete':
          await this.deletePhysicalPerson();
          break;
      }
    },
    async createPhysicalPerson() {
      if (!this.validateCPF(this.physicalPerson.CPF)) {
        alert('CPF inválido Smith');
        return;
      }

      const formattedDateOfBirth = new Date(this.physicalPerson.DateOfBirth).toISOString();

      const requestBody = {
        nomeCompleto: this.physicalPerson.FullName,
        cpf: this.formatarCPF(this.physicalPerson.CPF),
        dataDeNascimento: formattedDateOfBirth,
        endereco: this.physicalPerson.Address,
        contatos: [
          {
            id: 0,
            telefone: this.physicalPerson.contatos.Telephone,
            email: this.physicalPerson.contatos.Email
          }
        ]
      };
    
      try {
        console.log('Dados enviados:', requestBody);
    
        const response = await http.post('/add-pessoa-fisica', requestBody);
        console.log('Pessoa física cadastrada com sucesso:', response.data);
        alert('Pessoa física cadastrada com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar pessoa física:', error);
        alert('Erro ao cadastrar pessoa física.');
      }
    },
    async updatePhysicalPerson() {
      if (!this.updateForm.CPF || !this.validateCPF(this.updateForm.CPF)) {
        alert('CPF inválido ou não fornecido');
        return;
      }
      
      let cpfFormatado = this.formatarCPF(this.updateForm.CPF)

      let formattedDateOfBirth = '';
      if (this.updateForm.DateOfBirth) {
        formattedDateOfBirth = new Date(this.updateForm.DateOfBirth).toISOString();
      } else {
        formattedDateOfBirth = new Date(0).toISOString();
      }

      let email = '';
      let telefone = '';
      if (this.updateForm.contatos) {
        email = this.updateForm.contatos.Email || 'teste@teste.com';
        telefone = this.updateForm.contatos.Telephone || '00000000000';
      }

      const requestBody = {
        nomeCompleto: this.updateForm.FullName || '',
        cpf: cpfFormatado,
        dataDeNascimento: formattedDateOfBirth,
        endereco: this.updateForm.Address || 'teste',
        contatos: [
          {
            email,
            telefone
          }
        ]
      };
    
      try {
        console.log('Dados enviados:', requestBody);
    
        const response = await http.put(`/update-pessoa-fisica/${cpfFormatado}`, requestBody);
        console.log('Pessoa física atualizada com sucesso:', response.data);
        alert('Pessoa física atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar pessoa física:', error);
        alert('Erro ao atualizar pessoa física.');
      }
    },
    async searchPhysicalPerson() {
      try {
        let response;

        if (this.searchCpf) {
          const cpf = this.formatarCPF(this.searchCpf);
          response = await http.get(`/get-pessoa-fisica/${cpf}`);
        } else {
          response = await http.get('/get-pessoas');
        }

        if (response.status === 200) {
          if (response.data && response.data.length > 0) {
            this.searchedPhysicalPersonModal = response.data;
            this.formType = 'info';
            this.$nextTick(() => { 
            this.openSearchModal();
          });
          } else {
            alert('Pessoa física não encontrada.');
          }
        } else {
          alert('Erro ao buscar pessoa física.');
        }
      } catch (error) {
        console.error('Erro ao buscar pessoa física:', error);
        alert('Erro ao buscar pessoa física');
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
        this.searchedPhysicalPersonModal = null;
      } else {
        console.error('.modal-small não encontrado.');
      }
    },
    async deletePhysicalPerson() {
      try {
        const cpf = this.formatarCPF(this.deleteCpf);
        const response = await http.delete(`/delete-pessoa-fisica/${cpf}`);
        console.log('Pessoa física excluída com sucesso:', response.data);
        alert('Pessoa física excluída com sucesso!');
      } catch (error) {
        alert('Erro ao excluir pessoa física.');
      }
    }
  }
};
