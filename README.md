# Projet Django - Guide de Collaboration

Bienvenue dans ce projet Django ! Ce guide vous aidera à cloner, configurer et exécuter le projet sur votre machine locale.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Python 3.8+**
- **Git**
- **pip** (installé avec Python)
- **Virtualenv** (optionnel, mais recommandé)
- **Un éditeur de code** (par exemple, Visual Studio Code)

---

## 🚀 Instructions pour démarrer
 # Executer les commande dans le terminale de VScode:

## 1. Clone et entre dans le répertoire :
```bash
  git clone <URL-du-dépôt>
  cd <nom-du-projet>
```

## 2. Crée un environnement virtuel :
```bash
  python -m venv venv
  source venv/bin/activate  # Linux/macOS
  venv\Scripts\activate     # Windows
```

## 3. Installe les dépendances :
```bash
  python manage.py migrate
```

## 4. Run Server:
```bash
    -> python manage.py runserver
```

