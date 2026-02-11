# Escopo do Projeto: Loja Aleatória de RPG

## 1. ESTRUTURA DE ARQUIVOS JSON

### Arquivo: `armas.json`
```json
[
  {
    "id": 1,
    "nome": "Espada Longa",
    "descricao": "Uma espada bem balanceada, ideal para combate corpo a corpo",
    "precoMin": 50,
    "precoMax": 80
  },
  {
    "id": 2,
    "nome": "Adaga Curva",
    "descricao": "Uma adaga ágil e precisa",
    "precoMin": 30,
    "precoMax": 60
  },
  {
    "id": 3,
    "nome": "Machado de Batalha",
    "descricao": "Um machado pesado que causa grande dano",
    "precoMin": 70,
    "precoMax": 120
  }
]
```

### Arquivo: `armaduras.json`
```json
[
  {
    "id": 1,
    "nome": "Armadura de Couro",
    "descricao": "Proteção leve e flexível",
    "precoMin": 40,
    "precoMax": 70
  },
  {
    "id": 2,
    "nome": "Cota de Malha",
    "descricao": "Armadura de anéis entrelaçados",
    "precoMin": 100,
    "precoMax": 150
  }
]
```

### Arquivo: `pocoes.json`
```json
[
  {
    "id": 1,
    "nome": "Poção de Cura Menor",
    "descricao": "Restaura uma pequena quantidade de pontos de vida",
    "precoMin": 20,
    "precoMax": 35,
    "efeito": "Recupera 2d4+2 HP"
  },
  {
    "id": 2,
    "nome": "Poção de Mana",
    "descricao": "Restaura energia mágica",
    "precoMin": 25,
    "precoMax": 40,
    "efeito": "Recupera 1d6+1 PM"
  }
]
```

### Arquivo: `pergaminhos.json`
```json
[
  {
    "id": 1,
    "nome": "Pergaminho de Bola de Fogo",
    "descricao": "Permite conjurar uma bola de fogo explosiva",
    "precoMin": 100,
    "precoMax": 150,
    "efeito": "3d6 de dano de fogo em área"
  },
  {
    "id": 2,
    "nome": "Pergaminho de Cura",
    "descricao": "Magia de cura em pergaminho",
    "precoMin": 80,
    "precoMax": 120,
    "efeito": "Recupera 3d8+3 HP"
  }
]
```

### Arquivo: `efeitos-especiais.json`
```json
{
  "armas": [
    {
      "id": 1,
      "efeito": "+1 de dano",
      "descricao": "A arma causa dano adicional"
    },
    {
      "id": 2,
      "efeito": "+2 em acerto crítico",
      "descricao": "Aumenta a chance de acerto crítico"
    },
    {
      "id": 3,
      "efeito": "Dano elemental (fogo)",
      "descricao": "Adiciona 1d4 de dano de fogo"
    },
    {
      "id": 4,
      "efeito": "Vampirismo",
      "descricao": "Recupera 10% do dano causado como HP"
    }
  ],
  "armaduras": [
    {
      "id": 1,
      "efeito": "+1 de defesa",
      "descricao": "Aumenta a classe de armadura"
    },
    {
      "id": 2,
      "efeito": "Resistência a fogo",
      "descricao": "Reduz dano de fogo em 50%"
    },
    {
      "id": 3,
      "efeito": "Regeneração",
      "descricao": "Recupera 1 HP por turno"
    }
  ],
  "pocoes": [
    {
      "id": 1,
      "efeito": "Efeito prolongado",
      "descricao": "O efeito dura 2 turnos extras"
    },
    {
      "id": 2,
      "efeito": "Efeito potencializado",
      "descricao": "Dobra a eficácia da poção"
    }
  ],
  "pergaminhos": [
    {
      "id": 1,
      "efeito": "Conjuração rápida",
      "descricao": "Pode ser usado como ação bônus"
    },
    {
      "id": 2,
      "efeito": "Área aumentada",
      "descricao": "O raio de efeito é dobrado"
    }
  ]
}
```

---

## 2. DEFINIÇÃO DO PROJETO

### **Nome do Projeto**
Loja Aleatória de RPG

### **Objetivo**
Desenvolver uma aplicação web que simula uma loja de itens de RPG de mesa, onde os itens são gerados aleatoriamente a partir de arquivos JSON separados por categoria. Durante a geração, cada item recebe uma raridade aleatória que influencia suas características e a possibilidade de ter efeitos especiais adicionais.

