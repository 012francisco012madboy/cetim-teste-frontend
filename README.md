# Dashboard de Catálogo de Produtos

Aplicação web responsiva para consulta e exploração de um catálogo de produtos, consumindo a API pública [DummyJSON](https://dummyjson.com/products). Permite pesquisar, filtrar por categoria, navegar pelos produtos, consultar detalhes e marcar favoritos.

**Aplicação em produção:** https://cetim-teste-frontend.netlify.app/
**Repositório:** https://github.com/arielfrancisco01/cetim-teste-frontend.git

---

## Tecnologias e bibliotecas utilizadas

- **React 18 + TypeScript + Vite** — base do projeto
- **Tailwind CSS** — estilização
- **shadcn/ui** — biblioteca de componentes (Card, Badge, InputGroup, Item, DropdownMenu, Button, etc.)
- **Lucide Icons** e **@ant-design/icons** — ícones
- **Axios** — comunicação com a API
- **TanStack Query (React Query)** — cache, sincronização e gestão de estado assíncrono das chamadas à API
- **React Router** — navegação entre a página inicial e a página de detalhe do produto
- **Context API** — estado global partilhado (pesquisa, categoria, página, favoritos)
- **Vitest + React Testing Library** — testes automatizados
- **Docker + Nginx** — containerização e serving em produção

---

## Como executar sem Docker

Pré-requisitos: Node.js 20+ e npm instalados.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar o build de produção localmente
npm run preview
```

A aplicação fica disponível em `http://localhost:5173` (modo dev) ou na porta indicada pelo `npm run preview`.

---

## Como executar com Docker

Pré-requisitos: Docker Desktop instalado e em execução.

```bash
docker compose up
```

Isto constrói a imagem (build multi-stage: Node para compilar o projeto, Nginx para servir os ficheiros estáticos finais) e sobe o container. A aplicação fica disponível em:

```
http://localhost:8080
```

Para rodar em segundo plano:
```bash
docker compose up -d
```

Para desligar:
```bash
docker compose down
```

Para reconstruir a imagem do zero (após alterações no Dockerfile ou dependências):
```bash
docker compose up --build
```

---

## Comandos para executar os testes

```bash
# roda todos os testes uma vez
npm run test

# roda todos os testes em modo watch (reroda a cada alteração)
npm run test:watch

# roda um ficheiro de teste específico
npx vitest run src/test/product-grid.test.tsx

# roda um teste específico dentro de um ficheiro, filtrando pelo nome
npx vitest run src/test/product.test.tsx -t "mostra o skeleton enquanto carrega"
```

Testes implementados, cobrindo estados de sucesso, carregamento e vazio/erro:
- `ProductGrid` — grelha de produtos
- `Product` (página de detalhe do produto)

---

## Estrutura resumida do projeto

```
src/
├── components/         # componentes reutilizáveis de UI (shadcn/ui e afins)
├── context/            # GlobalContext e GlobalProvider (estado partilhado)
├── features/product/   # componentes da feature de produtos (ProductCard, ProductGrid, ProductEach, etc.)
├── hooks/              # hooks customizados (useProducts, useProduct, useDebouncedValue)
├── interface/          # tipos TypeScript (Product, ProductsResponse, etc.)
├── lib/                # utilitários e configuração de bibliotecas (shadcn/ui)
├── pages/              # páginas de rota (Index, Product, 404)
├── router/             # definição das rotas (react-router)
├── services/           # comunicação com a API (productsService, api.ts)
├── test/               # testes automatizados
├── index.css           # estilos globais e configuração do Tailwind CSS
└── main.tsx            # ponto de entrada, providers globais (QueryClientProvider, ThemeProvider, GlobalProvider)
```

---

## Decisões de arquitetura

- **Comunicação com a API centralizada**: uma instância axios (`api.ts`) e funções exportadas diretamente (`getProducts`, `getProductById`, `getCategories`) num único `productsService.ts`.

- **Listagem e pesquisa unificadas**: em vez de duas rotas/funções separadas, a pesquisa é resolvida dinamicamente — quando há texto no campo de busca, a chamada vai para `/products/search`; quando vazio, cai em `/products` ou `/products/category/:categoria`. Isso permite que a lista atualize automaticamente enquanto o utilizador digita e volte a mostrar todos os produtos ao apagar o campo.

- **Estado global via Context API**: um único `GlobalContext`/`GlobalProvider` concentra `search`, `category`, `page` e a lógica de favoritos, evitando prop-drilling entre componentes irmãos (SearchFilter, CategoryFilter, ProductGrid) sem introduzir uma lib de estado externa.

- **TanStack Query** para chamadas de dados: substitui a gestão manual de `isLoading`/`error`/`useEffect`, adicionando cache automático e retry configurável — cobrindo também o requisito de tratamento de falhas de rede.

- **Favoritos persistidos em `localStorage`**, guardando os IDs dos produtos favoritados. A listagem/filtro exclusivo de favoritos não foi implementado, já que o enunciado pede apenas marcar, desmarcar e persistir.

- **Paginação tradicional** (Anterior/Próxima) em vez de scroll infinito.

- **Lazy loading por rota**: `Index`, `Product` e a página 404 são carregadas via `React.lazy`, reduzindo o tamanho do bundle inicial.

- **Docker multi-stage**: um estágio Node compila o projeto, e a imagem final usa apenas Nginx + os ficheiros estáticos gerados, mantendo a imagem final leve.

- **Responsividade mobile-first via breakpoints do Tailwind** (`sm`, `md`, `lg`): classes sem prefixo aplicam-se ao ecrã menor por padrão, e os prefixos sobrepõem a partir de cada breakpoint — a mesma estratégia mobile-first pedida no enunciado. Os valores padrão do Tailwind (`sm`: 640px, `md`: 768px, `lg`: 1024px) aproximam-se dos pontos de referência pedidos (375px, 768px, 1200px).

---

## Funcionalidades implementadas

- Listagem de produtos em grelha responsiva de cards (imagem, nome, preço, categoria)
- Paginação
- Pesquisa por nome/descrição, com debounce (300–500ms) e atualização automática dos resultados
- Filtro por categoria, com opção de limpar o filtro
- Página de detalhe do produto (imagem, título, descrição, preço, categoria, rating, stock)
- Marcar/desmarcar produtos como favoritos, persistidos em `localStorage`
- Estados de interface: skeleton durante carregamento, empty state para ausência de resultados, mensagens amigáveis para erros da API
- Acessibilidade: HTML semântico, `aria-label`/`aria-pressed` em toggles e botões de ícone, `aria-live` em regiões dinâmicas (paginação, skeleton), navegação e foco por teclado
- Tema claro/escuro
- Responsividade mobile-first (375px, 768px, 1200px+), incluindo scroll horizontal com setas para as categorias em ecrãs pequenos

---

## Mini Manual do Utilizador

1. **Explorar produtos**: ao abrir a aplicação, a listagem de produtos é carregada automaticamente, com paginação no final da grelha.

2. **Pesquisar**: digite no campo de busca — os resultados atualizam automaticamente enquanto escreve. Apague o texto (ou use o botão "X") para voltar a ver todos os produtos.

3. **Filtrar por categoria**: clique numa categoria para filtrar; clique em "Todas" ou em "Limpar filtro" para remover o filtro.

4. **Ver detalhes**: clique em qualquer card para abrir a página de detalhe do produto.

5. **Favoritar**: clique no ícone de coração no card (ou na página de detalhe) para marcar/desmarcar um produto como favorito. Os favoritos ficam guardados mesmo após recarregar a página.

6. **Voltar à página inicial**: na página de detalhe, use o botão "Voltar à página inicial" para retornar à listagem, mantendo a pesquisa/filtro/página que estavam ativos.

7. **Alternar tema**: use o botão de sol/lua para trocar entre modo claro e escuro.

---

## Limitações conhecidas

- Não há uma página ou filtro dedicado para visualizar apenas os produtos favoritados — apenas marcar, desmarcar e persistir, conforme escopo do enunciado.
- A API DummyJSON não permite combinar pesquisa por texto com filtro de categoria na mesma chamada; ao pesquisar, o filtro de categoria selecionado é temporariamente ignorado na requisição.