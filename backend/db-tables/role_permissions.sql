-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2025 at 06:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 2, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 3, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 4, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 5, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 6, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 7, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 8, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 9, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 10, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 11, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 12, '2024-07-20 08:19:33', '2024-07-20 08:19:33'),
(1, 17, '2025-02-15 06:22:02', '2025-02-15 06:22:02'),
(1, 18, '2025-02-15 06:22:24', '2025-02-15 06:22:24'),
(1, 19, '2025-02-15 06:22:31', '2025-02-15 06:22:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`roleId`,`permissionId`),
  ADD UNIQUE KEY `role_permissions_permissionId_roleId_unique` (`roleId`,`permissionId`),
  ADD KEY `permissionId` (`permissionId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