### **Funcionalidades Principais**

✅ **Seleção de categorias:** Menu com checkboxes para escolher quais tipos de itens incluir (Armas, Armaduras, Poções, Pergaminhos)

✅ **Definição de quantidade:** Campo para definir o total de itens que a loja deve exibir

✅ **Geração aleatória de raridade:** Cada item recebe uma raridade durante a geração (Branco, Azul, Roxo, Amarelo)

✅ **Sistema de raridade com probabilidades:**
- **Branco (Comum):** 50% de chance
- **Azul (Incomum):** 30% de chance
- **Roxo (Raro):** 15% de chance
- **Amarelo (Lendário):** 5% de chance

✅ **Efeitos especiais por raridade:** Quanto maior a raridade, maior a chance de ter efeito especial adicional:
- **Branco:** 10% de chance
- **Azul:** 30% de chance
- **Roxo:** 60% de chance
- **Amarelo:** 90% de chance

✅ **Preço dinâmico:** Geração de preço aleatório dentro da faixa definida no JSON, com multiplicador baseado na raridade

✅ **Exibição em grade:** Itens apresentados como cards, agrupados por categoria

✅ **Renovar inventário:** Botão para gerar uma nova seleção de itens

✅ **Informações do item:** Nome, descrição, preço gerado, raridade (visual), efeito base (se houver) e efeito especial adicional (se gerado)

### **Requisitos Técnicos**

- Aplicação web (HTML, CSS, JavaScript - tecnologia flexível para aprendizado)
- Leitura de múltiplos arquivos JSON (um por categoria + efeitos especiais)
- Interface responsiva
- Sem backend ou banco de dados
- Sem persistência entre sessões
- Algoritmo de geração aleatória com pesos

### **Dados Iniciais**
- 35 itens distribuídos em 4 arquivos JSON (um por categoria)
- 1 arquivo JSON com efeitos especiais separados por categoria
- Sistema de raridade com probabilidades definidas

---

## 3. SISTEMA DE RARIDADE E EFEITOS

### **Probabilidade de Raridade**
```
Branco (Comum):    50%
Azul (Incomum):    30%
Roxo (Raro):       15%
Amarelo (Lendário): 5%
```

### **Probabilidade de Efeito Especial Adicional**
```
Branco:   10% de chance
Azul:     30% de chance
Roxo:     60% de chance
Amarelo:  90% de chance
```

### **Modificador de Preço por Raridade**
```
Branco:   1.0x (preço base)
Azul:     1.5x
Roxo:     2.5x
Amarelo:  4.0x
```

### **Cores Visuais por Raridade**
```
Branco:   #9CA3AF (cinza)
Azul:     #3B82F6 (azul)
Roxo:     #A855F7 (roxo)
Amarelo:  #F59E0B (dourado)
```

---

## 4. ETAPAS DE DESENVOLVIMENTO

### **FASE 1: Estruturação e Planejamento**
**Objetivo:** Preparar a base do projeto

**Tarefas:**
- [ ] Criar estrutura de pastas do projeto
- [ ] Definir tecnologias que serão utilizadas (HTML/CSS/JS puro, React, Vue, etc)
- [ ] Criar 4 arquivos JSON de categorias com ~9 itens cada (total 35 itens)
- [ ] Criar arquivo `efeitos-especiais.json` com efeitos para cada categoria
- [ ] Documentar sistema de raridade e probabilidades
- [ ] Criar arquivo de configuração com constantes (probabilidades, cores, multiplicadores)

**Entregável:** Estrutura de projeto + 5 arquivos JSON completos

**Tempo estimado:** 2-4 horas

---

### **FASE 2: Interface de Configuração**
**Objetivo:** Criar a tela inicial onde o usuário configura a loja

**Tarefas:**
- [ ] Criar tela inicial com menu de seleção
- [ ] Implementar checkboxes para as 4 categorias
- [ ] Implementar campo numérico para total de itens (sem mínimo)
- [ ] Criar botão "Gerar Loja"
- [ ] Adicionar validações:
  - Pelo menos uma categoria selecionada
  - Quantidade maior que 0
- [ ] Adicionar mensagens de erro para validações

**Entregável:** Interface de configuração funcional e validada

**Tempo estimado:** 3-5 horas

---

