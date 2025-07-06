# 📘 Cahier des charges technique – Ayan Bridge V2

## 🎯 Objectif général
Concevoir une plateforme numérique multifonctions réunissant :
- un magasin de produits digitaux
- un studio de création assistée par IA
- une académie éducative interactive
- un club d’investisseurs digitaux
- un tableau de bord utilisateur unique

## 1. 🔧 Technologies recommandées
- **Front-end** : React.js + Tailwind CSS
- **Back-end** : Node.js + Express
- **Base de données** : PostgreSQL ou MongoDB
- **Auth / Sécurité** : Firebase Auth ou Auth0 + HTTPS + chiffrement
- **Paiement** : Stripe (abonnement et achat unitaire)
- **Stockage fichiers** : AWS S3 ou Firebase Storage
- **Vidéo live / replay** : Zoom SDK, Jitsi, ou WebRTC
- **Génération IA** : Intégration via OpenAI API
- **Hébergement** : Vercel (front) + Render / Railway (API)

## 2. 🔐 Authentification & Rôles
- Email + mot de passe
- Google / Facebook Login (optionnel)

**Types d’utilisateurs** :
- Visiteur : accès vitrine
- Utilisateur inscrit : accès Learn Hub, produits, création
- Créateur : accès au Studio et espace de vente
- Investisseur : accès au Club
- Administrateur : gestion de l’ensemble des modules

## 3. 📦 Modules fonctionnels
... (voir fichier complet pour chaque module)

## 4. 📊 Statistiques & Reporting
... (voir fichier complet pour détails admin)

## 5. 🛡️ Sécurité & conformité
... RGPD compliant, modération, restriction studio

## 6. 🧪 Environnement de test
- Scénarios Jest + Cypress
- Tests UX

## 7. 📁 Livraison attendue
- Code documenté, back-office, API doc, responsive
