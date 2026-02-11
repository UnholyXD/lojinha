// Configurações
const RARITIES = {
    COMMON: { name: 'Comum', chance: 0.5, color: 'common', specialEffectChance: 0.1, priceMultiplier: 1.0 },
    UNCOMMON: { name: 'Incomum', chance: 0.3, color: 'uncommon', specialEffectChance: 0.3, priceMultiplier: 1.5 },
    RARE: { name: 'Raro', chance: 0.15, color: 'rare', specialEffectChance: 0.6, priceMultiplier: 2.0 },
    LEGENDARY: { name: 'Lendário', chance: 0.05, color: 'legendary', specialEffectChance: 0.9, priceMultiplier: 3.0 }
};

// Estado da aplicação
let appState = {
    items: {
        armas: [],
        armaduras: [],
        pocoes: [],
        pergaminhos: []
    },
    specialEffects: {
        armas: [],
        armaduras: [],
        pocoes: [],
        pergaminhos: []
    },
    selectedCategories: ['armas', 'armaduras', 'pocoes', 'pergaminhos'],
    itemCount: 12,
    isLoading: false
};

// Elementos do DOM
const elements = {
    shopItems: document.getElementById('shopItems'),
    generateBtn: document.getElementById('generateBtn'),
    itemCountInput: document.getElementById('itemCount'),
    itemCountValue: document.getElementById('itemCountValue'),
    loading: document.getElementById('loading'),
    categoryCheckboxes: document.querySelectorAll('.category-check')
};

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
});

// Carrega os dados dos arquivos JSON
async function loadData() {
    try {
        appState.isLoading = true;
        updateLoadingState();
        
        // Carrega os itens de cada categoria
        for (const category of Object.keys(appState.items)) {
            const response = await fetch(`data/${category}.json`);
            appState.items[category] = await response.json();
        }
        
        // Carrega os efeitos especiais
        const effectsResponse = await fetch('data/efeitos-especiais.json');
        const effectsData = await effectsResponse.json();
        appState.specialEffects = effectsData;
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar os dados da loja. Por favor, recarregue a página.');
    } finally {
        appState.isLoading = false;
        updateLoadingState();
    }
}

// Configura os event listeners
function setupEventListeners() {
    // Botão de gerar itens
    elements.generateBtn.addEventListener('click', generateShopItems);
    
    // Controle de quantidade de itens
    elements.itemCountInput.addEventListener('input', (e) => {
        appState.itemCount = parseInt(e.target.value);
        elements.itemCountValue.textContent = appState.itemCount;
    });
    
    // Checkboxes de categorias
    elements.categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.value;
            if (e.target.checked) {
                if (!appState.selectedCategories.includes(category)) {
                    appState.selectedCategories.push(category);
                }
            } else {
                appState.selectedCategories = appState.selectedCategories.filter(cat => cat !== category);
            }
            
            // Garante que pelo menos uma categoria esteja selecionada
            if (appState.selectedCategories.length === 0) {
                e.target.checked = true;
                appState.selectedCategories.push(category);
            }
        });
    });
}

// Gera os itens da loja
function generateShopItems() {
    if (appState.isLoading) return;
    
    // Limpa a lista de itens
    elements.shopItems.innerHTML = '';
    
    // Se não há categorias selecionadas, não faz nada
    if (appState.selectedCategories.length === 0) return;
    
    // Distribui os itens entre as categorias selecionadas
    const itemsPerCategory = distributeItems();
    
    // Gera os itens para cada categoria
    for (const [category, count] of Object.entries(itemsPerCategory)) {
        if (count > 0) {
            const categoryItems = generateCategoryItems(category, count);
            displayCategoryItems(category, categoryItems);
        }
    }
}

// Distribui os itens entre as categorias selecionadas
function distributeItems() {
    const result = {};
    const categories = [...appState.selectedCategories];
    const itemCount = Math.min(Math.max(5, appState.itemCount), 30); // Limita entre 5 e 30 itens
    
    // Inicializa o contador para cada categoria
    categories.forEach(category => {
        result[category] = 0;
    });
    
    // Distribui os itens
    for (let i = 0; i < itemCount; i++) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        result[categories[randomIndex]]++;
    }
    
    return result;
}

