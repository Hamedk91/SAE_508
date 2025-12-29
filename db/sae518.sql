-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 29 déc. 2025 à 12:48
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sae518`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `attestation`
--

CREATE TABLE `attestation` (
  `date_generation` date DEFAULT NULL,
  `evaluation_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `contenu` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie_formation`
--

CREATE TABLE `categorie_formation` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie_formation`
--

INSERT INTO `categorie_formation` (`id`, `nom`) VALUES
(1, 'Informatique'),
(2, 'Développement Web'),
(3, 'DevOps'),
(4, 'Data Science');

-- --------------------------------------------------------

--
-- Structure de la table `emargement`
--

CREATE TABLE `emargement` (
  `date_seance` date DEFAULT NULL,
  `present` bit(1) NOT NULL,
  `heure_arrivee` datetime(6) DEFAULT NULL,
  `heure_depart` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `inscription_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `evaluation`
--

CREATE TABLE `evaluation` (
  `date_evaluation` date DEFAULT NULL,
  `note_max` float NOT NULL,
  `note_obtenue` float NOT NULL,
  `formateur_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `inscription_id` bigint(20) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formateur`
--

CREATE TABLE `formateur` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formateur`
--

INSERT INTO `formateur` (`id`) VALUES
(2),
(3);

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `duree` int(11) NOT NULL,
  `prix` decimal(38,2) DEFAULT NULL,
  `categorie_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prerequis` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`duree`, `prix`, `categorie_id`, `id`, `description`, `prerequis`, `titre`) VALUES
