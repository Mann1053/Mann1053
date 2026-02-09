-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2025 at 06:13 AM
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
-- Table structure for table `sdr`
--

CREATE TABLE `sdr` (
  `id` int(11) NOT NULL,
  `mobile_number` bigint(20) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `father_husband_name` varchar(100) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT 'Indian',
  `profession` varchar(100) DEFAULT NULL,
  `alt_mobile` bigint(20) DEFAULT NULL,
  `email_id` varchar(128) DEFAULT NULL,
  `loc_addr` varchar(355) NOT NULL,
  `loc_addr_pin` int(11) DEFAULT NULL,
  `perm_addr` varchar(355) DEFAULT NULL,
  `perm_addr_pin` int(11) DEFAULT NULL,
  `aadhar_idx` varchar(20) DEFAULT NULL,
  `aadhar_id` bigint(20) DEFAULT NULL,
  `pan_no` varchar(10) DEFAULT NULL,
  `id_proof_type` varchar(50) DEFAULT NULL,
  `id_proof_number` varchar(50) DEFAULT NULL,
  `addr_proof_type` varchar(50) DEFAULT NULL,
  `addr_proof_number` varchar(50) DEFAULT NULL,
  `imsi` varchar(15) DEFAULT NULL,
  `conn_type` varchar(11) DEFAULT NULL,
  `subscriber_status` varchar(10) DEFAULT NULL,
  `service_provider` varchar(20) NOT NULL,
  `circle` varchar(50) NOT NULL,
  `prev_service_provider` varchar(50) DEFAULT NULL,
  `prev_circle` varchar(50) DEFAULT NULL,
  `caf_no` varchar(50) DEFAULT NULL,
  `sim_act_date` date NOT NULL,
  `sim_act_time` time DEFAULT NULL,
  `pos_code` varchar(25) DEFAULT NULL,
  `pos_name` varchar(100) DEFAULT NULL,
  `pos_agent` varchar(100) DEFAULT NULL,
  `pos_addr` varchar(255) DEFAULT NULL,
  `pos_addr_pin` int(11) DEFAULT NULL,
  `pos_agent_aadhar` bigint(20) DEFAULT NULL,
  `pos_sign_mobile` bigint(20) DEFAULT NULL,
  `lr_name` varchar(255) DEFAULT NULL,
  `lr_addr` varchar(255) DEFAULT NULL,
  `lr_mobile` bigint(20) DEFAULT NULL,
  `cust_sign_mobile` bigint(20) DEFAULT NULL,
  `csm_typ` varchar(50) DEFAULT NULL,
  `photo_id_lat_long` varchar(100) DEFAULT NULL,
  `ao_details` varchar(50) DEFAULT NULL,
  `last_updated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sdr`
--
ALTER TABLE `sdr`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sdr_mobile_number_sim_act_date` (`mobile_number`,`sim_act_date`),
  ADD KEY `sdr_id` (`id`),
  ADD KEY `sdr_aadhar_id` (`aadhar_id`),
  ADD KEY `sdr_alt_mobile` (`alt_mobile`),
  ADD KEY `sdr_pos_sign_mobile` (`pos_sign_mobile`),
  ADD KEY `sdr_lr_mobile` (`lr_mobile`),
  ADD KEY `sdr_cust_sign_mobile` (`cust_sign_mobile`),
  ADD KEY `sdr_mobile_number` (`mobile_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sdr`
--
ALTER TABLE `sdr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
