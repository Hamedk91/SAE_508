# Étape 1 : construire l'application
FROM node:20-alpine AS build

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : serveur pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits dans le dossier de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]

