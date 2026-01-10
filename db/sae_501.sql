-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 11 jan. 2026 à 00:32
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
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `date_inscription` date DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `dtype` varchar(31) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`date_inscription`, `id`, `email`, `mot_de_passe`, `nom`, `prenom`, `role`, `dtype`) VALUES
('2025-01-10', 1, 'jean.dupont@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Dupont', 'Jean', 'ADMIN', 'ADMIN'),
('2025-02-12', 2, 'claire.martin@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Martin', 'Claire', 'FORMATEUR', 'FORMATEUR'),
('2025-02-20', 3, 'luc.bernard@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Bernard', 'luc', 'FORMATEUR', 'FORMATEUR'),
('2025-03-05', 4, 'paul.durand@example.com', '$2a$10$c8UM7vfvLUJfaBbHD61z/uu2dG.PBQbzljQLPgPWLtvXT32C126jG', 'Durand', 'Paul', 'UTILISATEUR', 'UTILISATEUR'),
('2026-01-05', 28, 'hamed@gmail', '$2a$10$3smWXVEWp5Cu/6JvfI6.x.Zsf4ji5YXdTbIC1qdXPbFY3JuJICXGq', 'souleymane', 'konate', 'UTILISAITEUR', 'UTILISATEUR'),
('2026-01-05', 36, 'hdk@gmail.com', '$2a$10$.gveAgG/uKbBNYwkPPva8eNdENmG8VTpwIOxacxbLjq7oVLxR96Dm', 'konate', 'hamed', 'UTILISATEUR', 'UTILISATEUR'),
(NULL, 37, 'sophie@example.com', '$2a$10$EhLcACynX2qJL3y.PZbQeOsim8A4StiA8IE5dr.kEqWmOz4qL4vqK', 'bois', 'sophie', 'UTILISATEUR', 'UTILISATEUR'),
(NULL, 38, 'luc@example.com', '$2a$10$XFDfIyY/LpWaAC9YPJndDeFDL9LavGRMVQ1egSmni3fkpIU1PV4EC', 'dupont', 'luc', 'UTILISATEUR', 'UTILISATEUR'),
(NULL, 39, 'sofiane@example.com', '$2a$10$4yab4zoce0dgegHgz3agbORtIAYQm9pmkqhHa3xI2db400mQ4X0.K', 'feuille', 'sofiane', 'UTILISATEUR', 'UTILISATEUR'),
(NULL, 40, 'halima@example.com', '$2a$10$xpOFTkiKrp66XDR3rXBa2.FVFWl6qs0bQvsJAt0Q.F7PNZDxbtTym', 'kone', 'halima', 'UTILISATEUR', 'UTILISATEUR'),
(NULL, 41, 'ibrahim@example.com', '$2a$10$iwfJECXd2y9xrpyIPcnV1OjSRnmVFlGF1zwoOEExULDVtVQLuJyqK', 'konate', 'ibrahim', 'UTILISATEUR', 'UTILISATEUR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
