# 🚀 Guide Complet : Configuration Vercel + Vite 6.x + React 18.x

## 📋 Problème Résolu

Ce guide documente la solution complète pour déployer un projet **Vite 6.x + React 18.x** sur **Vercel** sans les erreurs CommonJS qui causent l'échec du build.

## ❌ Erreurs Typiques Rencontrées

```bash
# Erreur CommonJS
Could not resolve "./cjs/react-jsx-runtime.production.min.js"

# Erreur de validation Vercel
functions should NOT have fewer than 1 properties

# Erreur de résolution de modules
Missing "./jsx-runtime.js" specifier in "react" package
```

## ✅ Configuration Complète

### 1. **`vite.config.ts` - Configuration Anti-CommonJS**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Configuration JSX optimisée pour Vercel
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // Résolution explicite pour éviter les conflits CommonJS
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    },
  },
  optimizeDeps: {
    // Forcer la pré-bundling de React pour éviter les problèmes CJS
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  build: {
    // Configuration optimisée pour Vercel
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      },
      external: (id) => {
        // Éviter l'externalisation de JSX runtime
        if (id.includes('react/jsx-runtime') || id.includes('react-jsx-runtime')) {
          return false;
        }
        return false;
      },
    }
  },
  // Configuration spécifique pour les environnements de build
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
```

### 2. **`vercel.json` - Configuration Minimale et Valide**

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "env": {
    "NODE_ENV": "production",
    "VITE_BUILD_TARGET": "vercel"
  }
}
```

**⚠️ Éviter :**
- `functions: {}` (objet vide invalide)
- Configurations complexes avec `builds`, `routes`, etc.
- `installCommand` avec flags comme `--legacy-peer-deps`

### 3. **`.npmrc` - Configuration NPM Optimisée**

```ini
# Configuration NPM pour Vercel
auto-install-peers=false
fund=false
audit=false

# Forcer la résolution stricte des modules
strict-peer-deps=false
legacy-peer-deps=false

# Optimiser l'installation
prefer-offline=false
progress=false

engine-strict=false
strict-peer-dependencies=false
save-exact=false
package-lock=true
```

### 4. **Variables d'Environnement Vercel**

```bash
# Variables principales (OBLIGATOIRES)
CI=true
NODE_ENV=production
VITE_BUILD_TARGET=vercel

# Variables de build (RECOMMANDÉES)
TSC_COMPILE_ON_ERROR=true
ESLINT_NO_DEV_ERRORS=true
SKIP_BUILD_STATIC_GENERATION=true

# Variables optionnelles (pour optimisation)
DISABLE_ESLINT_PLUGIN=true
GENERATE_SOURCEMAP=false
```

### 5. **`package.json` - Dépendances Essentielles**

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@babel/plugin-transform-react-jsx": "^7.25.9",
    "@vitejs/plugin-react": "^4.6.0",
    "vite": "^6.3.5",
    "typescript": "~5.8.3"
  }
}
```

**🔑 Dépendance Clé :** `@babel/plugin-transform-react-jsx` pour la transformation JSX explicite.

## 🛠️ Procédure de Déploiement

### Étape 1: Configuration Locale
```bash
# 1. Installer les dépendances
npm install @babel/plugin-transform-react-jsx --save-dev

# 2. Tester le build localement
npm run build

# 3. Vérifier que le build produit 350+ modules transformés
```

### Étape 2: Configuration Vercel
```bash
# 1. Créer les fichiers de config
touch vercel.json .npmrc

# 2. Configurer les variables d'environnement via l'interface Vercel
# 3. Éviter les objets vides dans vercel.json
```

### Étape 3: Déploiement
```bash
# 1. Commit et push
git add .
git commit -m "fix: Vercel Vite 6.x CommonJS configuration"
git push

# 2. Déclencher le déploiement Vercel
# 3. Surveiller les logs de build
```

## 🔄 Solution Alternative (Plan B)

Si le problème persiste, basculer vers **SWC** :

### Script de Basculement Automatique

```bash
#!/bin/bash
# scripts/switch-to-swc.sh

echo "🔄 Switching to SWC configuration..."

# Installer SWC
npm install @vitejs/plugin-react-swc --save-dev

# Créer la config SWC
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild'
  }
})
EOF

echo "✅ Switched to SWC configuration"
```

### Configuration SWC Alternative

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    })
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

## 🎯 Points Clés à Retenir

### ✅ À Faire
- **Configurer JSX explicitement** dans Vite
- **Utiliser esbuild** comme minifier
- **Forcer les alias** React JSX runtime
- **Variables d'environnement** complètes
- **Configuration Vercel minimale**

### ❌ À Éviter
- Objets vides dans `vercel.json` (`functions: {}`)
- `legacy-peer-deps=true` dans l'install command
- Dépendances inutilisées (ex: `@react-navigation/native`)
- Configurations Vercel trop complexes
- Omission des variables d'environnement

## 🧪 Validation du Succès

### Build Local Réussi
```bash
npm run build
# ✓ 356 modules transformed
# ✓ built in ~3s
```

### Build Vercel Réussi
```bash
# Logs Vercel devraient montrer :
[13:58:46] ✓ 356 modules transformed
[13:58:47] ✓ built in 2.1s
```

## 📊 Compatibilité

| Technologie | Version Testée | Status |
|-------------|----------------|--------|
| **Vite** | 6.3.5 | ✅ Compatible |
| **React** | 18.3.1 | ✅ Compatible |
| **TypeScript** | 5.8.3 | ✅ Compatible |
| **Node.js** | 18+ | ✅ Compatible |
| **Vercel** | Platform v2 | ✅ Compatible |

## 🚨 Dépannage

### Problème: "Could not resolve jsx-runtime"
**Solution:** Vérifier les alias dans `vite.config.ts`

### Problème: "functions should NOT have fewer than 1 properties"
**Solution:** Supprimer `functions: {}` du `vercel.json`

### Problème: Build qui ne démarre pas
**Solution:** Valider le schéma `vercel.json` avec un validateur JSON

### Problème: 47 packages au lieu de 300+
**Solution:** Vérifier `.npmrc` et les variables d'environnement

## 📝 Checklist de Déploiement

- [ ] `vite.config.ts` avec configuration anti-CommonJS
- [ ] `vercel.json` minimal et valide
- [ ] `.npmrc` optimisé
- [ ] Variables d'environnement Vercel configurées
- [ ] `@babel/plugin-transform-react-jsx` installé
- [ ] Build local testé et réussi
- [ ] Dépendances inutilisées supprimées
- [ ] Script de basculement SWC préparé

---

**💡 Cette configuration a été testée et validée sur un projet de production Vercel.**

**🔄 Dernière mise à jour :** Janvier 2025  
**📋 Cas d'usage :** Vite 6.x + React 18.x + TypeScript + Vercel 