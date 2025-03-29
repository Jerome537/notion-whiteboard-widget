# Widget Tableau Blanc pour Notion

Un widget de tableau blanc simple et élégant spécialement conçu pour s'intégrer avec Notion. Permet de dessiner, effacer et enregistrer des schémas et croquis directement dans votre espace de travail Notion.

![Aperçu du tableau blanc](preview.png)

## Fonctionnalités

- ✏️ **Outil stylo** pour dessiner librement
- 🧽 **Gomme** pour effacer des parties spécifiques
- 🎨 **10 couleurs Notion** correspondant à la palette officielle
- 📏 **Curseur de taille** pour ajuster l'épaisseur du trait (1-20px)
- 💾 **Fonction d'enregistrement** pour sauvegarder votre travail
- 🔄 **Bouton d'effacement** pour recommencer à zéro
- 📱 **Compatible tactile** pour utilisation sur tablette/mobile

## Comment l'utiliser

### Installation

1. Cloner ce dépôt:
```bash
git clone https://github.com/Jerome537/notion-whiteboard-widget.git
```

2. Installer les dépendances:
```bash
cd notion-whiteboard-widget
npm install
```

3. Démarrer l'application:
```bash
npm start
```

### Intégration avec Notion

Pour utiliser ce widget dans Notion:

1. Déployez l'application sur votre hébergement préféré (Netlify, Vercel, GitHub Pages)
2. Dans Notion, créez un bloc `/embed`
3. Collez l'URL de votre application déployée
4. Redimensionnez le bloc selon vos préférences

Alternativement, vous pouvez enregistrer vos dessins et les importer dans Notion:

1. Dessinez sur le tableau blanc
2. Cliquez sur "Enregistrer dans Notion"
3. Suivez les instructions pour enregistrer l'image
4. Dans Notion, créez un bloc `/image` et importez votre dessin

## Technologies utilisées

- React.js
- Canvas API
- Tailwind CSS

## Personnalisation

Vous pouvez personnaliser les couleurs disponibles en modifiant le tableau `notionColors` dans le composant principal.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
