Etapa 1 - Projeto de Testes E2E - BugBank - Analista de Testes 

Este repositório contém os testes end-to-end (E2E) automatizados para a aplicação BugBank.

## Tecnologias Utilizadas
- **Cypress** para automação de testes E2E.
- **JavaScript** como linguagem principal.

## Estrutura do Projeto
- **Ferramenta utilizada:** [Cypress](https://www.cypress.io/)
- **Linguagem:** JavaScript
- **Casos de Testes Implementados:**
  - Cadastro:
    - Cadastro com e-mail inválido
    - Cadastro com e-mail válido
  - Login:
    - Login com e-mail inválido
    - Login com usuário não cadastrado
    - Login com usuário e senha válidos
  - Transferências:
    - Transferência com sucesso
    - Transferência com saldo insuficiente
  - Extrato:
    - Verificar transações no extrato
    - Ordenação de transações
    - Filtro no extrato

## Pré-requisitos
Certifique-se de ter o seguinte instalado:
- [Node.js](https://nodejs.org/) (v16 ou superior)
- Gerenciador de pacotes: `npm` ou `yarn`

## Configuração do Projeto
1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd bugbank-tests