(40, 200.00, 1, 1, 'Bases de l\'informatique et des systèmes', 'Aucun', 'Introduction à l\'informatique'),
(60, 350.00, 2, 2, 'HTML, CSS, JavaScript et frameworks modernes', 'Bases d\'informatique', 'Développement Web Front-End'),
(50, 400.00, 3, 3, 'Introduction à DevOps, Docker, Kubernetes et pipelines CI/CD', 'Connaissances en développement', 'DevOps et CI/CD'),
(45, 380.00, 4, 4, 'Analyse de données, pandas, numpy et visualisation', 'Bases en programmation Python', 'Data Science avec Python'),
(30, 180.00, 1, 5, 'Notions de base sur les réseaux et la sécurité informatique', 'Aucun', 'Réseaux et sécurité pour débutants'),
(25, 150.00, 1, 6, 'Compréhension des systèmes d’exploitation et gestion des fichiers', 'Bases de l\'informatique', 'Systèmes d\'exploitation'),
(35, 220.00, 1, 7, 'Introduction à la programmation avec Python', 'Aucun', 'Python pour débutants'),
(40, 200.00, 1, 8, 'Apprendre à utiliser les logiciels bureautiques essentiels', 'Aucun', 'Bureautique essentielle'),
(45, 250.00, 1, 9, 'Initiation à l’algorithmique et à la logique informatique', 'Aucun', 'Algorithmique et logique'),
(50, 400.00, 2, 10, 'Création de sites web dynamiques avec PHP et MySQL', 'Bases d\'informatique', 'Développement Web Back-End'),
(40, 350.00, 2, 11, 'Conception de sites responsive avec HTML, CSS, JS', 'Bases d\'informatique', 'Web Design Responsive'),
(45, 380.00, 2, 12, 'Apprendre React et Vue pour créer des applications modernes', 'HTML, CSS, JS', 'Frameworks Front-End avancés'),
(30, 200.00, 2, 13, 'Gestion de projets web avec Git et GitHub', 'Bases d\'informatique', 'Contrôle de version pour web'),
(35, 220.00, 2, 14, 'Création de boutiques en ligne avec WooCommerce et Shopify', 'Bases de développement Web', 'E-commerce Web'),
(40, 380.00, 3, 15, 'Automatisation des déploiements avec Jenkins', 'Connaissances en développement', 'CI/CD avec Jenkins'),
(35, 350.00, 3, 16, 'Gestion de conteneurs avec Docker', 'Connaissances en développement', 'Docker pour débutants'),
(50, 450.00, 3, 17, 'Orchestration avec Kubernetes', 'Docker et CI/CD', 'Kubernetes avancé'),
(30, 300.00, 3, 18, 'Surveillance et logs avec Prometheus et Grafana', 'Connaissances en développement', 'Monitoring DevOps'),
(45, 400.00, 3, 19, 'Infrastructure as Code avec Terraform', 'Bases DevOps', 'IaC avec Terraform'),
(40, 400.00, 4, 20, 'Exploration et analyse de données avec Python', 'Bases en programmation Python', 'Analyse exploratoire de données'),
(35, 350.00, 4, 21, 'Introduction à la Machine Learning avec scikit-learn', 'Bases en Python et statistiques', 'Machine Learning pour débutants'),
(50, 450.00, 4, 22, 'Visualisation avancée avec Matplotlib et Seaborn', 'Bases en Python', 'Data Viz avancée'),
(45, 400.00, 4, 23, 'Analyse statistique et probabilités appliquées', 'Bases en Python et maths', 'Statistiques appliquées'),
(30, 300.00, 4, 24, 'Traitement et analyse de données avec SQL', 'Bases en SQL et Python', 'SQL pour Data Science');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id` bigint(20) NOT NULL,
  `participant_id` bigint(20) DEFAULT NULL,
  `session_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `montant` decimal(38,2) DEFAULT NULL,
  `date_paiement` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `inscription_id` bigint(20) DEFAULT NULL,
  `methode` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `date_creation` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `participant_id` bigint(20) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier_session`
--

CREATE TABLE `panier_session` (
  `panier_id` bigint(20) NOT NULL,
  `session_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participant`
--

CREATE TABLE `participant` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `session_formation`
--

CREATE TABLE `session_formation` (
  `places_max` int(11) NOT NULL,
  `places_restantes` int(11) NOT NULL,
  `date_debut` datetime(6) DEFAULT NULL,
  `date_fin` datetime(6) DEFAULT NULL,
  `formateur_id` bigint(20) NOT NULL,
  `formation_id` bigint(20) NOT NULL,
  `id` bigint(20) NOT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `session_formation`
--

INSERT INTO `session_formation` (`places_max`, `places_restantes`, `date_debut`, `date_fin`, `formateur_id`, `formation_id`, `id`, `lieu`, `statut`) VALUES
(12, 12, '2025-06-01 09:00:00.000000', '2025-06-30 17:00:00.000000', 2, 1, 5, 'Paris', 'ouverte'),
(12, 12, '2025-07-05 09:00:00.000000', '2025-08-05 17:00:00.000000', 3, 2, 6, 'Lyon', 'ouverte'),
(12, 12, '2025-09-01 09:00:00.000000', '2025-09-30 17:00:00.000000', 2, 3, 7, 'Marseille', 'ouverte'),
(12, 12, '2025-10-01 09:00:00.000000', '2025-10-30 17:00:00.000000', 3, 4, 8, 'Toulouse', 'ouverte'),
(12, 12, '2026-01-10 09:00:00.000000', '2026-01-20 17:00:00.000000', 2, 1, 9, 'Paris', 'ouverte'),
(12, 12, '2026-01-05 09:00:00.000000', '2026-01-10 17:00:00.000000', 2, 1, 10, 'Paris', 'ouverte'),
(12, 12, '2026-02-01 09:00:00.000000', '2026-02-05 17:00:00.000000', 2, 1, 11, 'Paris', 'ouverte'),
(12, 12, '2026-03-01 09:00:00.000000', '2026-03-05 17:00:00.000000', 2, 1, 12, 'Paris', 'ouverte'),
(12, 12, '2026-04-01 09:00:00.000000', '2026-04-05 17:00:00.000000', 2, 1, 13, 'Paris', 'ouverte'),
(12, 12, '2026-05-01 09:00:00.000000', '2026-05-05 17:00:00.000000', 2, 1, 14, 'Paris', 'ouverte'),
(12, 12, '2026-06-01 09:00:00.000000', '2026-06-05 17:00:00.000000', 2, 1, 15, 'Paris', 'ouverte'),
(12, 12, '2026-07-01 09:00:00.000000', '2026-07-05 17:00:00.000000', 2, 1, 16, 'Paris', 'ouverte'),
(12, 12, '2026-08-01 09:00:00.000000', '2026-08-05 17:00:00.000000', 2, 1, 17, 'Paris', 'ouverte'),
(12, 12, '2026-09-01 09:00:00.000000', '2026-09-05 17:00:00.000000', 2, 1, 18, 'Paris', 'ouverte'),
(12, 12, '2026-10-01 09:00:00.000000', '2026-10-05 17:00:00.000000', 2, 1, 19, 'Paris', 'ouverte'),
(12, 12, '2026-01-10 09:00:00.000000', '2026-01-15 17:00:00.000000', 3, 2, 20, 'Lyon', 'ouverte'),
(12, 12, '2026-02-10 09:00:00.000000', '2026-02-15 17:00:00.000000', 3, 2, 21, 'Lyon', 'ouverte'),
(12, 12, '2026-03-10 09:00:00.000000', '2026-03-15 17:00:00.000000', 3, 2, 22, 'Lyon', 'ouverte'),
(12, 12, '2026-04-10 09:00:00.000000', '2026-04-15 17:00:00.000000', 3, 2, 23, 'Lyon', 'ouverte'),
(12, 12, '2026-05-10 09:00:00.000000', '2026-05-15 17:00:00.000000', 3, 2, 24, 'Lyon', 'ouverte'),
(12, 12, '2026-06-10 09:00:00.000000', '2026-06-15 17:00:00.000000', 3, 2, 25, 'Lyon', 'ouverte'),
(12, 12, '2026-07-10 09:00:00.000000', '2026-07-15 17:00:00.000000', 3, 2, 26, 'Lyon', 'ouverte'),
(12, 12, '2026-08-10 09:00:00.000000', '2026-08-15 17:00:00.000000', 3, 2, 27, 'Lyon', 'ouverte'),
(12, 12, '2026-09-10 09:00:00.000000', '2026-09-15 17:00:00.000000', 3, 2, 28, 'Lyon', 'ouverte'),
(12, 12, '2026-10-10 09:00:00.000000', '2026-10-15 17:00:00.000000', 3, 2, 29, 'Lyon', 'ouverte'),
(12, 12, '2026-01-15 09:00:00.000000', '2026-01-20 17:00:00.000000', 2, 3, 30, 'Marseille', 'ouverte'),
(12, 12, '2026-02-15 09:00:00.000000', '2026-02-20 17:00:00.000000', 2, 3, 31, 'Marseille', 'ouverte'),
(12, 12, '2026-03-15 09:00:00.000000', '2026-03-20 17:00:00.000000', 2, 3, 32, 'Marseille', 'ouverte'),
(12, 12, '2026-04-15 09:00:00.000000', '2026-04-20 17:00:00.000000', 2, 3, 33, 'Marseille', 'ouverte'),
(12, 12, '2026-05-15 09:00:00.000000', '2026-05-20 17:00:00.000000', 2, 3, 34, 'Marseille', 'ouverte'),
(12, 12, '2026-06-15 09:00:00.000000', '2026-06-20 17:00:00.000000', 2, 3, 35, 'Marseille', 'ouverte'),
(12, 12, '2026-07-15 09:00:00.000000', '2026-07-20 17:00:00.000000', 2, 3, 36, 'Marseille', 'ouverte'),
(12, 12, '2026-08-15 09:00:00.000000', '2026-08-20 17:00:00.000000', 2, 3, 37, 'Marseille', 'ouverte'),
(12, 12, '2026-09-15 09:00:00.000000', '2026-09-20 17:00:00.000000', 2, 3, 38, 'Marseille', 'ouverte'),
(12, 12, '2026-10-15 09:00:00.000000', '2026-10-20 17:00:00.000000', 2, 3, 39, 'Marseille', 'ouverte'),
(12, 12, '2026-01-20 09:00:00.000000', '2026-01-25 17:00:00.000000', 3, 4, 40, 'Toulouse', 'ouverte'),
(12, 12, '2026-02-20 09:00:00.000000', '2026-02-25 17:00:00.000000', 3, 4, 41, 'Toulouse', 'ouverte'),
(12, 12, '2026-03-20 09:00:00.000000', '2026-03-25 17:00:00.000000', 3, 4, 42, 'Toulouse', 'ouverte'),
(12, 12, '2026-04-20 09:00:00.000000', '2026-04-25 17:00:00.000000', 3, 4, 43, 'Toulouse', 'ouverte'),
(12, 12, '2026-05-20 09:00:00.000000', '2026-05-25 17:00:00.000000', 3, 4, 44, 'Toulouse', 'ouverte'),
(12, 12, '2026-06-20 09:00:00.000000', '2026-06-25 17:00:00.000000', 3, 4, 45, 'Toulouse', 'ouverte'),
(12, 12, '2026-07-20 09:00:00.000000', '2026-07-25 17:00:00.000000', 3, 4, 46, 'Toulouse', 'ouverte'),
(12, 12, '2026-08-20 09:00:00.000000', '2026-08-25 17:00:00.000000', 3, 4, 47, 'Toulouse', 'ouverte'),
(12, 12, '2026-09-20 09:00:00.000000', '2026-09-25 17:00:00.000000', 3, 4, 48, 'Toulouse', 'ouverte'),
(12, 12, '2026-10-20 09:00:00.000000', '2026-10-25 17:00:00.000000', 3, 4, 49, 'Toulouse', 'ouverte'),
(12, 12, '2026-01-05 09:00:00.000000', '2026-01-10 17:00:00.000000', 2, 5, 50, 'Paris', 'ouverte'),
(12, 12, '2026-02-05 09:00:00.000000', '2026-02-10 17:00:00.000000', 2, 5, 51, 'Paris', 'ouverte'),
(12, 12, '2026-03-05 09:00:00.000000', '2026-03-10 17:00:00.000000', 2, 5, 52, 'Paris', 'ouverte'),
(12, 12, '2026-04-05 09:00:00.000000', '2026-04-10 17:00:00.000000', 2, 5, 53, 'Paris', 'ouverte'),
(12, 12, '2026-05-05 09:00:00.000000', '2026-05-10 17:00:00.000000', 2, 5, 54, 'Paris', 'ouverte'),
(12, 12, '2026-06-05 09:00:00.000000', '2026-06-10 17:00:00.000000', 2, 5, 55, 'Paris', 'ouverte'),
(12, 12, '2026-07-05 09:00:00.000000', '2026-07-10 17:00:00.000000', 2, 5, 56, 'Paris', 'ouverte'),
(12, 12, '2026-08-05 09:00:00.000000', '2026-08-10 17:00:00.000000', 2, 5, 57, 'Paris', 'ouverte'),
(12, 12, '2026-09-05 09:00:00.000000', '2026-09-10 17:00:00.000000', 2, 5, 58, 'Paris', 'ouverte'),
(12, 12, '2026-10-05 09:00:00.000000', '2026-10-10 17:00:00.000000', 2, 5, 59, 'Paris', 'ouverte'),
(12, 12, '2026-01-06 09:00:00.000000', '2026-01-11 17:00:00.000000', 2, 6, 60, 'Lyon', 'ouverte'),
(12, 12, '2026-02-06 09:00:00.000000', '2026-02-11 17:00:00.000000', 2, 6, 61, 'Lyon', 'ouverte'),
(12, 12, '2026-03-06 09:00:00.000000', '2026-03-11 17:00:00.000000', 2, 6, 62, 'Lyon', 'ouverte'),
(12, 12, '2026-04-06 09:00:00.000000', '2026-04-11 17:00:00.000000', 2, 6, 63, 'Lyon', 'ouverte'),
(12, 12, '2026-05-06 09:00:00.000000', '2026-05-11 17:00:00.000000', 2, 6, 64, 'Lyon', 'ouverte'),
(12, 12, '2026-06-06 09:00:00.000000', '2026-06-11 17:00:00.000000', 2, 6, 65, 'Lyon', 'ouverte'),
(12, 12, '2026-07-06 09:00:00.000000', '2026-07-11 17:00:00.000000', 2, 6, 66, 'Lyon', 'ouverte'),
(12, 12, '2026-08-06 09:00:00.000000', '2026-08-11 17:00:00.000000', 2, 6, 67, 'Lyon', 'ouverte'),
(12, 12, '2026-09-06 09:00:00.000000', '2026-09-11 17:00:00.000000', 2, 6, 68, 'Lyon', 'ouverte'),
(12, 12, '2026-10-06 09:00:00.000000', '2026-10-11 17:00:00.000000', 2, 6, 69, 'Lyon', 'ouverte'),
(12, 12, '2026-01-07 09:00:00.000000', '2026-01-12 17:00:00.000000', 2, 7, 70, 'Marseille', 'ouverte'),
(12, 12, '2026-02-07 09:00:00.000000', '2026-02-12 17:00:00.000000', 2, 7, 71, 'Marseille', 'ouverte'),
(12, 12, '2026-03-07 09:00:00.000000', '2026-03-12 17:00:00.000000', 2, 7, 72, 'Marseille', 'ouverte'),
(12, 12, '2026-04-07 09:00:00.000000', '2026-04-12 17:00:00.000000', 2, 7, 73, 'Marseille', 'ouverte'),
(12, 12, '2026-05-07 09:00:00.000000', '2026-05-12 17:00:00.000000', 2, 7, 74, 'Marseille', 'ouverte'),
(12, 12, '2026-06-07 09:00:00.000000', '2026-06-12 17:00:00.000000', 2, 7, 75, 'Marseille', 'ouverte'),
(12, 12, '2026-07-07 09:00:00.000000', '2026-07-12 17:00:00.000000', 2, 7, 76, 'Marseille', 'ouverte'),
(12, 12, '2026-08-07 09:00:00.000000', '2026-08-12 17:00:00.000000', 2, 7, 77, 'Marseille', 'ouverte'),
(12, 12, '2026-09-07 09:00:00.000000', '2026-09-12 17:00:00.000000', 2, 7, 78, 'Marseille', 'ouverte'),
(12, 12, '2026-10-07 09:00:00.000000', '2026-10-12 17:00:00.000000', 2, 7, 79, 'Marseille', 'ouverte'),
(12, 12, '2026-01-08 09:00:00.000000', '2026-01-13 17:00:00.000000', 2, 8, 80, 'Toulouse', 'ouverte'),
(12, 12, '2026-02-08 09:00:00.000000', '2026-02-13 17:00:00.000000', 2, 8, 81, 'Toulouse', 'ouverte'),
(12, 12, '2026-03-08 09:00:00.000000', '2026-03-13 17:00:00.000000', 2, 8, 82, 'Toulouse', 'ouverte'),
(12, 12, '2026-04-08 09:00:00.000000', '2026-04-13 17:00:00.000000', 2, 8, 83, 'Toulouse', 'ouverte'),
(12, 12, '2026-05-08 09:00:00.000000', '2026-05-13 17:00:00.000000', 2, 8, 84, 'Toulouse', 'ouverte'),
(12, 12, '2026-06-08 09:00:00.000000', '2026-06-13 17:00:00.000000', 2, 8, 85, 'Toulouse', 'ouverte'),
(12, 12, '2026-07-08 09:00:00.000000', '2026-07-13 17:00:00.000000', 2, 8, 86, 'Toulouse', 'ouverte'),
(12, 12, '2026-08-08 09:00:00.000000', '2026-08-13 17:00:00.000000', 2, 8, 87, 'Toulouse', 'ouverte'),
(12, 12, '2026-09-08 09:00:00.000000', '2026-09-13 17:00:00.000000', 2, 8, 88, 'Toulouse', 'ouverte'),
(12, 12, '2026-10-08 09:00:00.000000', '2026-10-13 17:00:00.000000', 2, 8, 89, 'Toulouse', 'ouverte'),
(12, 12, '2026-01-09 09:00:00.000000', '2026-01-14 17:00:00.000000', 2, 9, 90, 'Nice', 'ouverte'),
(12, 12, '2026-02-09 09:00:00.000000', '2026-02-14 17:00:00.000000', 2, 9, 91, 'Nice', 'ouverte'),
(12, 12, '2026-03-09 09:00:00.000000', '2026-03-14 17:00:00.000000', 2, 9, 92, 'Nice', 'ouverte'),
(12, 12, '2026-04-09 09:00:00.000000', '2026-04-14 17:00:00.000000', 2, 9, 93, 'Nice', 'ouverte'),
(12, 12, '2026-05-09 09:00:00.000000', '2026-05-14 17:00:00.000000', 2, 9, 94, 'Nice', 'ouverte'),
(12, 12, '2026-06-09 09:00:00.000000', '2026-06-14 17:00:00.000000', 2, 9, 95, 'Nice', 'ouverte'),
(12, 12, '2026-07-09 09:00:00.000000', '2026-07-14 17:00:00.000000', 2, 9, 96, 'Nice', 'ouverte'),
(12, 12, '2026-08-09 09:00:00.000000', '2026-08-14 17:00:00.000000', 2, 9, 97, 'Nice', 'ouverte'),
(12, 12, '2026-09-09 09:00:00.000000', '2026-09-14 17:00:00.000000', 2, 9, 98, 'Nice', 'ouverte'),
(12, 12, '2026-10-09 09:00:00.000000', '2026-10-14 17:00:00.000000', 2, 9, 99, 'Nice', 'ouverte'),
(12, 12, '2026-01-10 09:00:00.000000', '2026-01-15 17:00:00.000000', 3, 10, 100, 'Lyon', 'ouverte'),
(12, 12, '2026-02-10 09:00:00.000000', '2026-02-15 17:00:00.000000', 3, 10, 101, 'Lyon', 'ouverte'),
(12, 12, '2026-03-10 09:00:00.000000', '2026-03-15 17:00:00.000000', 3, 10, 102, 'Lyon', 'ouverte'),
(12, 12, '2026-04-10 09:00:00.000000', '2026-04-15 17:00:00.000000', 3, 10, 103, 'Lyon', 'ouverte'),
(12, 12, '2026-05-10 09:00:00.000000', '2026-05-15 17:00:00.000000', 3, 10, 104, 'Lyon', 'ouverte'),
(12, 12, '2026-06-10 09:00:00.000000', '2026-06-15 17:00:00.000000', 3, 10, 105, 'Lyon', 'ouverte'),
(12, 12, '2026-07-10 09:00:00.000000', '2026-07-15 17:00:00.000000', 3, 10, 106, 'Lyon', 'ouverte'),
(12, 12, '2026-08-10 09:00:00.000000', '2026-08-15 17:00:00.000000', 3, 10, 107, 'Lyon', 'ouverte'),
(12, 12, '2026-09-10 09:00:00.000000', '2026-09-15 17:00:00.000000', 3, 10, 108, 'Lyon', 'ouverte'),
(12, 12, '2026-10-10 09:00:00.000000', '2026-10-15 17:00:00.000000', 3, 10, 109, 'Lyon', 'ouverte'),
(12, 12, '2026-01-11 09:00:00.000000', '2026-01-16 17:00:00.000000', 3, 11, 110, 'Paris', 'ouverte'),
(12, 12, '2026-02-11 09:00:00.000000', '2026-02-16 17:00:00.000000', 3, 11, 111, 'Paris', 'ouverte'),
(12, 12, '2026-03-11 09:00:00.000000', '2026-03-16 17:00:00.000000', 3, 11, 112, 'Paris', 'ouverte'),
(12, 12, '2026-04-11 09:00:00.000000', '2026-04-16 17:00:00.000000', 3, 11, 113, 'Paris', 'ouverte'),
(12, 12, '2026-05-11 09:00:00.000000', '2026-05-16 17:00:00.000000', 3, 11, 114, 'Paris', 'ouverte'),
(12, 12, '2026-06-11 09:00:00.000000', '2026-06-16 17:00:00.000000', 3, 11, 115, 'Paris', 'ouverte'),
(12, 12, '2026-07-11 09:00:00.000000', '2026-07-16 17:00:00.000000', 3, 11, 116, 'Paris', 'ouverte'),
(12, 12, '2026-08-11 09:00:00.000000', '2026-08-16 17:00:00.000000', 3, 11, 117, 'Paris', 'ouverte'),
(12, 12, '2026-09-11 09:00:00.000000', '2026-09-16 17:00:00.000000', 3, 11, 118, 'Paris', 'ouverte'),
(12, 12, '2026-10-11 09:00:00.000000', '2026-10-16 17:00:00.000000', 3, 11, 119, 'Paris', 'ouverte'),
(12, 12, '2026-01-12 09:00:00.000000', '2026-01-17 17:00:00.000000', 3, 12, 120, 'Lille', 'ouverte'),
(12, 12, '2026-02-12 09:00:00.000000', '2026-02-17 17:00:00.000000', 3, 12, 121, 'Lille', 'ouverte'),
(12, 12, '2026-03-12 09:00:00.000000', '2026-03-17 17:00:00.000000', 3, 12, 122, 'Lille', 'ouverte'),
(12, 12, '2026-04-12 09:00:00.000000', '2026-04-17 17:00:00.000000', 3, 12, 123, 'Lille', 'ouverte'),
(12, 12, '2026-05-12 09:00:00.000000', '2026-05-17 17:00:00.000000', 3, 12, 124, 'Lille', 'ouverte'),
(12, 12, '2026-06-12 09:00:00.000000', '2026-06-17 17:00:00.000000', 3, 12, 125, 'Lille', 'ouverte'),
(12, 12, '2026-07-12 09:00:00.000000', '2026-07-17 17:00:00.000000', 3, 12, 126, 'Lille', 'ouverte'),
(12, 12, '2026-08-12 09:00:00.000000', '2026-08-17 17:00:00.000000', 3, 12, 127, 'Lille', 'ouverte'),
(12, 12, '2026-09-12 09:00:00.000000', '2026-09-17 17:00:00.000000', 3, 12, 128, 'Lille', 'ouverte'),
(12, 12, '2026-10-12 09:00:00.000000', '2026-10-17 17:00:00.000000', 3, 12, 129, 'Lille', 'ouverte'),
(12, 12, '2026-01-13 09:00:00.000000', '2026-01-18 17:00:00.000000', 3, 13, 130, 'Bordeaux', 'ouverte'),
(12, 12, '2026-02-13 09:00:00.000000', '2026-02-18 17:00:00.000000', 3, 13, 131, 'Bordeaux', 'ouverte'),
(12, 12, '2026-03-13 09:00:00.000000', '2026-03-18 17:00:00.000000', 3, 13, 132, 'Bordeaux', 'ouverte'),
(12, 12, '2026-04-13 09:00:00.000000', '2026-04-18 17:00:00.000000', 3, 13, 133, 'Bordeaux', 'ouverte'),
(12, 12, '2026-05-13 09:00:00.000000', '2026-05-18 17:00:00.000000', 3, 13, 134, 'Bordeaux', 'ouverte'),
(12, 12, '2026-06-13 09:00:00.000000', '2026-06-18 17:00:00.000000', 3, 13, 135, 'Bordeaux', 'ouverte'),
(12, 12, '2026-07-13 09:00:00.000000', '2026-07-18 17:00:00.000000', 3, 13, 136, 'Bordeaux', 'ouverte'),
(12, 12, '2026-08-13 09:00:00.000000', '2026-08-18 17:00:00.000000', 3, 13, 137, 'Bordeaux', 'ouverte'),
(12, 12, '2026-09-13 09:00:00.000000', '2026-09-18 17:00:00.000000', 3, 13, 138, 'Bordeaux', 'ouverte'),
(12, 12, '2026-10-13 09:00:00.000000', '2026-10-18 17:00:00.000000', 3, 13, 139, 'Bordeaux', 'ouverte'),
(12, 12, '2026-01-14 09:00:00.000000', '2026-01-19 17:00:00.000000', 3, 14, 140, 'Nantes', 'ouverte'),
(12, 12, '2026-02-14 09:00:00.000000', '2026-02-19 17:00:00.000000', 3, 14, 141, 'Nantes', 'ouverte'),
(12, 12, '2026-03-14 09:00:00.000000', '2026-03-19 17:00:00.000000', 3, 14, 142, 'Nantes', 'ouverte'),
(12, 12, '2026-04-14 09:00:00.000000', '2026-04-19 17:00:00.000000', 3, 14, 143, 'Nantes', 'ouverte'),
(12, 12, '2026-05-14 09:00:00.000000', '2026-05-19 17:00:00.000000', 3, 14, 144, 'Nantes', 'ouverte'),
(12, 12, '2026-06-14 09:00:00.000000', '2026-06-19 17:00:00.000000', 3, 14, 145, 'Nantes', 'ouverte'),
(12, 12, '2026-07-14 09:00:00.000000', '2026-07-19 17:00:00.000000', 3, 14, 146, 'Nantes', 'ouverte'),
(12, 12, '2026-08-14 09:00:00.000000', '2026-08-19 17:00:00.000000', 3, 14, 147, 'Nantes', 'ouverte'),
(12, 12, '2026-09-14 09:00:00.000000', '2026-09-19 17:00:00.000000', 3, 14, 148, 'Nantes', 'ouverte'),
(12, 12, '2026-10-14 09:00:00.000000', '2026-10-19 17:00:00.000000', 3, 14, 149, 'Nantes', 'ouverte'),
(12, 12, '2025-11-01 09:00:00.000000', '2025-11-05 17:00:00.000000', 3, 20, 150, 'Lyon', 'ouverte'),
(12, 12, '2025-12-01 09:00:00.000000', '2025-12-05 17:00:00.000000', 3, 21, 151, 'Lyon', 'ouverte'),
(12, 12, '2026-01-01 09:00:00.000000', '2026-01-05 17:00:00.000000', 3, 22, 152, 'Lyon', 'ouverte'),
(12, 12, '2026-02-01 09:00:00.000000', '2026-02-05 17:00:00.000000', 3, 23, 153, 'Lyon', 'ouverte'),
(12, 12, '2026-03-01 09:00:00.000000', '2026-03-05 17:00:00.000000', 3, 24, 154, 'Lyon', 'ouverte'),
(12, 12, '2025-11-01 09:00:00.000000', '2025-11-05 17:00:00.000000', 2, 15, 155, 'Paris', 'ouverte'),
(12, 12, '2025-12-01 09:00:00.000000', '2025-12-05 17:00:00.000000', 2, 16, 156, 'Paris', 'ouverte'),
(12, 12, '2026-01-01 09:00:00.000000', '2026-01-05 17:00:00.000000', 2, 17, 157, 'Paris', 'ouverte'),
(12, 12, '2026-02-01 09:00:00.000000', '2026-02-05 17:00:00.000000', 2, 18, 158, 'Paris', 'ouverte'),
(12, 12, '2026-03-01 09:00:00.000000', '2026-03-05 17:00:00.000000', 2, 19, 159, 'Paris', 'ouverte');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `date_inscription` date DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`date_inscription`, `id`, `email`, `mot_de_passe`, `nom`, `prenom`, `role`) VALUES
('2025-01-10', 1, 'jean.dupont@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Dupont', 'Jean', 'ADMIN'),
('2025-02-12', 2, 'claire.martin@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Martin', 'Claire', 'FORMATEUR'),
('2025-02-20', 3, 'luc.bernard@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Bernard', 'Luc', 'FORMATEUR'),
('2025-03-05', 4, 'paul.durand@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Durand', 'Paul', 'UTILISATEUR'),
('2025-03-10', 5, 'sophie.leroy@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Leroy', 'Sophie', 'UTILISATEUR'),
('2025-03-15', 6, 'marie.petit@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'grand', 'Marie', 'UTILISATEUR'),
('2025-03-18', 7, 'antoine.moreau@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Moreau', 'Antoine', 'UTILISATEUR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `attestation`
--
ALTER TABLE `attestation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKj15ksvprrhx9k4vvma1b3821y` (`evaluation_id`);

--
-- Index pour la table `categorie_formation`
--
ALTER TABLE `categorie_formation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `emargement`
--
ALTER TABLE `emargement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6m360jmo14n2q2pcfj8vstvw8` (`inscription_id`);