### **FASE 3: Carregamento de Dados**
**Objetivo:** Implementar leitura dos arquivos JSON

**Tarefas:**
- [ ] Criar função para carregar JSON de cada categoria
- [ ] Criar função para carregar JSON de efeitos especiais
- [ ] Implementar tratamento de erros no carregamento
- [ ] Criar estrutura de dados em memória para armazenar itens carregados
- [ ] Testar carregamento via console

**Entregável:** Sistema de carregamento de dados funcionando

**Tempo estimado:** 2-3 horas

---

### **FASE 4: Lógica de Geração Aleatória - Parte 1 (Raridade)**
**Objetivo:** Implementar sistema de atribuição de raridade

**Tarefas:**
- [ ] Criar função que gera raridade aleatória com pesos:
  - Branco: 50%
  - Azul: 30%
  - Roxo: 15%
  - Amarelo: 5%
- [ ] Criar função que calcula preço baseado em raridade
- [ ] Testar distribuição de raridade (gerar 100 itens e verificar percentuais)

**Entregável:** Sistema de raridade funcionando

**Tempo estimado:** 2-3 horas

---

### **FASE 5: Lógica de Geração Aleatória - Parte 2 (Efeitos Especiais)**
**Objetivo:** Implementar sistema de efeitos especiais adicionais

**Tarefas:**
- [ ] Criar função que decide se item terá efeito especial baseado na raridade
- [ ] Criar função que seleciona efeito especial aleatório da categoria correta
- [ ] Garantir que um item não receba o mesmo efeito duas vezes
- [ ] Testar probabilidades de efeitos por raridade

**Entregável:** Sistema de efeitos especiais funcionando

**Tempo estimado:** 3-4 horas

---

### **FASE 6: Lógica de Geração Aleatória - Parte 3 (Montagem da Loja)**
**Objetivo:** Criar função principal que gera a loja completa

**Tarefas:**
- [ ] Criar função que seleciona itens aleatórios das categorias marcadas
- [ ] Implementar lógica para distribuir quantidade total entre categorias selecionadas
- [ ] Para cada item selecionado:
  - Atribuir raridade aleatória
  - Calcular preço com modificador de raridade
  - Decidir e atribuir efeito especial (se aplicável)
- [ ] Organizar itens gerados por categoria
- [ ] Testar geração completa via console

**Entregável:** Sistema de geração completo funcionando

**Tempo estimado:** 4-5 horas

---

### **FASE 7: Interface de Exibição da Loja**
**Objetivo:** Criar a visualização dos itens gerados

**Tarefas:**
- [ ] Criar layout em grade para exibição dos itens
- [ ] Implementar cards de itens com:
  - Nome
  - Descrição
  - Preço (calculado)
  - Raridade (visual com cor)
  - Efeito base (se existir no JSON)
  - Efeito especial adicional (se foi gerado)
- [ ] Adicionar indicação visual de raridade:
  - Borda colorida ou fundo do card
  - Possível badge/tag com nome da raridade
- [ ] Agrupar itens por categoria na exibição
- [ ] Adicionar títulos/separadores de categoria
- [ ] Adicionar ícone ou indicador especial para itens com efeito adicional

**Entregável:** Loja visualmente apresentável com todos os dados

**Tempo estimado:** 5-7 horas

---

### **FASE 8: Funcionalidade de Renovação**
**Objetivo:** Permitir gerar novas lojas

**Tarefas:**
- [ ] Implementar botão "Renovar Inventário" na tela da loja
- [ ] Criar função que limpa a loja atual
- [ ] Gerar nova seleção aleatória de itens (com novas raridades e efeitos)
- [ ] Manter as configurações do menu (categorias e quantidade selecionadas)
- [ ] Adicionar botão para voltar ao menu de configuração
- [ ] Adicionar animação de transição na renovação

**Entregável:** Sistema de renovação funcionando

**Tempo estimado:** 2-3 horas

---

### **FASE 9: Melhorias Visuais e UX**
**Objetivo:** Polir a interface e experiência do usuário

**Tarefas:**
- [ ] Adicionar animações/transições:
  - Fade-in dos cards ao gerar
  - Transição suave ao renovar
  - Hover effects nos cards
- [ ] Implementar responsividade mobile:
  - Layout adaptativo
  - Grade responsiva
  - Menu mobile-friendly
