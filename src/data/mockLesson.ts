import type { LessonData } from '../types/studio';

export const mockLessonData: LessonData = {
  id: 'lesson-1',
  title: 'Introduction aux Algorithmes de Machine Learning',
  videoUrl: 'https://storage.googleapis.com/works23/ayanBridge/Machine%20Learning%20Explained%20in%20100%20Seconds.mp4',
  content: `# Introduction aux Algorithmes de Machine Learning

Le **machine learning** est une branche de l'intelligence artificielle qui permet aux machines d'apprendre et de s'améliorer automatiquement à partir de l'expérience sans être explicitement programmées.

## Objectifs de cette leçon

- Comprendre les concepts fondamentaux du ML
- Découvrir les différents types d'algorithmes
- Apprendre à choisir le bon algorithme pour un problème donné

## Types d'apprentissage

Il existe trois grands types d'apprentissage automatique :

### 1. Apprentissage supervisé
L'algorithme apprend à partir d'exemples étiquetés. On fournit à l'algorithme des données d'entrée avec les réponses correctes correspondantes.

**Exemples d'applications :**
- Classification d'emails (spam ou non-spam)
- Reconnaissance d'images
- Prédiction de prix immobiliers

### 2. Apprentissage non supervisé
L'algorithme découvre des patterns dans les données sans avoir d'exemples étiquetés.

**Exemples d'applications :**
- Segmentation de clientèle
- Détection d'anomalies
- Réduction de dimensionnalité

### 3. Apprentissage par renforcement
L'algorithme apprend par essai-erreur en interagissant avec un environnement.

**Exemples d'applications :**
- Jeux vidéo (AlphaGo, chess)
- Voitures autonomes
- Trading algorithmique

## Algorithmes populaires

### Régression linéaire
La **régression linéaire** est l'un des algorithmes les plus simples et les plus utilisés en machine learning.

### Decision Trees (Arbres de décision)
Les arbres de décision sont faciles à interpréter et visualiser.

**Avantages :**
- Faciles à comprendre
- Peu de préparation des données nécessaire
- Gèrent les variables numériques et catégorielles

**Inconvénients :**
- Tendance au surapprentissage
- Instables (petits changements dans les données peuvent créer des arbres très différents)

## Conclusion

Dans cette leçon, nous avons exploré :

1. ✅ Les concepts de base du machine learning
2. ✅ Les trois types d'apprentissage principaux
3. ✅ Quelques algorithmes populaires et leurs cas d'usage

### Prochaines étapes

Pour approfondir vos connaissances :

- Pratiquez avec des datasets réels
- Explorez les bibliothèques comme scikit-learn, TensorFlow
- Participez à des compétitions Kaggle

> **Astuce** : Commencez toujours par des problèmes simples avant de vous attaquer à des cas complexes !`,
  sections: [
    {
      id: 'intro',
      title: 'Introduction',
      videoTimestamp: 0,
      content: `# Introduction aux Algorithmes de Machine Learning

Le **machine learning** est une branche de l'intelligence artificielle qui permet aux machines d'apprendre et de s'améliorer automatiquement à partir de l'expérience sans être explicitement programmées.

## Objectifs de cette leçon

- Comprendre les concepts fondamentaux du ML
- Découvrir les différents types d'algorithmes
- Apprendre à choisir le bon algorithme pour un problème donné

> **Important** : Cette leçon nécessite des connaissances de base en mathématiques et en programmation.`
    },
    {
      id: 'types',
      title: 'Types d\'apprentissage',
      videoTimestamp: 45,
      content: `# Types d'apprentissage

Il existe trois grands types d'apprentissage automatique :

## 1. Apprentissage supervisé

L'algorithme apprend à partir d'exemples étiquetés. On fournit à l'algorithme des données d'entrée avec les réponses correctes correspondantes.

**Exemples d'applications :**
- Classification d'emails (spam ou non-spam)
- Reconnaissance d'images
- Prédiction de prix immobiliers

## 2. Apprentissage non supervisé

L'algorithme découvre des patterns dans les données sans avoir d'exemples étiquetés.

**Exemples d'applications :**
- Segmentation de clientèle
- Détection d'anomalies
- Réduction de dimensionnalité

## 3. Apprentissage par renforcement

L'algorithme apprend par essai-erreur en interagissant avec un environnement.

**Exemples d'applications :**
- Jeux vidéo (AlphaGo, chess)
- Voitures autonomes
- Trading algorithmique`,
      subsections: [
        {
          id: 'supervised',
          title: 'Apprentissage supervisé',
          videoTimestamp: 60,
          content: 'Détails sur l\'apprentissage supervisé...'
        },
        {
          id: 'unsupervised',
          title: 'Apprentissage non supervisé',
          videoTimestamp: 90,
          content: 'Détails sur l\'apprentissage non supervisé...'
        }
      ]
    },
    {
      id: 'algorithms',
      title: 'Algorithmes populaires',
      videoTimestamp: 120,
      content: `# Algorithmes populaires

## Régression linéaire

La **régression linéaire** est l'un des algorithmes les plus simples et les plus utilisés en machine learning.

\`\`\`python
from sklearn.linear_model import LinearRegression

# Créer le modèle
model = LinearRegression()

# Entraîner le modèle
model.fit(X_train, y_train)

# Faire des prédictions
predictions = model.predict(X_test)
\`\`\`

## Decision Trees (Arbres de décision)

Les arbres de décision sont faciles à interpréter et visualiser.

**Avantages :**
- Faciles à comprendre
- Peu de préparation des données nécessaire
- Gèrent les variables numériques et catégorielles

**Inconvénients :**
- Tendance au surapprentissage
- Instables (petits changements dans les données peuvent créer des arbres très différents)`
    },
    {
      id: 'conclusion',
      title: 'Conclusion et prochaines étapes',
      videoTimestamp: 180,
      content: `# Conclusion

Dans cette leçon, nous avons exploré :

1. ✅ Les concepts de base du machine learning
2. ✅ Les trois types d'apprentissage principaux
3. ✅ Quelques algorithmes populaires et leurs cas d'usage

## Prochaines étapes

Pour approfondir vos connaissances :

- Pratiquez avec des datasets réels
- Explorez les bibliothèques comme scikit-learn, TensorFlow
- Participez à des compétitions Kaggle

> **Astuce** : Commencez toujours par des problèmes simples avant de vous attaquer à des cas complexes !`
    }
  ],
  transcript: [
    {
      id: 't1',
      text: 'Bonjour et bienvenue dans cette introduction aux algorithmes de machine learning.',
      startTime: 0,
      endTime: 5
    },
    {
      id: 't2',
      text: 'Aujourd\'hui, nous allons explorer les concepts fondamentaux qui vous permettront de comprendre comment les machines apprennent.',
      startTime: 5,
      endTime: 12
    },
    {
      id: 't3',
      text: 'Le machine learning est partout autour de nous : recommandations Netflix, reconnaissance vocale, voitures autonomes...',
      startTime: 12,
      endTime: 20
    },
    {
      id: 't4',
      text: 'Commençons par définir ce qu\'est réellement le machine learning.',
      startTime: 20,
      endTime: 25
    },
    {
      id: 't5',
      text: 'Il existe trois grands types d\'apprentissage automatique que nous devons distinguer.',
      startTime: 45,
      endTime: 52
    },
    {
      id: 't6',
      text: 'Premièrement, l\'apprentissage supervisé où nous fournissons des exemples étiquetés à l\'algorithme.',
      startTime: 52,
      endTime: 60
    },
    {
      id: 't7',
      text: 'Ensuite, l\'apprentissage non supervisé qui découvre des patterns cachés dans les données.',
      startTime: 85,
      endTime: 92
    },
    {
      id: 't8',
      text: 'Maintenant, explorons quelques algorithmes concrets que vous utiliserez fréquemment.',
      startTime: 120,
      endTime: 127
    },
    {
      id: 't9',
      text: 'La régression linéaire est souvent le premier algorithme que l\'on apprend car il est intuitif.',
      startTime: 127,
      endTime: 135
    },
    {
      id: 't10',
      text: 'En conclusion, nous avons couvert les bases essentielles pour commencer votre parcours en machine learning.',
      startTime: 180,
      endTime: 188
    }
  ],
  exercises: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Quel type d\'apprentissage utilise des données étiquetées ?',
      options: ['Apprentissage supervisé', 'Apprentissage non supervisé', 'Apprentissage par renforcement', 'Tous les types'],
      correctAnswer: 'Apprentissage supervisé',
      explanation: 'L\'apprentissage supervisé utilise des données d\'entraînement étiquetées pour apprendre les relations entre les entrées et les sorties.'
    },
    {
      id: 'q2',
      type: 'fill-blank',
      question: 'La _______ _______ est un algorithme simple et intuitif pour prédire des valeurs numériques.',
      correctAnswer: ['régression', 'linéaire'],
      explanation: 'La régression linéaire modélise la relation entre une variable dépendante et une ou plusieurs variables indépendantes en utilisant une équation linéaire.'
    },
    {
      id: 'q3',
      type: 'short-answer',
      question: 'Donnez un exemple d\'application de l\'apprentissage par renforcement.',
      correctAnswer: 'Jeux vidéo, voitures autonomes, trading algorithmique',
      explanation: 'L\'apprentissage par renforcement est idéal pour les situations où un agent doit apprendre à prendre des décisions séquentielles pour maximiser une récompense.'
    }
  ]
};