--
-- Index pour la table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKkgcx67xw2lrtncq23n5nehpuo` (`inscription_id`),
  ADD KEY `FKbpivsmr0rk4u1vy9dwtannhnu` (`formateur_id`);

--
-- Index pour la table `formateur`
--
ALTER TABLE `formateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeqe2fppj8ei7uxy9jog7s1e4u` (`categorie_id`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKs3o8j8be0pnl7232ml8y6tq7r` (`participant_id`),
  ADD KEY `FK82v12jnan0u2h5j51emq2uwda` (`session_id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK3b2t7anli9go09x0gelmjyxls` (`inscription_id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK3yd6upuci5j4nm42i1bpktmii` (`participant_id`);

--
-- Index pour la table `panier_session`
--
ALTER TABLE `panier_session`
  ADD KEY `FK4i33wp8rwn4t0civnk0evxluu` (`session_id`),
  ADD KEY `FK88mibf316vo591iox2nkx4bgb` (`panier_id`);

--
-- Index pour la table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `session_formation`
--
ALTER TABLE `session_formation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK881ll90qpn9a2ub6ji012y3p5` (`formateur_id`),
  ADD KEY `FKifvwsp4kg8086jk5vg43c1fuw` (`formation_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attestation`
--
ALTER TABLE `attestation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categorie_formation`
--
ALTER TABLE `categorie_formation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `emargement`
--
ALTER TABLE `emargement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `session_formation`
--
ALTER TABLE `session_formation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD CONSTRAINT `FKawt6kv01mreprfwbksw65mm8y` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `attestation`
--
ALTER TABLE `attestation`
  ADD CONSTRAINT `FK32djqeuh0q8wgi23f3dho6hn4` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluation` (`id`);

--
-- Contraintes pour la table `emargement`
--
ALTER TABLE `emargement`
  ADD CONSTRAINT `FK6m360jmo14n2q2pcfj8vstvw8` FOREIGN KEY (`inscription_id`) REFERENCES `inscription` (`id`);

--
-- Contraintes pour la table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `FKbpivsmr0rk4u1vy9dwtannhnu` FOREIGN KEY (`formateur_id`) REFERENCES `formateur` (`id`),
  ADD CONSTRAINT `FKd6lx859khdr27xo6ywur36ilw` FOREIGN KEY (`inscription_id`) REFERENCES `inscription` (`id`);

--
-- Contraintes pour la table `formateur`
--
ALTER TABLE `formateur`
  ADD CONSTRAINT `FKl2dovj3y7isqbwa0lrpc04m60` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `formation`
--
ALTER TABLE `formation`
  ADD CONSTRAINT `FKeqe2fppj8ei7uxy9jog7s1e4u` FOREIGN KEY (`categorie_id`) REFERENCES `categorie_formation` (`id`);

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `FK82v12jnan0u2h5j51emq2uwda` FOREIGN KEY (`session_id`) REFERENCES `session_formation` (`id`),
  ADD CONSTRAINT `FKs3o8j8be0pnl7232ml8y6tq7r` FOREIGN KEY (`participant_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `FKg0m4gl53rqm48tbtrwdw2miph` FOREIGN KEY (`inscription_id`) REFERENCES `inscription` (`id`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `FKjgur8gbxpo4mj3av81qdhn6na` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`id`);

--
-- Contraintes pour la table `panier_session`
--
ALTER TABLE `panier_session`
  ADD CONSTRAINT `FK4i33wp8rwn4t0civnk0evxluu` FOREIGN KEY (`session_id`) REFERENCES `session_formation` (`id`),
  ADD CONSTRAINT `FK88mibf316vo591iox2nkx4bgb` FOREIGN KEY (`panier_id`) REFERENCES `panier` (`id`);

--
-- Contraintes pour la table `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `FK7e5fq2sm9cq2f48mytt0r1ge8` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `session_formation`
--
ALTER TABLE `session_formation`
  ADD CONSTRAINT `FK881ll90qpn9a2ub6ji012y3p5` FOREIGN KEY (`formateur_id`) REFERENCES `formateur` (`id`),
  ADD CONSTRAINT `FKifvwsp4kg8086jk5vg43c1fuw` FOREIGN KEY (`formation_id`) REFERENCES `formation` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
