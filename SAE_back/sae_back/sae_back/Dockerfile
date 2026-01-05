# Utiliser Java 17
FROM eclipse-temurin:17-jdk

# Créer le dossier de travail
WORKDIR /app

# Copier Maven wrapper et dossier .mvn
COPY mvnw .
COPY .mvn .mvn

# Copier pom.xml et le code source
COPY pom.xml .
COPY src ./src

# Rendre mvnw exécutable
RUN chmod +x ./mvnw

# Compiler le projet (ignorer les tests)
RUN ./mvnw package -DskipTests

# Exposer le port 8080
EXPOSE 8080

# Lancer l'application
CMD ["java", "-jar", "target/*.jar"]
