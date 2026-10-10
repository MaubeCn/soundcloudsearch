const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const loader = document.getElementById('loader');
const noResults = document.getElementById('noResults');

// Обработчики нажатий
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    if (!resultsContainer) return;

    // Очищаем старые результаты
    resultsContainer.innerHTML = '';
    noResults.classList.add('hidden');
    loader.classList.remove('hidden');

-    // Имитируем небольшую загрузку для красоты
    setTimeout(() => {
        loader.classList.add('hidden');
        showSearchCards(query);
    }, 500);
}

function showSearchCards(query) {
    resultsContainer.innerHTML = '';

    // Ссылки на официальный поиск и популярные платформы
    const scSearchUrl = `https://soundcloud.com/search?q=${encodeURIComponent(query)}`;
    const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    const card = document.createElement('div');
    card.className = 'track-card';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'flex-start';
    card.style.gap = '15px';

    card.innerHTML = `
        <div class="track-info" style="width: 100%;">
            <div class="track-details">
                <h3 style="font-size: 1.3rem; margin-bottom: 5px;">Результаты по запросу: "${escapeHtml(query)}"</h3>
                <p>Нажмите кнопку ниже, чтобы открыть этот трек или альбомы на SoundCloud:</p>
            </div>
        </div>
        <div style="display: flex; gap: 10px; width: 100%; flex-wrap: wrap;">
            <a href="${scSearchUrl}" target="_blank" class="track-link" style="background: #ff7700; flex: 1; justify-content: center;">
                <i class="fa-brands fa-soundcloud"></i> Искать "${escapeHtml(query)}" на SoundCloud
            </a>
        </div>
    `;

    resultsContainer.appendChild(card);
}

// Защита от XSS
function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function fallbackSearch(query) {
    resultsContainer.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'track-card';
    card.style.justifyContent = 'center';
    card.style.textAlign = 'center';

    const searchUrl = `https://soundcloud.com/search?q=${encodeURIComponent(query)}`;

    card.innerHTML = `
        <div>
            <h3 style="margin-bottom: 10px;"> Результаты по запросу: "${escapeHtml(query)}"</h3>
            <p style="margin-bottom: 15px; color: #aaa;"> Нажмите на кнопку ниже, чтобы открыть найденные треки напрямую на сайте SoundCloud:</p>
            <a href="${searchUrl}" target="_blank" class="track-link" style="display: inline-flex;">
                <i class="fa-brands fa-soundcloud"></i> Открыть поиск на SoundCloud
            </a>
        </div>   
        `;
        resultsContainer.appendChild(card);
}