# 1. Utiliser Node.js version 18 comme base
FROM node:18

# 2. Créer le dossier où le code va vivre dans Docker
WORKDIR /app

# 3. Copier les fichiers de dépendances
COPY package*.json ./

# 4. Installer les bibliothèques (express, sqlite3, etc.)
RUN npm install

# 5. Copier tout le reste de ton code (server.js, etc.)
COPY . .

# 6. Ouvrir le port 3000 
EXPOSE 3000

# 7. Lancer le serveur en utilisant le script qu'on a mis dans package.json
CMD ["npm", "start"]