// Gera itens para uma categoria específica
function generateCategoryItems(category, count) {
    const items = [];
    const availableItems = [...appState.items[category]];
    
    for (let i = 0; i < count; i++) {
        // Seleciona um item aleatório da categoria
        const itemIndex = Math.floor(Math.random() * availableItems.length);
        const baseItem = { ...availableItems[itemIndex] };
        
        // Determina a raridade do item
        const rarity = determineRarity();
        
        // Gera o preço com base na raridade
        const priceMultiplier = rarity.priceMultiplier;
        const minPrice = baseItem.precoMin || 10;
        const maxPrice = baseItem.precoMax || 50;
        const basePrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
        const finalPrice = Math.floor(basePrice * priceMultiplier);
        
        // Determina se o item terá um efeito especial
        let specialEffect = null;
        if (Math.random() < rarity.specialEffectChance && appState.specialEffects[category]?.length > 0) {
            const effectIndex = Math.floor(Math.random() * appState.specialEffects[category].length);
            specialEffect = appState.specialEffects[category][effectIndex];
        }
        
        // Cria o item final
        const item = {
            ...baseItem,
            id: `${category}-${baseItem.id}-${Date.now()}-${i}`,
            category,
            rarity: rarity.name,
            rarityClass: rarity.color,
            price: finalPrice,
            specialEffect
        };
        
        items.push(item);
    }
    
    return items;
}

// Determina a raridade de um item
function determineRarity() {
    const random = Math.random();
    let cumulativeChance = 0;
    
    for (const [key, rarity] of Object.entries(RARITIES)) {
        cumulativeChance += rarity.chance;
        if (random <= cumulativeChance) {
            return rarity;
        }
    }
    
    // Retorna raridade comum como padrão
    return RARITIES.COMMON;
}

// Exibe os itens de uma categoria
function displayCategoryItems(category, items) {
    if (items.length === 0) return;
    
    // Título da categoria
    const categoryName = {
        'armas': 'Armas',
        'armaduras': 'Armaduras',
        'pocoes': 'Poções',
        'pergaminhos': 'Pergaminhos'
    }[category] || category;
    
    const categoryHeader = document.createElement('h3');
    categoryHeader.className = 'category-header';
    categoryHeader.textContent = categoryName;
    elements.shopItems.appendChild(categoryHeader);
    
    // Container para os itens da categoria
    const row = document.createElement('div');
    row.className = 'row g-4 mb-4';
    
    // Adiciona cada item ao container
    items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        col.innerHTML = createItemCard(item);
        row.appendChild(col);
    });
    
    elements.shopItems.appendChild(row);
}

// Cria o HTML de um card de item
function createItemCard(item) {
    const hasEffect = item.specialEffect ? 'has-effect' : '';
    const effectHtml = item.specialEffect 
        ? `<div class="special-effect"><i class="bi bi-stars"></i> <strong>${item.specialEffect.efeito}:</strong> ${item.specialEffect.descricao}</div>` 
        : '';
    
    return `
        <div class="card item-card rarity-${item.rarityClass} ${hasEffect}">
            <div class="card-body">
                <div class="card-content">
                    <div>
                        <h5 class="card-title">${item.nome}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${getCategoryDisplayName(item.category)}</h6>
                    </div>
                    <p class="card-text">${item.descricao}</p>
                    ${effectHtml}
                    ${item.efeito ? `<div class="special-effect"><i class="bi bi-magic"></i> <strong>Efeito:</strong> ${item.efeito}</div>` : ''}
                </div>
                <span class="item-price">${item.price} moedas</span>
            </div>
        </div>
    `;
}

// Retorna o nome de exibição de uma categoria
function getCategoryDisplayName(category) {
    const names = {
        'armas': 'Arma',
        'armaduras': 'Armadura',
        'pocoes': 'Poção',
        'pergaminhos': 'Pergaminho'
    };
    return names[category] || category;
}

// Atualiza o estado de carregamento
function updateLoadingState() {
    if (appState.isLoading) {
        elements.loading.classList.remove('d-none');
        elements.shopItems.classList.add('d-none');
        elements.generateBtn.disabled = true;
    } else {
        elements.loading.classList.add('d-none');
        elements.shopItems.classList.remove('d-none');
        elements.generateBtn.disabled = false;
    }
}

// Exporta para uso no console, se necessário
window.RPGShop = {
    appState,
    generateShopItems,
    loadData
};
