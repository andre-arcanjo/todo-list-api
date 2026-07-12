## Plano: API Fastify para todo list

Objetivo: criar uma API do zero com Fastify para gerenciar tarefas, com funcionalidades de criar, listar, atualizar, excluir e marcar como concluídas, e depois integrar com o frontend.

### Fase 1 — Preparação do projeto
1. Criar a estrutura inicial do backend com Node.js e Fastify.
2. Definir o formato das tarefas: id, title, description, completed, createdAt, updatedAt.
3. Configurar scripts de execução e ambiente de desenvolvimento.
4. Adicionar dependências básicas: fastify, fastify/cors, dotenv, nodemon e um validador de schema.

### Fase 2 — Estrutura da aplicação
1. Criar a aplicação principal com Fastify.
2. Organizar o projeto em pastas, por exemplo: routes, controllers, services, schemas, utils, config.
3. Configurar rotas para tarefas e preparar a base para expansão futura.
4. Definir uma resposta padrão de sucesso e erro.

### Fase 3 — Implementar os endpoints da API
1. POST /tasks — criar uma nova tarefa.
2. GET /tasks — listar todas as tarefas.
3. GET /tasks/:id — buscar uma tarefa específica.
4. PATCH /tasks/:id — editar uma tarefa.
5. PATCH /tasks/:id/complete — marcar como concluída ou não concluída.
6. DELETE /tasks/:id — remover uma tarefa.

### Fase 4 — Validação e regras de negócio
1. Validar campos obrigatórios, como título.
2. Garantir que o id seja único.
3. Tratar erros de tarefa não encontrada.
4. Definir regras para status de conclusão.
5. Adicionar respostas HTTP corretas, como 201, 200, 404 e 400.

### Fase 5 — Persistência dos dados
1. Começar com armazenamento em memória para acelerar o desenvolvimento.
2. Depois, evoluir para armazenamento persistente, como JSON local ou banco relacional.
3. Se quiser algo mais profissional, usar SQLite com Prisma ou Knex.
4. Manter a camada de serviço isolada para facilitar a troca de armazenamento.

### Fase 6 — Segurança e qualidade
1. Habilitar CORS para o frontend consumir a API.
2. Organizar logs básicos de erro.
3. Adicionar testes de rotas com um framework como Vitest ou Node:test.
4. Criar um README com instruções de execução.

### Fase 7 — Integração com o frontend
1. Definir como o frontend vai consumir a API: fetch ou axios.
2. Implementar chamadas para criar, listar, concluir e deletar tarefas.
3. Tratar feedback visual de loading, erro e sucesso.
4. Garantir que a comunicação entre frontend e backend funcione com o mesmo contrato de dados.

### Fase 8 — Testes finais e melhorias
1. Testar todos os fluxos principais manualmente.
2. Validar se a API responde corretamente em cenários de erro.
3. Ajustar nomes de rotas, payloads e mensagens de resposta.
4. Preparar a API para evoluir com autenticação e filtros depois.

### Recomendação prática
- Para começar rápido, use armazenamento em memória e rotas simples.
- Depois, troque para persistência real para que as tarefas não desapareçam ao reiniciar o servidor.
- Mantenha a API pequena e bem organizada desde o início para facilitar a integração com o frontend.
