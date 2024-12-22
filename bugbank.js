<reference types="cypress" />

const bugbank = require('../../feature/bugbank.json');

describe('Cadastro', () => {
  it('CD.1: Cadastro com e-mail inválido', () => {
    cy.visit('http://bugbank.netlify.app');
    cy.contains('Registrar').click();
    cy.get('input[name="email"]').type('email_errado.com');
    cy.contains('Formato inválido').should('be.visible');
  });

  it('CD.2: Cadastro com e-mail válido', () => {
    cy.visit('http://bugbank.netlify.app');
    cy.contains('Registrar').click();
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="name"]').type('Teste Usuário');
    cy.get('input[name="password"]').type('senha123');
    cy.get('input[name="confirmPassword"]').type('senha123');
    cy.get('input[type="checkbox"]').check(); // Criar conta com saldo
    cy.contains('Cadastrar').click();
    cy.contains('Usuário cadastrado com sucesso!').should('be.visible');
  });
});

describe('Login', () => {
  it('LG.1: Login com e-mail inválido', () => {
    cy.visit('http://bugbank.netlify.app');
    cy.get('input[name="email"]').type('email_errado.com');
    cy.contains('Formato inválido').should('be.visible');
  });

  it('LG.2: Login com e-mail/senha não cadastrados', () => {
    cy.visit('http://bugbank.netlify.app');
    cy.get('input[name="email"]').type('naoexiste@test.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('Acessar').click();
    cy.contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!').should('be.visible');
  });

  it('LG.3: Login com usuário/senha válidos', () => {
    cy.visit('http://bugbank.netlify.app');
    cy.get('input[name="email"]').type('test@test.com'); // E-mail cadastrado no teste de cadastro
    cy.get('input[name="password"]').type('senha123');
    cy.contains('Acessar').click();
    cy.contains('Bem-vindo').should('be.visible');
    cy.contains('test@test.com').should('be.visible'); // Verifica o nome do usuário
    cy.contains('Conta:').should('be.visible'); // Verifica a conta correta
  });
});

describe('Transferências', () => {
  before(() => {
    // Realizar login antes dos testes de transferência
    cy.visit('http://bugbank.netlify.app');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('Acessar').click();
  });

  it('TR.1: Transferência com sucesso', () => {
    cy.contains('Transferências').click();
    cy.get('input[name="destino"]').type('destinatario@test.com');
    cy.get('input[name="valor"]').type('100');
    cy.contains('Transferir').click();
    cy.contains('Transferência realizada com sucesso!').should('be.visible');
    cy.contains('Saldo disponível: R$').should('be.visible'); // Verifica o saldo após a transferência
  });

  it('TR.2: Transferência com saldo insuficiente', () => {
    cy.contains('Transferências').click();
    cy.get('input[name="destino"]').type('destinatario@test.com');
    cy.get('input[name="valor"]').type('1000000'); // Valor alto para saldo insuficiente
    cy.contains('Transferir').click();
    cy.contains('Saldo insuficiente para realizar a transferência.').should('be.visible');
  });
});

describe('Extrato', () => {
  before(() => {
    // Realizar login antes dos testes de extrato
    cy.visit('http://bugbank.netlify.app');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('senha123');
    cy.contains('Acessar').click();
  });

  it('EX.1: Verificar transações no extrato', () => {
    cy.contains('Extrato').click();
    cy.contains('Transferência enviada para destinatario@test.com').should('be.visible');
    cy.contains('R$ 100,00').should('be.visible'); // Verifica o valor da transferência
  });

  it('EX.2: Ordenação de transações', () => {
    cy.contains('Extrato').click();
    cy.get('th').contains('Data').click(); // Ordena por data
    cy.get('table tbody tr').then((rows) => {
      const dates = Array.from(rows).map((row) =>
        new Date(row.querySelector('td[data-cy="data"]').textContent)
      );
      const isSorted = dates.every((val, i, arr) => !i || arr[i - 1] <= val);
      expect(isSorted).to.be.true; // Verifica se está ordenado
    });
  });

  it('EX.3: Filtrar transações', () => {
    cy.contains('Extrato').click();
    cy.get('input[name="filtro"]').type('Transferência');
    cy.contains('Transferência enviada para destinatario@test.com').should('be.visible');
  });
});
