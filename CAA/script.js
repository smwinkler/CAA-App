// AAC Communication App - Main JavaScript File

class AACApp {
    constructor() {
        // Vocabulário padrão
        this.defaultData = {
            categories: {
                basico: {
                    name: 'Básico',
                    emoji: '⭐',
                    words: [
                        { text: 'sim', emoji: '✅' },
                        { text: 'não', emoji: '❌' },
                        { text: 'quero', emoji: '👍' },
                        { text: 'não quero', emoji: '👎' },
                        { text: 'mais', emoji: '➕' },
                        { text: 'menos', emoji: '➖' },
                        { text: 'oi', emoji: '👋' },
                        { text: 'tchau', emoji: '👋' },
                        { text: 'obrigada', emoji: '🙏' },
                        { text: 'por favor', emoji: '🙏' },
                        { text: 'desculpa', emoji: '😔' },
                        { text: 'tudo bem', emoji: '👌' },
                        { text: 'bem', emoji: '😊' },
                        { text: 'mal', emoji: '😞' },
                        { text: 'agora', emoji: '⏰' },
                        { text: 'depois', emoji: '⏳' },
                        { text: 'aqui', emoji: '📍' },
                        { text: 'ali', emoji: '👉' },
                        { text: 'ajuda', emoji: '🆘' },
                        { text: 'banheiro', emoji: '🚻' }
                    ]
                },
                cores: {
                    name: 'Cores',
                    emoji: '🎨',
                    words: [
                        { text: 'azul', emoji: '🔵' },
                        { text: 'amarelo', emoji: '🟡' },
                        { text: 'vermelho', emoji: '🔴' },
                        { text: 'roxo', emoji: '🟣' },
                        { text: 'verde', emoji: '🟢' },
                        { text: 'rosa', emoji: '🩷' },
                        { text: 'laranja', emoji: '🟠' },
                        { text: 'marrom', emoji: '🤎' },
                        { text: 'preto', emoji: '⚫' },
                        { text: 'branco', emoji: '⚪' }
                    ]
                },
                comidas: {
                    name: 'Comidas',
                    emoji: '🍽️',
                    words: [
                        { text: 'água', emoji: '💧' },
                        { text: 'leite', emoji: '🥛' },
                        { text: 'suco', emoji: '🧃' },
                        { text: 'pão', emoji: '🍞' },
                        { text: 'arroz', emoji: '🍚' },
                        { text: 'feijão', emoji: '🫘' },
                        { text: 'carne', emoji: '🥩' },
                        { text: 'frango', emoji: '🐔' },
                        { text: 'ovo', emoji: '🥚' },
                        { text: 'banana', emoji: '🍌' },
                        { text: 'maçã', emoji: '🍎' },
                        { text: 'batata', emoji: '🥔' },
                        { text: 'verdura', emoji: '🥬' },
                        { text: 'doce', emoji: '🍭' },
                        { text: 'sorvete', emoji: '🍦' }
                    ]
                },
                acoes: {
                    name: 'Ações',
                    emoji: '🏃',
                    words: [
                        { text: 'comer', emoji: '🍴' },
                        { text: 'beber', emoji: '🥤' },
                        { text: 'dormir', emoji: '😴' },
                        { text: 'andar', emoji: '🚶' },
                        { text: 'sentar', emoji: '🪑' },
                        { text: 'brincar', emoji: '🎮' },
                        { text: 'ler', emoji: '📖' },
                        { text: 'ver', emoji: '👀' },
                        { text: 'ouvir', emoji: '👂' },
                        { text: 'falar', emoji: '🗣️' },
                        { text: 'abrir', emoji: '🔓' },
                        { text: 'fechar', emoji: '🔒' },
                        { text: 'ir', emoji: '➡️' },
                        { text: 'vir', emoji: '⬅️' },
                        { text: 'ajudar', emoji: '🤝' }
                    ]
                },
                pessoas: {
                    name: 'Pessoas',
                    emoji: '👥',
                    words: [
                        { text: 'você', emoji: '👆' },
                        { text: 'ele', emoji: '👨' },
                        { text: 'ela', emoji: '👩' },
                        { text: 'mamãe', emoji: '👩' },
                        { text: 'papai', emoji: '👨' },
                        { text: 'vovó', emoji: '👵' },
                        { text: 'vovô', emoji: '👴' },
                        { text: 'irmão', emoji: '👦' },
                        { text: 'irmã', emoji: '👧' },
                        { text: 'amigo', emoji: '👫' },
                        { text: 'professor', emoji: '👨‍🏫' },
                        { text: 'médico', emoji: '👨‍⚕️' },
                        { text: 'bebê', emoji: '👶' },
                        { text: 'família', emoji: '👨‍👩‍👧‍👦' }
                    ]
                },
                frases: {
                    name: 'Frases',
                    emoji: '💭',
                    words: [
                        { text: 'Eu estou com fome', emoji: '🍽️' },
                        { text: 'Eu estou com sede', emoji: '💧' },
                        { text: 'Eu quero brincar', emoji: '🎮' },
                        { text: 'Eu estou feliz', emoji: '😊' },
                        { text: 'Eu estou triste', emoji: '😢' },
                        { text: 'Eu preciso de ajuda', emoji: '🆘' }
                    ]
                }
            }
        };

        this.currentCategory = 'basico';
        this.sentence = [];
        this.customData = this.loadCustomData();
        this.buttonSize = localStorage.getItem('buttonSize') || 'medium';
        this.gridSize = localStorage.getItem('gridSize') || '4x5';
        this.editMode = false;
        this.hiddenButtons = new Set(JSON.parse(localStorage.getItem('hiddenButtons') || '[]'));

        this.initializeSpeech();
        this.init();
    }

