# Projet Django - Guide de Collaboration

Bienvenue dans ce projet Django ! Ce guide vous aidera à cloner, configurer et exécuter le projet sur votre machine locale.

---

# 📋 Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Python 3.8+**  
  [Télécharger Python 3.13.0 (Windows)](https://www.python.org/ftp/python/3.13.0/python-3.13.0-amd64.exe)
- **Git**
- **pip** (inclus avec Python)
- **Virtualenv** (installé globalement si nécessaire) :  
  Installez-le une fois si ce n’est pas encore fait :  
  ```bash
  pip install virtualenv
  
---

# 🚀 Instructions pour démarrer
 ## Executer les commande dans le terminale de VScode:

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
## 3. Installer Django pour ce projet :
```bash
pip install django
```

## 4. Installe les dépendances :
```bash
  python manage.py migrate
```

## 5. Run Server:
```bash
  python manage.py runserver
```

