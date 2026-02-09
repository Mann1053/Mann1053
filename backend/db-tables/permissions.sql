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
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'create_user', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(2, 'update_user', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(3, 'view_user', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(4, 'delete_user', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(5, 'create_role', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(6, 'update_role', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(7, 'view_role', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(8, 'delete_role', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(9, 'create_permission', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(10, 'update_permission', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(11, 'view_permission', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(12, 'delete_permission', '2024-07-20 12:48:32', '2024-07-20 12:48:32'),
(17, 'view_faq', '2025-02-15 06:19:34', '2025-02-15 06:19:34'),
(18, 'view_about', '2025-02-15 06:19:47', '2025-02-15 06:19:47'),
(19, 'view_dashboard', '2025-02-15 06:20:04', '2025-02-15 06:20:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