    initializeSpeech() {
        if ('speechSynthesis' in window) {
            this.synth = window.speechSynthesis;
            const setVoice = () => {
                const voices = this.synth.getVoices();
                this.voice = voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt')) || voices[0];
            };
            setVoice();
            this.synth.onvoiceschanged = setVoice;
        }
    }

    loadCustomData() {
        const saved = localStorage.getItem('aacCustomData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Erro ao carregar dados customizados', e);
            }
        }
        return { categories: {} };
    }

    saveCustomData() {
        localStorage.setItem('aacCustomData', JSON.stringify(this.customData));
    }

    getAllCategories() {
        return { ...this.defaultData.categories, ...this.customData.categories };
    }

    init() {
        this.setupEventListeners();
        this.updateCategoryNav();
        this.applyGridSize();
        this.displayWords();
        this.applyButtonSize();
        this.updateSentenceDisplay();
        this.updateGridSizeSelector();
    }

    setupEventListeners() {
        // Navegação categorias
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn') || e.target.closest('.category-btn')) {
                const btn = e.target.closest('.category-btn');
                this.switchCategory(btn.dataset.category);
            }
        });

        // Botões de palavra
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-btn') || e.target.closest('.word-btn')) {
                const btn = e.target.closest('.word-btn');
                if (this.editMode) {
                    e.stopPropagation();
                    this.toggleButtonVisibility(`${btn.dataset.category}-${btn.dataset.index}`, btn);
                    return;
                }
                if (!btn.classList.contains('hidden')) {
                    this.addWordToSentence(btn.dataset.word);
                }
            }
        });

        document.getElementById('speak-btn').addEventListener('click', () => this.speakSentence());
        document.getElementById('clear-sentence-btn').addEventListener('click', () => this.clearSentence());
        document.getElementById('settings-btn').addEventListener('click', () => this.openSettingsModal());
        document.getElementById('close-modal').addEventListener('click', () => this.closeSettingsModal());

        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') this.closeSettingsModal();
        });

        document.getElementById('add-word-btn').addEventListener('click', () => this.addCustomWord());
        document.getElementById('add-category-btn').addEventListener('click', () => this.addCustomCategory());
        document.getElementById('button-size').addEventListener('change', (e) => this.changeButtonSize(e.target.value));
        document.getElementById('reset-data-btn').addEventListener('click', () => this.resetCustomData());
        document.getElementById('grid-size').addEventListener('change', (e) => this.changeGridSize(e.target.value));
        document.getElementById('grid-density').addEventListener('change', (e) => this.changeGridSize(e.target.value));
        document.getElementById('edit-mode-btn').addEventListener('click', () => this.toggleEditMode());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                this.speakSentence();
            } else if (e.key === 'Escape') {
                this.clearSentence();
            }
        });
    }

    switchCategory(categoryKey) {
        this.currentCategory = categoryKey;
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        const btn = document.querySelector(`[data-category="${categoryKey}"]`);
        if (btn) btn.classList.add('active');
        this.displayWords();
    }

    displayWords() {
        const grid = document.getElementById('words-grid');
        const categories = this.getAllCategories();
        const category = categories[this.currentCategory];
        if (!category || !category.words.length) {
            this.showEmptyState();
            return;
        }

        grid.innerHTML = '';
        grid.className = `words-grid grid-${this.gridSize}`;

        if (this.currentCategory === 'basico') {
            grid.appendChild(this.createEuButton());
        }

        category.words.forEach((word, index) => {
            if (this.editMode && this.hiddenButtons.has(`${this.currentCategory}-${index}`)) return;
            const button = this.createWordButton(word, this.currentCategory, index);
            grid.appendChild(button);
        });
    }

    createEuButton() {
        const btn = document.createElement('button');
        btn.className = 'word-btn';
        btn.dataset.word = 'Eu';
        btn.innerHTML = `<span class="emoji">👤</span><span class="text">Eu</span>`;
        return btn;
    }

    createWordButton(word, categoryKey, index) {
        const btn = document.createElement('button');
        btn.className = 'word-btn';
        btn.dataset.word = word.text;
        btn.dataset.category = categoryKey;
        btn.dataset.index = index;
        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = word.emoji || '💬';
        const text = document.createElement('span');
        text.className = 'text';
        text.textContent = word.text;
        btn.appendChild(emoji);
        btn.appendChild(text);
        return btn;
    }

    showEmptyState() {
        const grid = document.getElementById('words-grid');
        grid.innerHTML = `<div class="empty-state"><div class="emoji">📝</div><h3>Nenhuma palavra</h3><p>Adicione novas palavras nas configurações.</p></div>`;
    }

    addWordToSentence(word) {
        this.sentence.push(word);
        this.updateSentenceDisplay();
        this.speak(word);
    }

    updateSentenceDisplay() {
        const display = document.getElementById('sentence-display');
        if (!this.sentence.length) {
            display.innerHTML = '<span class="placeholder">Toque nas palavras para formar uma frase...</span>';
            return;
        }
        display.innerHTML = this.sentence.map(w => `<span class="sentence-word">${w}</span>`).join(' ');
    }

    clearSentence() {
        this.sentence = [];
        this.updateSentenceDisplay();
    }

    speak(text) {
        if (!this.synth) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR';
        u.rate = 0.9;
        if (this.voice) u.voice = this.voice;
        this.synth.speak(u);
    }

    speakSentence() {
        if (!this.sentence.length) {
            this.speak('Adicione palavras para formar uma frase');
            return;
        }
        const full = this.sentence.join(' ');
        this.speak(full);
    }

    updateCategoryNav() {
        const nav = document.querySelector('.category-nav');
        const categories = this.getAllCategories();
        nav.querySelectorAll('.category-btn').forEach(btn => {
            if (!this.defaultData.categories[btn.dataset.category]) btn.remove();
        });
        Object.keys(this.customData.categories).forEach(key => {
            if (!nav.querySelector(`[data-category="${key}"]`)) {
                const cat = this.customData.categories[key];
                const button = document.createElement('button');
                button.className = 'category-btn';
                button.dataset.category = key;
                button.innerHTML = `<span class="emoji">${cat.emoji}</span><span class="text">${cat.name}</span>`;
                nav.appendChild(button);
            }
        });
    }

    openSettingsModal() {
        document.getElementById('settings-modal').classList.add('show');
        document.getElementById('button-size').value = this.buttonSize;
    }

    closeSettingsModal() {
        document.getElementById('settings-modal').classList.remove('show');
    }

    addCustomWord() {
        const word = document.getElementById('new-word').value.trim();
        const category = document.getElementById('word-category').value;
        const emoji = document.getElementById('word-emoji').value.trim() || '💬';
        if (!word) return alert('Digite uma palavra');

        if (!this.customData.categories[category]) {
            const base = this.defaultData.categories[category];
            this.customData.categories[category] = {
                name: base.name,
                emoji: base.emoji,
                words: [...base.words]
            };
        }
        this.customData.categories[category].words.push({ text: word, emoji });
        this.saveCustomData();
        if (this.currentCategory === category) this.displayWords();
        alert(`Palavra "${word}" adicionada`);
    }

    addCustomCategory() {
        const name = document.getElementById('new-category').value.trim();
        const emoji = document.getElementById('category-emoji').value.trim() || '📁';
        if (!name) return alert('Digite o nome');
        const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (this.getAllCategories()[key]) return alert('Categoria já existe');
        this.customData.categories[key] = { name, emoji, words: [] };
        this.saveCustomData();
        this.updateCategoryNav();
        alert(`Categoria "${name}" criada`);
    }

    changeButtonSize(size) {
        this.buttonSize = size;
        localStorage.setItem('buttonSize', size);
        this.applyButtonSize();
    }

    applyButtonSize() {
        const c = document.querySelector('.container');
        c.classList.remove('small', 'medium', 'large');
        c.classList.add(this.buttonSize);
    }

    resetCustomData() {
        if (!confirm('Resetar todos os dados?')) return;
        this.customData = { categories: {} };
        this.hiddenButtons.clear();
        localStorage.removeItem('aacCustomData');
        localStorage.removeItem('hiddenButtons');
        this.updateCategoryNav();
        this.switchCategory('basico');
        alert('Dados resetados');
    }

    changeGridSize(size) {
        this.gridSize = size;
        localStorage.setItem('gridSize', size);
        this.applyGridSize();
        this.displayWords();
        document.getElementById('grid-size').value = size;
        document.getElementById('grid-density').value = size;
    }

    applyGridSize() {
        document.getElementById('words-grid').className = `words-grid grid-${this.gridSize}`;
    }

    updateGridSizeSelector() {
        document.getElementById('grid-size').value = this.gridSize;
        document.getElementById('grid-density').value = this.gridSize;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        const btn = document.getElementById('edit-mode-btn');
        btn.textContent = this.editMode ? '💾 Salvar Edição' : '✏️ Editar Botões';
        this.displayWords();
    }

    toggleButtonVisibility(id, el) {
        if (this.hiddenButtons.has(id)) {
            this.hiddenButtons.delete(id);
            el.classList.remove('hidden');
        } else {
            this.hiddenButtons.add(id);
            el.classList.add('hidden');
        }
        localStorage.setItem('hiddenButtons', JSON.stringify([...this.hiddenButtons]));
    }
}

document.addEventListener('DOMContentLoaded', () => new AACApp());
