// static/js/chapters.js

class ChapterManager {
    constructor(data) {
        this.chapters = data;
        this.container = document.getElementById('chapters-container');
    }

    createChapterElement(chapter) {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'chapter-name';
        nameDiv.textContent = chapter.name;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chapter-content';
        contentDiv.textContent = chapter.content;
        
        chapterDiv.appendChild(nameDiv);
        chapterDiv.appendChild(contentDiv);
        
        // Ajout des événements
        chapterDiv.addEventListener('click', () => {
            this.handleChapterClick(chapterDiv);
        });
        
        return chapterDiv;
    }

    handleChapterClick(chapterElement) {
        // Retire la classe active de tous les chapitres
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.classList.remove('active');
        });
        
        // Ajoute la classe active au chapitre cliqué
        chapterElement.classList.add('active');
    }

    render() {
        // Vide le conteneur avant de render
        this.container.innerHTML = '';
        
        // Crée et ajoute chaque chapitre
        this.chapters.forEach(chapter => {
            const chapterElement = this.createChapterElement(chapter);
            this.container.appendChild(chapterElement);
        });
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const chapterManager = new ChapterManager(chaptersData);
    chapterManager.render();
});