- [ ] Adicionar feedback visual:
  - Loading spinner durante geração
  - Mensagens de sucesso
  - Animações de entrada
- [ ] Adicionar tooltips ou modais com informações detalhadas
- [ ] Implementar modo escuro/claro (opcional)

**Entregável:** Aplicação visualmente polida

**Tempo estimado:** 4-6 horas

---

### **FASE 10: Tratamento de Erros e Otimização**
**Objetivo:** Garantir robustez e performance

**Tarefas:**
- [ ] Implementar tratamento de erros:
  - JSON inválido ou não encontrado
  - Valores incorretos nos campos
  - Falhas no carregamento
- [ ] Adicionar mensagens de erro amigáveis
- [ ] Otimizar performance:
  - Carregar JSONs uma única vez
  - Otimizar algoritmo de geração para grandes quantidades
  - Lazy loading de imagens (se houver)
- [ ] Validar edge cases:
  - Quantidade muito grande de itens
  - Apenas uma categoria com poucos itens
  - Tentativas de geração sem categorias

**Entregável:** Aplicação robusta e otimizada

**Tempo estimado:** 3-4 horas

---

### **FASE 11: Testes e Documentação**
**Objetivo:** Validar funcionamento e documentar o projeto

**Tarefas:**
- [ ] Testar geração com diferentes combinações:
  - Todas as categorias
  - Uma categoria apenas
  - Diferentes quantidades (1, 10, 50, 100 itens)
- [ ] Verificar distribuição de raridades (deve seguir probabilidades)
- [ ] Verificar distribuição de efeitos especiais por raridade
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testar responsividade em diferentes tamanhos de tela
- [ ] Criar documentação de uso (README):
  - Como usar a aplicação
  - Como adicionar novos itens nos JSONs
  - Como modificar probabilidades
  - Estrutura do projeto
- [ ] Documentar código (comentários em funções importantes)
- [ ] Criar lista de melhorias futuras

**Entregável:** Projeto finalizado, testado e documentado

**Tempo estimado:** 3-5 horas

---

## 5. ESTRUTURA DE DADOS EM MEMÓRIA

Durante a execução, cada item gerado terá a seguinte estrutura:

```javascript
{
  id: 1,
  nome: "Espada Longa",
  descricao: "Uma espada bem balanceada, ideal para combate corpo a corpo",
  categoria: "armas",
  precoBase: 65, // Gerado entre precoMin e precoMax
  raridade: "azul", // Gerado aleatoriamente
  modificadorRaridade: 1.5, // Baseado na raridade
  precoFinal: 98, // precoBase * modificadorRaridade
  efeitoBase: null, // Se existir no JSON original
  efeitoEspecial: { // Se foi gerado
    efeito: "+2 em acerto crítico",
    descricao: "Aumenta a chance de acerto crítico"
  }
}
```

---

##  RECURSOS NECESSÁRIOS

### **Conhecimentos Técnicos**
- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)
- Manipulação de JSON
- Fetch API ou XMLHttpRequest
- Algoritmos de aleatoriedade
- DOM manipulation

### **Opcionais (dependendo da tecnologia escolhida)**
- Svelte
- TypeScript
- Tailwind CSS / Bootstrap
- Build tools (Vite, Webpack)

---

## EXEMPLO DE FLUXO DE USO

1. **Usuário acessa a aplicação**
2. **Vê tela de configuração** com checkboxes das categorias
3. **Seleciona:** Armas ✓, Poções ✓ (deixa Armaduras e Pergaminhos desmarcados)
4. **Define quantidade:** 12 itens
5. **Clica em "Gerar Loja"**
6. **Sistema:**
   - Carrega `armas.json` e `pocoes.json`
   - Distribui 12 itens entre as 2 categorias (ex: 7 armas, 5 poções)
   - Para cada item:
     - Seleciona item aleatório do JSON
     - Atribui raridade aleatória (ex: Branco)
     - Gera preço base aleatório entre min e max
     - Aplica modificador de raridade ao preço
     - Verifica se terá efeito especial (10% para Branco)
     - Se sim, seleciona efeito aleatório de `efeitos-especiais.json`
7. **Usuário vê a loja** com 12 cards exibindo todos os dados
8. **Usuário clica em "Renovar Inventário"**
9. **Sistema gera nova loja** com os mesmos parâmetros mas itens/raridades diferentes
10. **Usuário pode voltar ao menu** para mudar configurações

---