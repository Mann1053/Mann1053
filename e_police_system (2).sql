-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2026 at 07:17 PM
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
-- Database: `e_police_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `approving_authorities`
--

CREATE TABLE `approving_authorities` (
  `id` int(11) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `rank_order` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `name` varchar(100) NOT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `approving_authorities`
--

INSERT INTO `approving_authorities` (`id`, `designation`, `rank_order`, `created_at`, `updated_at`, `is_active`, `name`, `rank`) VALUES
(1, 'SP (Superintendent of Police)', 1, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL),
(2, 'DIG (Deputy Inspector General)', 2, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL),
(3, 'IG (Inspector General)', 3, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL),
(4, 'ADGP (Additional Director General of Police)', 4, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL),
(5, 'DGP (Director General of Police)', 5, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL),
(6, 'Chief Secretary', 6, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bandobasts`
--

CREATE TABLE `bandobasts` (
  `id` int(11) NOT NULL,
  `bandobast_name` varchar(255) NOT NULL,
  `bandobast_type_id` int(11) NOT NULL,
  `priority_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_date` date NOT NULL,
  `end_time` time NOT NULL,
  `event_description` text DEFAULT NULL,
  `total_areas` int(11) DEFAULT 0,
  `total_points` int(11) DEFAULT 0,
  `total_force` int(11) DEFAULT 0,
  `shift_type` enum('Single','Double','Triple') DEFAULT 'Single',
  `assignment_mode` enum('Auto','Manual','Hybrid') DEFAULT 'Manual',
  `reporting_officer` varchar(100) DEFAULT NULL,
  `backup_officer` varchar(100) DEFAULT NULL,
  `replacement_allowed` tinyint(1) DEFAULT 1,
  `general_instructions` text DEFAULT NULL,
  `pointwise_instructions` text DEFAULT NULL,
  `emergency_protocol` text DEFAULT NULL,
  `uniform_type` enum('Regular','Ceremonial','Riot Gear') DEFAULT 'Regular',
  `group_chat_enabled` tinyint(1) DEFAULT 0,
  `emergency_broadcast` tinyint(1) DEFAULT 0,
  `language` enum('Gujarati','English','Both') DEFAULT 'Gujarati',
  `live_location_tracking` tinyint(1) DEFAULT 0,
  `location_update_interval` enum('30sec','1min','5min') DEFAULT '1min',
  `attendance_mode` enum('Auto GPS','Manual') DEFAULT 'Manual',
  `geo_fencing_enabled` tinyint(1) DEFAULT 0,
  `approving_authority_id` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  `approval_status` enum('Draft','Pending','Approved','Rejected') DEFAULT 'Draft',
  `approval_date` datetime DEFAULT NULL,
  `auto_report_generation` tinyint(1) DEFAULT 0,
  `incident_logging` tinyint(1) DEFAULT 0,
  `photo_video_upload` tinyint(1) DEFAULT 0,
  `feedback_required` tinyint(1) DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `status` enum('Active','Inactive','Completed','Cancelled') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vip_category_id` int(11) DEFAULT NULL,
  `threat_level_id` int(11) DEFAULT NULL,
  `vip_event_name` varchar(255) DEFAULT NULL,
  `expected_crowd` int(11) DEFAULT 0,
  `intelligence_notes` text DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `city_taluka` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bandobasts`
--

INSERT INTO `bandobasts` (`id`, `bandobast_name`, `bandobast_type_id`, `priority_id`, `start_date`, `start_time`, `end_date`, `end_time`, `event_description`, `total_areas`, `total_points`, `total_force`, `shift_type`, `assignment_mode`, `reporting_officer`, `backup_officer`, `replacement_allowed`, `general_instructions`, `pointwise_instructions`, `emergency_protocol`, `uniform_type`, `group_chat_enabled`, `emergency_broadcast`, `language`, `live_location_tracking`, `location_update_interval`, `attendance_mode`, `geo_fencing_enabled`, `approving_authority_id`, `remarks`, `approval_status`, `approval_date`, `auto_report_generation`, `incident_logging`, `photo_video_upload`, `feedback_required`, `created_by`, `status`, `created_at`, `updated_at`, `vip_category_id`, `threat_level_id`, `vip_event_name`, `expected_crowd`, `intelligence_notes`, `district`, `city_taluka`) VALUES
(1, 'test Bandobast ', 9, 3, '2026-01-24', '07:00:00', '2026-01-28', '21:11:00', 'test Description', 10, 0, 200, 'Single', '', '', '', 0, '', '', '', '', 0, 0, '', 0, '', '', 0, 1, '', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-19 17:23:39', '2026-01-19 17:23:39', 5, 2, 'modi', 5999999, 'Intelligence ', 'Ahmedabad', 'ahmedabad'),
(3, 'tewwe', 1, 2, '2026-01-30', '11:11:00', '2026-03-11', '11:11:00', 'sdfsdf', 10, 0, 200, 'Single', 'Auto', 'PI', 'ACP', 0, '1', '2', '3', 'Ceremonial', 1, 1, 'Both', 1, '5min', 'Auto GPS', 1, 1, 'commwnt', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-19 17:47:36', '2026-01-20 16:02:36', 2, 2, 'asdasd', 222222, 'test', 'Surat', 'adsasd'),
(4, 'rathyatra', 4, 2, '2026-01-21', '22:22:00', '2026-01-21', '03:33:00', 'rathyaatra ahmedaabd rathyaatra ahmedaabd', 3, 0, 0, 'Single', 'Manual', 'Naresh Mor', 'Amit Patel', 1, 'General Instructions General InstructionsGeneral Instructions General InstructionsGeneral Instructions General Instructions', 'Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n Point-wise Instructions\n ', 'Emergency Protocol Emergency Protocol Emergency Protocol Emergency Protocol ', 'Regular', 1, 1, 'Both', 0, '', '', 0, 4, '', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-21 17:33:08', '2026-01-21 17:33:08', NULL, 3, NULL, 0, NULL, 'amreli', NULL),
(5, 'mor test', 4, 2, '2026-02-01', '11:11:00', '2026-02-01', '22:00:00', 'Event Description Event Description Event Description', 2, 0, 0, 'Single', 'Manual', 'Naresh Mor', 'Rajesh Kumar', 1, 'General Instructions', 'Point-wise Instructions', 'Emergency Protocol', 'Ceremonial', 1, 1, 'Both', 1, '5min', 'Auto GPS', 1, 1, 'Remarks / Comments\nRemarks / Comments\n', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 16:12:30', '2026-01-22 16:12:30', 6, 2, NULL, 0, NULL, 'amreli', NULL),
(6, 'mor test', 4, 2, '2026-02-01', '11:11:00', '2026-02-01', '22:00:00', 'Event Description Event Description Event Description', 2, 0, 0, 'Single', 'Manual', 'Naresh Mor', 'Rajesh Kumar', 1, 'General Instructions', 'Point-wise Instructions', 'Emergency Protocol', 'Ceremonial', 1, 1, 'Both', 1, '5min', 'Auto GPS', 1, 1, 'Remarks / Comments\nRemarks / Comments\n', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 16:13:56', '2026-01-22 16:13:56', 6, 2, NULL, 0, NULL, 'amreli', NULL),
(7, 'mor test', 4, 2, '2026-02-01', '11:11:00', '2026-02-01', '22:00:00', 'Event Description Event Description Event Description', 2, 0, 0, 'Single', 'Manual', 'Naresh Mor', 'Rajesh Kumar', 1, 'General Instructions', 'Point-wise Instructions', 'Emergency Protocol', 'Ceremonial', 1, 1, 'Both', 1, '5min', 'Auto GPS', 1, 1, 'Remarks / Comments\nRemarks / Comments\n', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 16:19:13', '2026-01-22 16:19:13', 6, 2, NULL, 0, NULL, 'amreli', NULL),
(8, 'Bandobast Name ', 9, 3, '2026-11-11', '11:11:00', '2026-11-11', '22:22:00', 'Event Description Event Description', 3, 0, 4, 'Double', 'Manual', 'Naresh Mor', 'Rajesh Kumar', 1, 'General Instructions', 'Point-wise Instructions\n', 'Emergency Protocol', 'Ceremonial', 1, 1, 'Both', 0, '', '', 0, 1, 'Remarks / Comments Remarks / Comments Remarks / Comments ', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 16:44:31', '2026-01-22 16:44:31', 1, 2, 'Event Name', 120000, 'Intelligence Notes Intelligence Notes Intelligence Notes ', 'District', 'Taluka'),
(9, 'qqqqq', 2, 1, '2026-11-11', '11:11:00', '2026-11-11', '22:11:00', 'Event DescriptionEvent Description', 2, 0, 3, 'Single', 'Manual', 'Naresh Mor', 'Rajesh Kumar', 1, 'General Instructions\n', 'Point-wise Instructions\n', 'Emergency Protocol\n', 'Regular', 1, 1, 'Both', 0, '', '', 0, 4, 'Remarks / Comments', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 16:58:16', '2026-01-22 16:58:16', 1, 3, 'mandir pratistha', 200000, 'Intelligence Notes', 'amreli', 'SAVAR KUNDALA'),
(10, 'asdasdasd', 4, 3, '2026-01-23', '11:11:00', '2026-01-23', '11:01:00', 'kjhkjhkj', 1, 0, 3, 'Single', 'Manual', 'Naresh Mor', 'Naresh Mor', 1, 'wwww', 'eeee', 'rrrr', 'Ceremonial', 1, 1, 'Both', 1, '5min', 'Manual', 1, 3, 'aasd', 'Draft', NULL, 1, 1, 1, 1, 1, 'Active', '2026-01-22 17:21:08', '2026-01-22 17:21:08', 1, 1, 'kljlkjkjk', 0, 'kjhgjhgjhg', 'mnn,mn', ',mn,mn');

-- --------------------------------------------------------

--
-- Table structure for table `bandobast_points`
--

CREATE TABLE `bandobast_points` (
  `id` int(11) NOT NULL,
  `bandobast_id` int(11) NOT NULL,
  `point_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `officers_required` int(11) DEFAULT 0,
  `point_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bandobast_points`
--

INSERT INTO `bandobast_points` (`id`, `bandobast_id`, `point_name`, `location`, `latitude`, `longitude`, `officers_required`, `point_order`, `created_at`, `updated_at`) VALUES
(1, 4, 'Point 1', '111111', 23.01145060, 72.58105340, 11, 1, '2026-01-21 17:33:08', '2026-01-22 18:01:40'),
(2, 4, 'Point 2', '22221', 23.01620490, 72.57751870, 11, 2, '2026-01-21 17:33:08', '2026-01-22 18:03:36'),
(3, 4, 'Point 3', '333', 23.01720490, 72.57851870, 11, 3, '2026-01-21 17:33:08', '2026-01-22 18:04:04'),
(4, 5, 'Point 1', 'near mandir', 99.99999999, 222.22200000, 2, 1, '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(5, 5, 'Point 2', 'back side of mandir', 99.99999999, 444.44400000, 1, 2, '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(6, 6, 'Point 1', 'near mandir', 99.99999999, 222.22200000, 2, 1, '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(7, 6, 'Point 2', 'back side of mandir', 99.99999999, 444.44400000, 1, 2, '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(8, 7, 'Point 1', 'near mandir', 99.99999999, 222.22200000, 2, 1, '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(9, 7, 'Point 2', 'back side of mandir', 99.99999999, 444.44400000, 1, 2, '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(10, 8, 'Point 1', 'mandir same', 11.11100000, 22.22200000, 2, 1, '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(11, 8, 'Point 2', 'mandir paschal', 33.33300000, 44.44400000, 1, 2, '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(12, 9, 'Point 1', 'mandir same', 11.11000000, 11.22000000, 2, 1, '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(13, 9, 'Point 2', 'mandir pachal', 33.00000000, 44.00000000, 1, 2, '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(14, 10, 'Point 1', 'jhff', 23.01145060, 72.58105340, 2, 1, '2026-01-22 17:21:08', '2026-01-22 17:51:01');

-- --------------------------------------------------------

--
-- Table structure for table `bandobast_point_officers`
--

CREATE TABLE `bandobast_point_officers` (
  `id` int(11) NOT NULL,
  `point_id` int(11) NOT NULL,
  `bandobast_id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `buckle_number` varchar(50) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `duty_location` varchar(255) DEFAULT NULL,
  `officer_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bandobast_point_officers`
--

INSERT INTO `bandobast_point_officers` (`id`, `point_id`, `bandobast_id`, `staff_id`, `name`, `mobile_number`, `buckle_number`, `designation`, `duty_location`, `officer_order`, `created_at`, `updated_at`) VALUES
(1, 1, 4, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(2, 1, 4, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(3, 1, 4, NULL, 'Nitin Rana', '9876543306', 'BK010', 'Sub Inspector', 'East Wing', 3, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(4, 1, 4, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 4, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(5, 1, 4, NULL, 'Vikas Shah', '9876543302', 'BK006', 'Constable', 'West Wing', 5, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(6, 1, 4, NULL, 'Suresh Mehta', '9876543301', 'BK005', 'Constable', 'Main Gate', 6, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(7, 1, 4, NULL, 'Rohit Verma', '9876543303', 'BK007', 'Sub Inspector', 'South Sector', 7, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(8, 1, 4, NULL, 'Ajay Malhotra', '9876543312', 'BK016', 'Head Constable', 'East Wing', 8, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(9, 1, 4, NULL, 'Anil Chauhan', '9876543307', 'BK011', 'Assistant Sub Inspector', 'East Wing', 9, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(10, 1, 4, NULL, 'Prakash Nair', '9876543318', 'BK022', 'Constable', 'Main Gate', 10, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(11, 1, 4, NULL, 'Vijay Solanki', '9876543314', 'BK018', 'Sub Inspector', 'East Wing', 11, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(12, 2, 4, NULL, 'Arjun Rao', '9876543319', 'BK023', 'Constable', 'South Sector', 1, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(13, 2, 4, NULL, 'Kiran Joshi', '9876543304', 'BK008', 'Constable', 'South Sector', 2, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(14, 2, 4, NULL, 'Sunil Pawar', '9876543310', 'BK014', 'Head Constable', 'West Wing', 3, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(15, 2, 4, NULL, 'Pankaj Desai', '9876543305', 'BK009', 'Assistant Sub Inspector', 'North Sector', 4, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(16, 2, 4, NULL, 'Bhavesh Modi', '9876543323', 'BK027', 'Assistant Sub Inspector', 'Main Gate', 5, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(17, 2, 4, NULL, 'Mahesh Yadav', '9876543309', 'BK013', 'Sub Inspector', 'East Wing', 6, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(18, 2, 4, NULL, 'Firoz Khan', '9876543326', 'BK030', 'Sub Inspector', 'North Sector', 7, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(19, 2, 4, NULL, 'Darshan Patel', '9876543325', 'BK029', 'Assistant Sub Inspector', 'West Wing', 8, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(20, 2, 4, NULL, 'Gaurav Jain', '9876543327', 'BK031', 'Sub Inspector', 'North Sector', 9, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(21, 2, 4, NULL, 'Alok Mishra', '9876543322', 'BK026', 'Assistant Sub Inspector', 'Main Gate', 10, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(22, 2, 4, NULL, 'Sanjay Kulkarni', '9876543317', 'BK021', 'Sub Inspector', 'Main Gate', 11, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(23, 3, 4, NULL, 'Hemant Soni', '9876543328', 'BK032', 'Constable', 'East Wing', 1, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(24, 3, 4, NULL, 'Yogesh Patil', '9876543321', 'BK025', 'Head Constable', 'South Sector', 2, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(25, 3, 4, NULL, 'Chetan Parmar', '9876543324', 'BK028', 'Sub Inspector', 'South Sector', 3, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(26, 3, 4, NULL, 'Manoj Tiwari', '9876543316', 'BK020', 'Sub Inspector', 'Main Gate', 4, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(27, 3, 4, NULL, 'Amit Patel', '9876543300', 'BK004', 'Head Constable', 'North Sector', 5, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(28, 3, 4, NULL, 'Rakesh Thakur', '9876543311', 'BK015', 'Sub Inspector', 'South Sector', 6, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(29, 3, 4, NULL, 'Harish Pandya', '9876543315', 'BK019', 'Constable', 'West Wing', 7, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(30, 3, 4, NULL, 'Dinesh Gupta', '9876543313', 'BK017', 'Assistant Sub Inspector', 'East Wing', 8, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(31, 3, 4, NULL, 'Deepak Singh', '9876543308', 'BK012', 'Constable', 'South Sector', 9, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(32, 3, 4, NULL, 'Kamal Bansal', '9876543320', 'BK024', 'Constable', 'East Wing', 10, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(33, 3, 4, NULL, 'Irfan Sheikh', '9876543329', 'BK033', 'Assistant Sub Inspector', 'Main Gate', 11, '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(34, 4, 5, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(35, 4, 5, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(36, 5, 5, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 1, '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(37, 6, 6, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(38, 6, 6, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(39, 7, 6, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 1, '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(40, 8, 7, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(41, 8, 7, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(42, 9, 7, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 1, '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(43, 10, 8, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(44, 10, 8, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(45, 11, 8, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 1, '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(46, 12, 9, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(47, 12, 9, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(48, 13, 9, NULL, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', 1, '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(49, 14, 10, NULL, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', 1, '2026-01-22 17:21:08', '2026-01-22 17:21:08'),
(50, 14, 10, NULL, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', 2, '2026-01-22 17:21:08', '2026-01-22 17:21:08');

-- --------------------------------------------------------

--
-- Table structure for table `bandobast_staff`
--

CREATE TABLE `bandobast_staff` (
  `id` int(11) NOT NULL,
  `bandobast_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `buckle_number` varchar(50) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `duty_location` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bandobast_staff`
--

INSERT INTO `bandobast_staff` (`id`, `bandobast_id`, `name`, `mobile_number`, `buckle_number`, `designation`, `duty_location`, `created_at`, `updated_at`) VALUES
(1, 4, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(2, 4, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(3, 4, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(4, 4, 'Amit Patel', '9876543300', 'BK004', 'Head Constable', 'North Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(5, 4, 'Suresh Mehta', '9876543301', 'BK005', 'Constable', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(6, 4, 'Vikas Shah', '9876543302', 'BK006', 'Constable', 'West Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(7, 4, 'Rohit Verma', '9876543303', 'BK007', 'Sub Inspector', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(8, 4, 'Kiran Joshi', '9876543304', 'BK008', 'Constable', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(9, 4, 'Pankaj Desai', '9876543305', 'BK009', 'Assistant Sub Inspector', 'North Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(10, 4, 'Nitin Rana', '9876543306', 'BK010', 'Sub Inspector', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(11, 4, 'Anil Chauhan', '9876543307', 'BK011', 'Assistant Sub Inspector', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(12, 4, 'Deepak Singh', '9876543308', 'BK012', 'Constable', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(13, 4, 'Mahesh Yadav', '9876543309', 'BK013', 'Sub Inspector', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(14, 4, 'Sunil Pawar', '9876543310', 'BK014', 'Head Constable', 'West Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(15, 4, 'Rakesh Thakur', '9876543311', 'BK015', 'Sub Inspector', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(16, 4, 'Ajay Malhotra', '9876543312', 'BK016', 'Head Constable', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(17, 4, 'Dinesh Gupta', '9876543313', 'BK017', 'Assistant Sub Inspector', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(18, 4, 'Vijay Solanki', '9876543314', 'BK018', 'Sub Inspector', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(19, 4, 'Harish Pandya', '9876543315', 'BK019', 'Constable', 'West Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(20, 4, 'Manoj Tiwari', '9876543316', 'BK020', 'Sub Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(21, 4, 'Sanjay Kulkarni', '9876543317', 'BK021', 'Sub Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(22, 4, 'Prakash Nair', '9876543318', 'BK022', 'Constable', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(23, 4, 'Arjun Rao', '9876543319', 'BK023', 'Constable', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(24, 4, 'Kamal Bansal', '9876543320', 'BK024', 'Constable', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(25, 4, 'Yogesh Patil', '9876543321', 'BK025', 'Head Constable', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(26, 4, 'Alok Mishra', '9876543322', 'BK026', 'Assistant Sub Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(27, 4, 'Bhavesh Modi', '9876543323', 'BK027', 'Assistant Sub Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(28, 4, 'Chetan Parmar', '9876543324', 'BK028', 'Sub Inspector', 'South Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(29, 4, 'Darshan Patel', '9876543325', 'BK029', 'Assistant Sub Inspector', 'West Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(30, 4, 'Firoz Khan', '9876543326', 'BK030', 'Sub Inspector', 'North Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(31, 4, 'Gaurav Jain', '9876543327', 'BK031', 'Sub Inspector', 'North Sector', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(32, 4, 'Hemant Soni', '9876543328', 'BK032', 'Constable', 'East Wing', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(33, 4, 'Irfan Sheikh', '9876543329', 'BK033', 'Assistant Sub Inspector', 'Main Gate', '2026-01-21 17:33:08', '2026-01-21 17:33:08'),
(34, 5, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(35, 5, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(36, 5, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(37, 5, 'Vivek Surani', '8877665544', 'gj-342324', 'Assistant Sub-Inspector', 'Kalupur', '2026-01-22 16:12:30', '2026-01-22 16:12:30'),
(38, 6, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(39, 6, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(40, 6, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(41, 6, 'Vivek Surani', '8877665544', 'gj-342324', 'Assistant Sub-Inspector', 'Kalupur', '2026-01-22 16:13:56', '2026-01-22 16:13:56'),
(42, 7, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(43, 7, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(44, 7, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(45, 7, 'Vivek Surani', '8877665544', 'gj-342324', 'Assistant Sub-Inspector', 'Kalupur', '2026-01-22 16:19:13', '2026-01-22 16:19:13'),
(46, 8, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(47, 8, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(48, 8, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(49, 8, 'vivek surani', '8988776644', 'gj234234', 'Assistant Sub-Inspector', 'kalupur', '2026-01-22 16:44:31', '2026-01-22 16:44:31'),
(50, 9, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(51, 9, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(52, 9, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 16:58:16', '2026-01-22 16:58:16'),
(53, 10, 'Naresh Mor', '9876543210', 'BK001', 'Police Inspector', 'Main Gate', '2026-01-22 17:21:08', '2026-01-22 17:21:08'),
(54, 10, 'Rajesh Kumar', '9876543211', 'BK002', 'Sub Inspector', 'North Sector', '2026-01-22 17:21:08', '2026-01-22 17:21:08'),
(55, 10, 'Priya Sharma', '9876543212', 'BK003', 'Constable', 'South Sector', '2026-01-22 17:21:08', '2026-01-22 17:21:08');

-- --------------------------------------------------------

--
-- Table structure for table `bandobast_types`
--

CREATE TABLE `bandobast_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bandobast_types`
--

INSERT INTO `bandobast_types` (`id`, `name`, `description`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'VIP Visit', 'Security arrangements for VIP visits', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(2, 'VVIP', 'Security arrangements for VVIP visits', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(3, 'Public Event', 'Security for public gatherings and events', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(4, 'Festival', 'Security during festivals and celebrations', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(5, 'Election Duty', 'Security arrangements during elections', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(6, 'Law and Order', 'General law and order maintenance', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(7, 'Riot Control', 'Riot and mob control operations', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(8, 'Special Operation', 'Special security operations', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(9, 'test type', 'text', '2026-01-19 17:11:37', '2026-01-19 17:11:37', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `case_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `status` enum('new','in_progress','completed','closed') NOT NULL DEFAULT 'new',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`case_id`, `title`, `description`, `address`, `latitude`, `longitude`, `status`, `tags`, `createdBy`, `createdAt`, `updatedAt`) VALUES
('71d7ccf6-680d-4fbc-b679-c20225ed02fe', 'test', 'test desc', 'Ahmedabad new', 40.26500000, -75.54560000, 'new', '[\"test\"]', 1, '2025-11-04 16:42:16', '2025-11-04 16:42:16'),
('e8cf2009-455c-4bf7-a1aa-b367bd75be49', 'Updated Case Title', 'Investigation of homicide case', '123 Main St, City', 40.71280000, -74.00600000, 'in_progress', '[\"updated\",\"progress\"]', 1, '2025-11-04 16:09:53', '2025-11-04 16:14:58');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `state_id` mediumint(8) UNSIGNED NOT NULL,
  `state_code` varchar(255) NOT NULL,
  `country_id` mediumint(8) UNSIGNED NOT NULL,
  `country_code` char(2) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '2014-01-01 01:01:01',
  `updated_at` datetime NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT 1,
  `wikiDataId` varchar(255) DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `state_id`, `state_code`, `country_id`, `country_code`, `latitude`, `longitude`, `created_at`, `updated_at`, `flag`, `wikiDataId`) VALUES
(57584, 'Abhaneri', 4014, 'RJ', 101, 'IN', 27.00743000, 76.60760000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q4667324'),
(57585, 'Abhayapuri', 4027, 'AS', 101, 'IN', 26.32255000, 90.68526000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q490701'),
(57586, 'Abiramam', 4035, 'TN', 101, 'IN', 9.44230000, 78.43990000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q490715'),
(57587, 'Abohar', 4015, 'PB', 101, 'IN', 30.14453000, 74.19552000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490878'),
(57588, 'Abrama', 4030, 'GJ', 101, 'IN', 20.85865000, 72.90648000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490916'),
(57589, 'Achalpur', 4008, 'MH', 101, 'IN', 21.25665000, 77.51006000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490886'),
(57590, 'Achhnera', 4022, 'UP', 101, 'IN', 27.17826000, 77.75674000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490739'),
(57591, 'Adalaj', 4030, 'GJ', 101, 'IN', 23.16453000, 72.58107000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2350169'),
(57592, 'Adampur', 4015, 'PB', 101, 'IN', 31.43224000, 75.71484000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2350169'),
(57593, 'Addanki', 4017, 'AP', 101, 'IN', 15.81061000, 79.97338000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2350169'),
(57594, 'Adirampattinam', 4035, 'TN', 101, 'IN', 10.34059000, 79.37905000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490694'),
(57595, 'Aduthurai', 4035, 'TN', 101, 'IN', 11.01542000, 79.48093000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490694'),
(57596, 'Adur', 4028, 'KL', 101, 'IN', 9.15595000, 76.73192000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q490941'),
(57597, 'Afzalgarh', 4022, 'UP', 101, 'IN', 29.39370000, 78.67393000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490688'),
(57598, 'Afzalpur', 4026, 'KA', 101, 'IN', 17.19986000, 76.36018000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490688'),
(57599, 'Agar', 4039, 'MP', 101, 'IN', 23.71177000, 76.01571000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q490688'),
(57600, 'Agartala', 4038, 'TR', 101, 'IN', 23.83605000, 91.27939000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q170454'),
(57601, 'Agra', 4022, 'UP', 101, 'IN', 27.18333000, 78.01667000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q42941'),
(57602, 'Ahiri', 4008, 'MH', 101, 'IN', 19.41386000, 80.00359000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q3606967'),
(57603, 'Ahmadnagar', 4008, 'MH', 101, 'IN', 19.09457000, 74.73843000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q223517'),
(57604, 'Ahmadpur', 4008, 'MH', 101, 'IN', 18.70622000, 76.93731000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q590521'),
(57606, 'Ahmedabad', 4030, 'GJ', 101, 'IN', 23.02579000, 72.58727000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1070'),
(57607, 'Ahraura', 4022, 'UP', 101, 'IN', 25.01579000, 83.03294000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q587150'),
(57608, 'Ahwa', 4030, 'GJ', 101, 'IN', 20.75718000, 73.68626000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1964214'),
(57609, 'Airoli', 4008, 'MH', 101, 'IN', 19.15096000, 72.99625000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q4698841'),
(57610, 'Aizawl', 4036, 'MZ', 101, 'IN', 23.80000000, 92.90000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1947322'),
(57611, 'Ajaigarh', 4039, 'MP', 101, 'IN', 24.89879000, 80.25921000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583090'),
(57612, 'Ajitgarh', 4015, 'PB', 101, 'IN', 30.65000000, 76.70000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2037672'),
(57613, 'Ajjampur', 4026, 'KA', 101, 'IN', 13.72794000, 76.00680000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2037672'),
(57614, 'Ajmer', 4014, 'RJ', 101, 'IN', 26.25000000, 74.66667000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q413037'),
(57615, 'Ajnala', 4015, 'PB', 101, 'IN', 31.84473000, 74.76295000, '2019-10-05 18:53:43', '2020-07-04 07:23:35', 1, 'Q585651'),
(57616, 'Ayodhya', 4022, 'UP', 101, 'IN', 26.79909000, 82.20470000, '2019-10-05 18:53:43', '2021-06-06 07:41:13', 1, 'Q186040'),
(57617, 'Ajra', 4008, 'MH', 101, 'IN', 16.11601000, 74.21097000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584021'),
(57618, 'Akalkot', 4008, 'MH', 101, 'IN', 17.52532000, 76.20611000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q239809'),
(57619, 'Akaltara', 4040, 'CT', 101, 'IN', 22.02463000, 82.42641000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582949'),
(57620, 'Akasahebpet', 4017, 'AP', 101, 'IN', 17.50455000, 82.56597000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582949'),
(57621, 'Akbarpur', 4022, 'UP', 101, 'IN', 26.42953000, 82.53431000, '2019-10-05 18:53:43', '2021-06-06 07:41:13', 1, 'Q583899'),
(57622, 'Akhnur', 4029, 'JK', 101, 'IN', 32.86667000, 74.73333000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q416835'),
(57623, 'Akividu', 4017, 'AP', 101, 'IN', 16.58225000, 81.38112000, '2019-10-05 18:53:43', '2021-02-20 13:13:29', 1, 'Q416835'),
(57624, 'Akkarampalle', 4017, 'AP', 101, 'IN', 13.65000000, 79.42000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585782'),
(57625, 'Aklera', 4014, 'RJ', 101, 'IN', 24.41288000, 76.56719000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q587185'),
(57626, 'Akodia', 4039, 'MP', 101, 'IN', 23.38027000, 76.59875000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582235'),
(57627, 'Akola', 4008, 'MH', 101, 'IN', 20.50000000, 77.16667000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q213014'),
(57628, 'Akot', 4008, 'MH', 101, 'IN', 21.09630000, 77.05880000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589224'),
(57629, 'Akalgarh', 4015, 'PB', 101, 'IN', 29.82074000, 75.89078000, '2019-10-05 18:53:43', '2020-07-04 07:23:38', 1, 'Q585750'),
(57630, 'Alagapuram', 4035, 'TN', 101, 'IN', 11.88705000, 78.91758000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q585750'),
(57631, 'Alampur', 4039, 'MP', 101, 'IN', 26.02514000, 78.79697000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q14201843'),
(57632, 'Aland', 4026, 'KA', 101, 'IN', 17.56425000, 76.56854000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2738477'),
(57633, 'Alandi', 4008, 'MH', 101, 'IN', 18.67756000, 73.89868000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589653'),
(57634, 'Alandur', 4035, 'TN', 101, 'IN', 13.00250000, 80.20611000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584845'),
(57635, 'Alanganallur', 4035, 'TN', 101, 'IN', 10.04697000, 78.09033000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q582312'),
(57636, 'Alangayam', 4035, 'TN', 101, 'IN', 12.62235000, 78.75207000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q590029'),
(57637, 'Alappuzha', 4028, 'KL', 101, 'IN', 9.49004000, 76.32640000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585026'),
(57638, 'Aldona', 4009, 'GA', 101, 'IN', 15.59337000, 73.87482000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584939'),
(57639, 'Alirajpur', 4039, 'MP', 101, 'IN', 22.31384000, 74.36452000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2667586'),
(57640, 'Prayagraj (Allahabad)', 4022, 'UP', 101, 'IN', 25.42012000, 81.88385000, '2019-10-05 18:53:43', '2021-05-30 16:01:46', 1, 'Q1773426'),
(57641, 'Allahganj', 4022, 'UP', 101, 'IN', 27.54540000, 79.68715000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589789'),
(57642, 'Allapalli', 4008, 'MH', 101, 'IN', 19.43172000, 80.06377000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589789'),
(57643, 'Almora', 4016, 'UT', 101, 'IN', 29.69223000, 79.49789000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1805066'),
(57644, 'Alnavar', 4026, 'KA', 101, 'IN', 15.42727000, 74.74111000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q583849'),
(57645, 'Along', 4024, 'AR', 101, 'IN', 28.16951000, 94.80060000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q519770'),
(57646, 'Alot', 4039, 'MP', 101, 'IN', 23.76336000, 75.55662000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583826'),
(57647, 'Aluva', 4028, 'KL', 101, 'IN', 10.10764000, 76.35158000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588793'),
(57648, 'Alwa Tirunagari', 4035, 'TN', 101, 'IN', 8.60635000, 77.93983000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588793'),
(57649, 'Alwar', 4014, 'RJ', 101, 'IN', 27.50000000, 76.50000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q449690'),
(57650, 'Alwaye', 4028, 'KL', 101, 'IN', 10.10649000, 76.35484000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q449690'),
(57651, 'Alawalpur', 4015, 'PB', 101, 'IN', 31.43161000, 75.65614000, '2019-10-05 18:53:43', '2020-07-04 07:23:41', 1, 'Q583873'),
(57652, 'Alibag', 4008, 'MH', 101, 'IN', 18.64813000, 72.87579000, '2019-10-05 18:53:43', '2021-02-20 13:13:29', 1, 'Q385394'),
(57653, 'Aliganj', 4022, 'UP', 101, 'IN', 27.49358000, 79.17127000, '2019-10-05 18:53:43', '2021-02-20 13:13:29', 1, 'Q589296'),
(57654, 'Aligarh', 4022, 'UP', 101, 'IN', 27.83333000, 78.16667000, '2019-10-05 18:53:43', '2021-06-06 07:41:13', 1, 'Q201832'),
(57655, 'Alipur', 4021, 'DL', 101, 'IN', 28.79862000, 77.13314000, '2019-10-05 18:53:43', '2021-02-20 13:13:29', 1, 'Q766918'),
(57656, 'Alur', 4026, 'KA', 101, 'IN', 12.97805000, 75.99094000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q1320963'),
(57657, 'Amalner', 4008, 'MH', 101, 'IN', 21.03983000, 75.05887000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589095'),
(57658, 'Amalapuram', 4017, 'AP', 101, 'IN', 16.57868000, 82.00609000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q588625'),
(57659, 'Amarkantak', 4039, 'MP', 101, 'IN', 22.67486000, 81.75908000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588826'),
(57660, 'Amarnath', 4008, 'MH', 101, 'IN', 19.20000000, 73.16667000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q584008'),
(57661, 'Amarpur', 4037, 'BR', 101, 'IN', 25.03967000, 86.90247000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1609229'),
(57662, 'Amarpur', 4038, 'TR', 101, 'IN', 23.52570000, 91.65879000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589674'),
(57663, 'Amarpatan', 4039, 'MP', 101, 'IN', 24.31371000, 80.97703000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589830'),
(57664, 'Amarwara', 4039, 'MP', 101, 'IN', 22.29780000, 79.16943000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q585696'),
(57665, 'Ambad', 4008, 'MH', 101, 'IN', 19.61301000, 75.78906000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q583887'),
(57666, 'Ambahta', 4022, 'UP', 101, 'IN', 29.85706000, 77.33583000, '2019-10-05 18:53:43', '2021-06-06 07:41:13', 1, 'Q26791799'),
(57667, 'Ambasamudram', 4035, 'TN', 101, 'IN', 8.71068000, 77.45190000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585696'),
(57668, 'Ambattur', 4035, 'TN', 101, 'IN', 13.09818000, 80.16152000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q456737'),
(57669, 'Ambedkar Nagar', 4022, 'UP', 101, 'IN', 26.40544000, 82.69762000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q456764'),
(57670, 'Ambikapur', 4040, 'CT', 101, 'IN', 23.11892000, 83.19537000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q2088480'),
(57671, 'Ambur', 4035, 'TN', 101, 'IN', 12.79163000, 78.71644000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584854'),
(57672, 'Ambagarh Chauki', 4040, 'CT', 101, 'IN', 20.77644000, 80.74608000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q590056'),
(57673, 'Ambah', 4039, 'MP', 101, 'IN', 26.70423000, 78.22678000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q583837'),
(57674, 'Ambajogai', 4008, 'MH', 101, 'IN', 18.73312000, 76.38616000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q584032'),
(57675, 'Ambala', 4007, 'HR', 101, 'IN', 30.32854000, 76.94220000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q2086226'),
(57676, 'Amet', 4014, 'RJ', 101, 'IN', 25.30609000, 73.92580000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583756'),
(57677, 'Amethi', 4022, 'UP', 101, 'IN', 28.01667000, 81.05000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583756'),
(57679, 'Amguri', 4027, 'AS', 101, 'IN', 26.81482000, 94.52614000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585858'),
(57680, 'Amla', 4039, 'MP', 101, 'IN', 21.92485000, 78.12786000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583603'),
(57681, 'Amloh', 4015, 'PB', 101, 'IN', 30.60837000, 76.23199000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582278'),
(57682, 'Ammapettai', 4035, 'TN', 101, 'IN', 10.79476000, 79.31986000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q653744'),
(57683, 'Amod', 4030, 'GJ', 101, 'IN', 21.99317000, 72.87047000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2724262'),
(57684, 'Amravati Division', 4008, 'MH', 101, 'IN', 20.93483000, 77.75694000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q477558'),
(57685, 'Amreli', 4030, 'GJ', 101, 'IN', 21.50789000, 71.18323000, '2019-10-05 18:53:43', '2021-06-06 07:55:54', 1, 'Q589163'),
(57686, 'Amritsar', 4015, 'PB', 101, 'IN', 31.67000000, 74.84000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q202822'),
(57687, 'Amroha', 4022, 'UP', 101, 'IN', 28.90314000, 78.46984000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584515'),
(57688, 'Amroli', 4030, 'GJ', 101, 'IN', 21.25084000, 72.83878000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2722516'),
(57689, 'Amravati', 4008, 'MH', 101, 'IN', 20.93333000, 77.75000000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q269899'),
(57690, 'Amudalavalasa', 4017, 'AP', 101, 'IN', 18.41025000, 83.90295000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q582993'),
(57691, 'Amanganj', 4039, 'MP', 101, 'IN', 24.42664000, 80.03579000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q583720'),
(57692, 'Amanpur', 4022, 'UP', 101, 'IN', 27.71222000, 78.73788000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q582840'),
(57693, 'Anakapalle', 4017, 'AP', 101, 'IN', 17.69134000, 83.00395000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589133'),
(57694, 'Anamalais', 4035, 'TN', 101, 'IN', 10.58303000, 76.93441000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584411'),
(57695, 'Anand', 4030, 'GJ', 101, 'IN', 22.40000000, 72.75000000, '2019-10-05 18:53:43', '2021-06-06 07:55:54', 1, 'Q1798750'),
(57696, 'Anandnagar', 4022, 'UP', 101, 'IN', 27.10062000, 83.27156000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q581106'),
(57697, 'Anandpur Sahib', 4015, 'PB', 101, 'IN', 31.23926000, 76.50253000, '2019-10-05 18:53:43', '2020-07-04 12:36:55', 1, 'Q589664'),
(57698, 'Anantapur', 4017, 'AP', 101, 'IN', 14.55000000, 77.41667000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q15212'),
(57699, 'Anantnag', 4029, 'JK', 101, 'IN', 33.73068000, 75.15418000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q11360899'),
(57701, 'Andol', 4012, 'TG', 101, 'IN', 17.81458000, 78.07713000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q11360899'),
(57702, 'Anekal', 4026, 'KA', 101, 'IN', 12.71110000, 77.69557000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588701'),
(57703, 'Angamali', 4028, 'KL', 101, 'IN', 10.19055000, 76.38789000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q588701'),
(57704, 'Angul', 4013, 'OR', 101, 'IN', 20.84089000, 85.10192000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q518237'),
(57705, 'Angul District', 4013, 'OR', 101, 'IN', 20.84903000, 85.06079000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q1772807'),
(57706, 'Anjad', 4039, 'MP', 101, 'IN', 22.04171000, 75.05519000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585729'),
(57707, 'Anjangaon', 4008, 'MH', 101, 'IN', 21.16516000, 77.30910000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583982'),
(57708, 'Anjaw', 4024, 'AR', 101, 'IN', 28.06549000, 96.82878000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q15413'),
(57709, 'Anjar', 4030, 'GJ', 101, 'IN', 23.11316000, 70.02671000, '2019-10-05 18:53:43', '2020-06-14 11:24:08', 1, 'Q1945434'),
(57710, 'Ankleshwar', 4030, 'GJ', 101, 'IN', 21.63236000, 72.99001000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588924'),
(57711, 'Ankola', 4026, 'KA', 101, 'IN', 14.66049000, 74.30470000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q583926'),
(57712, 'Annavasal', 4035, 'TN', 101, 'IN', 10.46060000, 78.70029000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589776'),
(57713, 'Annigeri', 4026, 'KA', 101, 'IN', 15.42513000, 75.43350000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589122'),
(57714, 'Annur', 4035, 'TN', 101, 'IN', 11.23616000, 77.10514000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585798'),
(57715, 'Annamalainagar', 4035, 'TN', 101, 'IN', 11.40000000, 79.73333000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q585798'),
(57716, 'Anshing', 4008, 'MH', 101, 'IN', 20.04090000, 77.31501000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q26791820'),
(57717, 'Anta', 4014, 'RJ', 101, 'IN', 25.15000000, 76.30000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585798'),
(57718, 'Anthiyur', 4035, 'TN', 101, 'IN', 11.57506000, 77.59043000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585742'),
(57719, 'Antri', 4039, 'MP', 101, 'IN', 26.05804000, 78.21027000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q585742'),
(57720, 'Antu', 4022, 'UP', 101, 'IN', 26.05654000, 81.90267000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584960'),
(57721, 'Anuppur', 4039, 'MP', 101, 'IN', 23.05674000, 81.68399000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q2299093'),
(57722, 'Anupgarh', 4014, 'RJ', 101, 'IN', 29.19111000, 73.20861000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q583742'),
(57724, 'Anupshahr', 4022, 'UP', 101, 'IN', 28.35748000, 78.26914000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q585153'),
(57725, 'Aonla', 4022, 'UP', 101, 'IN', 28.27402000, 79.16521000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q581791'),
(57726, 'Arakkonam', 4035, 'TN', 101, 'IN', 13.08449000, 79.67053000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584823'),
(57727, 'Arambol', 4009, 'GA', 101, 'IN', 15.68681000, 73.70449000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q584823'),
(57728, 'Arang', 4040, 'CT', 101, 'IN', 21.19639000, 81.96912000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589854'),
(57729, 'Arantangi', 4035, 'TN', 101, 'IN', 10.17235000, 78.99118000, '2019-10-05 18:53:43', '2021-02-20 13:12:44', 1, 'Q589854'),
(57730, 'Araria', 4037, 'BR', 101, 'IN', 26.20000000, 87.40000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q42901'),
(57731, 'Arcot', 4035, 'TN', 101, 'IN', 12.90569000, 79.31897000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q589185'),
(57732, 'Arimalam', 4035, 'TN', 101, 'IN', 10.25498000, 78.88403000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582338'),
(57733, 'Ariyalur', 4035, 'TN', 101, 'IN', 11.15000000, 79.25000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q15112'),
(57735, 'Arkalgud', 4026, 'KA', 101, 'IN', 12.76171000, 76.06035000, '2019-10-05 18:53:43', '2021-02-20 13:14:02', 1, 'Q582261'),
(57736, 'Arki', 4020, 'HP', 101, 'IN', 31.15196000, 76.96675000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q582737'),
(57737, 'Arni', 4035, 'TN', 101, 'IN', 12.66771000, 79.28529000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q581497'),
(57738, 'Aroor', 4028, 'KL', 101, 'IN', 9.86940000, 76.30498000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588767'),
(57739, 'Arrah', 4037, 'BR', 101, 'IN', 25.55629000, 84.66335000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588587'),
(57740, 'Arsikere', 4026, 'KA', 101, 'IN', 13.31446000, 76.25704000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588587'),
(57741, 'Artist Village', 4008, 'MH', 101, 'IN', 19.03227000, 73.04276000, '2019-10-05 18:53:43', '2021-06-06 09:11:00', 1, 'Q26794779'),
(57742, 'Arukutti', 4028, 'KL', 101, 'IN', 9.86667000, 76.35000000, '2019-10-05 18:53:43', '2019-10-05 18:53:43', 1, 'Q588587'),
(57743, 'Arumbavur', 4035, 'TN', 101, 'IN', 11.38096000, 78.72965000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q585033'),
(57744, 'Arumuganeri', 4035, 'TN', 101, 'IN', 8.56880000, 78.09091000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q582527'),
(57745, 'Aruppukkottai', 4035, 'TN', 101, 'IN', 9.50960000, 78.09588000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q584327'),
(57746, 'Aruvankad', 4035, 'TN', 101, 'IN', 11.36315000, 76.75790000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q584458'),
(57747, 'Arwal', 4037, 'BR', 101, 'IN', 25.16158000, 84.69040000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q42917'),
(57749, 'Asarganj', 4037, 'BR', 101, 'IN', 25.15046000, 86.68639000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q589912'),
(57750, 'Ashoknagar', 4039, 'MP', 101, 'IN', 24.58000000, 77.73000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2246416'),
(57751, 'Ashta', 4008, 'MH', 101, 'IN', 16.94943000, 74.40936000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q588688'),
(57752, 'Ashta', 4039, 'MP', 101, 'IN', 23.01754000, 76.72208000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q582291'),
(57753, 'Ashti', 4008, 'MH', 101, 'IN', 19.37671000, 76.22520000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q582291'),
(57754, 'Asifabad', 4012, 'TG', 101, 'IN', 19.35851000, 79.28415000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q582291'),
(57755, 'Atarra', 4022, 'UP', 101, 'IN', 25.28618000, 80.57155000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q585869'),
(57756, 'Ateli Mandi', 4007, 'HR', 101, 'IN', 28.10080000, 76.25980000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q590003'),
(57757, 'Athni', 4026, 'KA', 101, 'IN', 16.72613000, 75.06421000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q583995'),
(57758, 'Atmakur', 4017, 'AP', 101, 'IN', 15.88109000, 78.58704000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q583995'),
(57759, 'Atraulia', 4022, 'UP', 101, 'IN', 26.33330000, 82.94727000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q526685'),
(57760, 'Atrauli', 4022, 'UP', 101, 'IN', 28.02964000, 78.28571000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q585063'),
(57761, 'Attili', 4017, 'AP', 101, 'IN', 16.70000000, 81.60000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q4818468'),
(57762, 'Attingal', 4028, 'KL', 101, 'IN', 8.69609000, 76.81507000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q534444'),
(57763, 'Attur', 4035, 'TN', 101, 'IN', 11.59414000, 78.60143000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q282637'),
(57764, 'Auraiya', 4022, 'UP', 101, 'IN', 26.64692000, 79.42858000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q582908'),
(57765, 'Aurangabad', 4008, 'MH', 101, 'IN', 19.88467000, 75.33986000, '2019-10-05 18:53:44', '2021-06-06 09:11:00', 1, 'Q200713'),
(57766, 'Aurangabad', 4037, 'BR', 101, 'IN', 24.75204000, 84.37420000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q590550'),
(57767, 'Auroville', 4035, 'TN', 101, 'IN', 12.00549000, 79.80885000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q590361'),
(57768, 'Aurad', 4026, 'KA', 101, 'IN', 18.25397000, 77.41761000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q582573'),
(57769, 'Auras', 4022, 'UP', 101, 'IN', 26.91414000, 80.50792000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q582879'),
(57770, 'Ausa', 4008, 'MH', 101, 'IN', 18.24728000, 76.49930000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q591243'),
(57771, 'Avanigadda', 4017, 'AP', 101, 'IN', 16.02148000, 80.91808000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q3430115'),
(57772, 'Avanoor', 4028, 'KL', 101, 'IN', 10.60826000, 76.17620000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q3430115'),
(57773, 'Avinashi', 4035, 'TN', 101, 'IN', 11.19297000, 77.26865000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q278847'),
(57774, 'Awantipur', 4029, 'JK', 101, 'IN', 33.91978000, 75.01515000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q278847'),
(57775, 'Ayakudi', 4035, 'TN', 101, 'IN', 10.44992000, 77.55198000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q589926'),
(57776, 'Ayyampettai', 4035, 'TN', 101, 'IN', 10.90141000, 79.17984000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q3631399'),
(57777, 'Azamgarh', 4022, 'UP', 101, 'IN', 26.06832000, 83.18358000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q526757'),
(57778, 'Azhikkal', 4028, 'KL', 101, 'IN', 11.91524000, 75.34761000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q526757'),
(57779, 'Baberu', 4022, 'UP', 101, 'IN', 25.54711000, 80.70443000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q590070'),
(57780, 'Babrala', 4022, 'UP', 101, 'IN', 28.26419000, 78.40560000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q589819'),
(57781, 'Babugarh', 4022, 'UP', 101, 'IN', 28.72353000, 77.84677000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q584725'),
(57782, 'Babina', 4022, 'UP', 101, 'IN', 25.23947000, 78.47028000, '2019-10-05 18:53:44', '2021-02-20 13:13:29', 1, 'Q585789'),
(57783, 'Bachhraon', 4022, 'UP', 101, 'IN', 28.92694000, 78.23456000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q582043'),
(57784, 'Bachhrawan', 4022, 'UP', 101, 'IN', 26.47090000, 81.11580000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q582783'),
(57785, 'Bada Barabil', 4013, 'OR', 101, 'IN', 22.11186000, 85.38684000, '2019-10-05 18:53:44', '2021-02-20 13:13:29', 1, 'Q582783'),
(57786, 'Badagara', 4028, 'KL', 101, 'IN', 11.59776000, 75.58142000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2283340'),
(57787, 'Badarpur', 4027, 'AS', 101, 'IN', 24.86852000, 92.59606000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2563426'),
(57788, 'Badarwas', 4039, 'MP', 101, 'IN', 24.97516000, 77.56490000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q583295'),
(57789, 'Baddi', 4020, 'HP', 101, 'IN', 30.95783000, 76.79136000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q462577'),
(57790, 'Badgam', 4029, 'JK', 101, 'IN', 33.89001000, 74.66297000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2594218'),
(57791, 'Badhni Kalan', 4015, 'PB', 101, 'IN', 30.68130000, 75.29087000, '2019-10-05 18:53:44', '2020-07-04 07:23:44', 1, 'Q585375'),
(57792, 'Badlapur', 4008, 'MH', 101, 'IN', 19.15516000, 73.26553000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q588612'),
(57793, 'Badnawar', 4039, 'MP', 101, 'IN', 23.02181000, 75.23268000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q584989'),
(57794, 'Badvel', 4017, 'AP', 101, 'IN', 14.74510000, 79.06288000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q3412838'),
(57795, 'Baga', 4009, 'GA', 101, 'IN', 15.56517000, 73.75517000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q3412838'),
(57796, 'Bagaha', 4037, 'BR', 101, 'IN', 27.09918000, 84.09003000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q590593'),
(57797, 'Bagalkot', 4026, 'KA', 101, 'IN', 16.18000000, 75.69000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1910231'),
(57798, 'Bagar', 4014, 'RJ', 101, 'IN', 28.18784000, 75.50012000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1910231'),
(57799, 'Bagasra', 4030, 'GJ', 101, 'IN', 21.48719000, 70.95516000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q589286'),
(57800, 'Bageshwar', 4016, 'UT', 101, 'IN', 29.97315000, 79.83224000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1815313'),
(57801, 'Baghpat', 4022, 'UP', 101, 'IN', 28.95000000, 77.21670000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q624402'),
(57802, 'Bagra', 4025, 'JH', 101, 'IN', 23.73333000, 86.31667000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1797363'),
(57803, 'Baheri', 4022, 'UP', 101, 'IN', 28.77416000, 79.49740000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q625710'),
(57804, 'Bahjoi', 4022, 'UP', 101, 'IN', 28.39502000, 78.62659000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q632831'),
(57805, 'Bahraich', 4022, 'UP', 101, 'IN', 27.80021000, 81.51855000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q638621'),
(57806, 'Bahraigh', 4022, 'UP', 101, 'IN', 27.57429000, 81.59474000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q638621'),
(57807, 'Bahsuma', 4022, 'UP', 101, 'IN', 29.20063000, 77.97221000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q287783'),
(57808, 'Bahua', 4022, 'UP', 101, 'IN', 25.83942000, 80.62255000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q26791613'),
(57809, 'Bahadurganj', 4037, 'BR', 101, 'IN', 26.26172000, 87.82443000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q622603'),
(57810, 'Bahadurgarh', 4007, 'HR', 101, 'IN', 28.69287000, 76.93555000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q633471'),
(57811, 'Baihar', 4039, 'MP', 101, 'IN', 22.10133000, 80.54967000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q625392'),
(57812, 'Baikunthpur', 4040, 'CT', 101, 'IN', 23.26206000, 82.56051000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q623920'),
(57813, 'Baikunthpur', 4039, 'MP', 101, 'IN', 24.72768000, 81.40975000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q623920'),
(57814, 'Bail-Hongal', 4026, 'KA', 101, 'IN', 15.81370000, 74.85895000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q636552'),
(57815, 'Bairagnia', 4037, 'BR', 101, 'IN', 26.74063000, 85.27323000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q636552'),
(57816, 'Baisi', 4037, 'BR', 101, 'IN', 25.86302000, 87.74487000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q4848696'),
(57817, 'Bakewar', 4022, 'UP', 101, 'IN', 26.66226000, 79.17625000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622609'),
(57818, 'Bakhtiyarpur', 4037, 'BR', 101, 'IN', 25.46179000, 85.53179000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q622609'),
(57819, 'Bakloh', 4015, 'PB', 101, 'IN', 32.47939000, 75.91874000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622831'),
(57820, 'Baksa', 4027, 'AS', 101, 'IN', 26.69804000, 91.15142000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622831'),
(57821, 'Bakshwaho', 4039, 'MP', 101, 'IN', 24.25106000, 79.28618000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q622831'),
(57822, 'Bakani', 4014, 'RJ', 101, 'IN', 24.28624000, 76.23709000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q638714'),
(57823, 'Balasore', 4013, 'OR', 101, 'IN', 21.49266000, 86.93348000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q641098'),
(57824, 'Baldeogarh', 4039, 'MP', 101, 'IN', 24.75619000, 79.06715000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637094'),
(57825, 'Baldev', 4022, 'UP', 101, 'IN', 27.40684000, 77.82214000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637824'),
(57826, 'Balimila', 4013, 'OR', 101, 'IN', 18.25167000, 82.10659000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622840'),
(57827, 'Ballari', 4026, 'KA', 101, 'IN', 15.15000000, 76.55000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622840'),
(57828, 'Ballia', 4022, 'UP', 101, 'IN', 25.83333000, 84.16667000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q7180187'),
(57829, 'Ballalpur', 4008, 'MH', 101, 'IN', 19.84696000, 79.34578000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q584644'),
(57830, 'Balod', 4040, 'CT', 101, 'IN', 20.73081000, 81.20578000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q921009'),
(57831, 'Baloda', 4040, 'CT', 101, 'IN', 22.13890000, 82.48171000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622838'),
(57832, 'Baloda Bazar', 4040, 'CT', 101, 'IN', 21.65678000, 82.16062000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q625680'),
(57833, 'Balrampur', 4022, 'UP', 101, 'IN', 27.43449000, 82.40281000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q612328'),
(57835, 'Balangir', 4013, 'OR', 101, 'IN', 20.75000000, 83.25000000, '2019-10-05 18:53:44', '2021-02-20 13:13:29', 1, 'Q612328'),
(57836, 'Bambolim', 4009, 'GA', 101, 'IN', 15.46361000, 73.85310000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q627037'),
(57837, 'Bamboo Flat', 4023, 'AN', 101, 'IN', 11.70000000, 92.71667000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q627037'),
(57838, 'Bamna', 4039, 'MP', 101, 'IN', 23.09454000, 74.76164000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q627037'),
(57839, 'Bamora', 4039, 'MP', 101, 'IN', 24.05539000, 78.08925000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q636529'),
(57840, 'Banat', 4022, 'UP', 101, 'IN', 29.46355000, 77.35478000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1320445'),
(57841, 'Banbasa', 4022, 'UP', 101, 'IN', 28.99132000, 80.07608000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637818'),
(57842, 'Banda', 4039, 'MP', 101, 'IN', 24.04488000, 78.96094000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637818'),
(57843, 'Bandipore', 4029, 'JK', 101, 'IN', 34.50404000, 74.82832000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2983553'),
(57844, 'Bandipura', 4029, 'JK', 101, 'IN', 34.41728000, 74.64308000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2983553'),
(57845, 'Bandora', 4009, 'GA', 101, 'IN', 15.40823000, 73.98129000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q720252'),
(57846, 'Banga', 4015, 'PB', 101, 'IN', 31.18874000, 75.99495000, '2019-10-05 18:53:44', '2020-07-04 13:33:40', 1, 'Q3634124'),
(57847, 'Bangalore Rural', 4026, 'KA', 101, 'IN', 13.22567000, 77.57501000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q806464'),
(57848, 'Bangalore Urban', 4026, 'KA', 101, 'IN', 13.00000000, 77.58333000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q806463'),
(57849, 'Banganapalle', 4017, 'AP', 101, 'IN', 15.31771000, 78.22669000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q1553292'),
(57850, 'Bangaon', 4037, 'BR', 101, 'IN', 25.86728000, 86.51152000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q5266882'),
(57851, 'Bangarapet', 4026, 'KA', 101, 'IN', 12.99116000, 78.17804000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637792'),
(57852, 'Banihal', 4029, 'JK', 101, 'IN', 33.43647000, 75.19684000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q634172'),
(57853, 'Banjar', 4020, 'HP', 101, 'IN', 31.63900000, 77.34055000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q8180265'),
(57854, 'Banka', 4037, 'BR', 101, 'IN', 24.89214000, 86.98425000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q43097'),
(57855, 'Banmankhi', 4037, 'BR', 101, 'IN', 25.88857000, 87.19421000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q4856831'),
(57856, 'Bannur', 4026, 'KA', 101, 'IN', 12.33295000, 76.86201000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q622613'),
(57857, 'Bantval', 4026, 'KA', 101, 'IN', 12.89050000, 75.03489000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q622613'),
(57858, 'Banas Kantha', 4030, 'GJ', 101, 'IN', 24.25000000, 72.50000000, '2019-10-05 18:53:44', '2020-06-14 11:24:21', 1, 'Q622613'),
(57859, 'Banur', 4015, 'PB', 101, 'IN', 30.55407000, 76.71948000, '2019-10-05 18:53:44', '2020-07-04 12:31:12', 1, 'Q622613'),
(57860, 'Bar Bigha', 4037, 'BR', 101, 'IN', 25.21855000, 85.73320000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q622613'),
(57861, 'Bara Uchana', 4007, 'HR', 101, 'IN', 29.46747000, 76.17798000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q2557959'),
(57862, 'Baragarh', 4013, 'OR', 101, 'IN', 21.33333000, 83.61667000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q808140'),
(57863, 'Baran', 4014, 'RJ', 101, 'IN', 25.09000000, 76.66000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q808140'),
(57864, 'Barauli', 4037, 'BR', 101, 'IN', 26.38109000, 84.58648000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q12440787'),
(57865, 'Baraut', 4022, 'UP', 101, 'IN', 29.10199000, 77.26334000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q708505'),
(57866, 'Barbil', 4013, 'OR', 101, 'IN', 22.10194000, 85.37752000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q708505'),
(57867, 'Bareilly', 4022, 'UP', 101, 'IN', 28.41667000, 79.38333000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q213026'),
(57868, 'Barela', 4039, 'MP', 101, 'IN', 23.09678000, 80.05084000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637110'),
(57869, 'Bargarh', 4013, 'OR', 101, 'IN', 21.33348000, 83.61905000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q637110'),
(57870, 'Barghat', 4039, 'MP', 101, 'IN', 22.03065000, 79.73280000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q613463'),
(57871, 'Bargi', 4039, 'MP', 101, 'IN', 22.99138000, 79.87550000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q613463'),
(57872, 'Barhi', 4039, 'MP', 101, 'IN', 23.90326000, 80.81516000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q709090'),
(57873, 'Barhiya', 4037, 'BR', 101, 'IN', 25.28814000, 86.02055000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q709090'),
(57874, 'Bari Sadri', 4014, 'RJ', 101, 'IN', 24.41339000, 74.47331000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712396'),
(57875, 'Bariarpur', 4037, 'BR', 101, 'IN', 25.28791000, 86.57643000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712396'),
(57876, 'Barjala', 4038, 'TR', 101, 'IN', 23.61820000, 91.35596000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q712396'),
(57877, 'Barkhera Kalan', 4022, 'UP', 101, 'IN', 28.45209000, 79.80655000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712381'),
(57878, 'Barki Saria', 4025, 'JH', 101, 'IN', 24.17594000, 85.88938000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q712381'),
(57879, 'Barkot', 4016, 'UT', 101, 'IN', 30.80861000, 78.20596000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2552248'),
(57880, 'Barka Kana', 4025, 'JH', 101, 'IN', 23.62118000, 85.46748000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q2552248'),
(57882, 'Barnala', 4015, 'PB', 101, 'IN', 30.37451000, 75.54870000, '2019-10-05 18:53:44', '2020-07-04 07:23:48', 1, 'Q711996'),
(57883, 'Barpathar', 4027, 'AS', 101, 'IN', 26.28709000, 93.88844000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q707805'),
(57884, 'Barpeta', 4027, 'AS', 101, 'IN', 26.47104000, 91.03080000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q41249'),
(57885, 'Barpeta Road', 4027, 'AS', 101, 'IN', 26.50284000, 90.96937000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q712460'),
(57886, 'Barpali', 4013, 'OR', 101, 'IN', 21.19005000, 83.58721000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712508'),
(57887, 'Barsana', 4022, 'UP', 101, 'IN', 27.64802000, 77.37640000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712494'),
(57888, 'Barwani', 4039, 'MP', 101, 'IN', 22.02485000, 74.91805000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2126754'),
(57889, 'Barwadih', 4025, 'JH', 101, 'IN', 23.84780000, 84.11049000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712480'),
(57890, 'Barwala', 4007, 'HR', 101, 'IN', 29.36747000, 75.90809000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q712480'),
(57892, 'Baragaon', 4022, 'UP', 101, 'IN', 25.47554000, 78.71224000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q627748'),
(57893, 'Basavakalyan', 4026, 'KA', 101, 'IN', 17.87445000, 76.94972000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q627748'),
(57894, 'Basavana Bagevadi', 4026, 'KA', 101, 'IN', 16.57278000, 75.97252000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q627748'),
(57895, 'Basi', 4014, 'RJ', 101, 'IN', 26.83150000, 76.04856000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q627748'),
(57897, 'Basmat', 4008, 'MH', 101, 'IN', 19.32872000, 77.15746000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q648370'),
(57898, 'Basna', 4040, 'CT', 101, 'IN', 21.27885000, 82.82670000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q708834'),
(57899, 'Basni', 4014, 'RJ', 101, 'IN', 27.17232000, 73.64519000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q708834'),
(57900, 'Bastar', 4040, 'CT', 101, 'IN', 19.26794000, 81.73828000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q100152'),
(57901, 'Basti', 4022, 'UP', 101, 'IN', 26.82816000, 82.77924000, '2019-10-05 18:53:44', '2021-06-06 07:41:13', 1, 'Q2574579'),
(57903, 'Baswa', 4014, 'RJ', 101, 'IN', 27.14955000, 76.58345000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2574579'),
(57904, 'Bhatinda', 4015, 'PB', 101, 'IN', 30.20747000, 74.93893000, '2019-10-05 18:53:44', '2020-07-04 12:41:27', 1, 'Q33424787'),
(57905, 'Batoti', 4029, 'JK', 101, 'IN', 33.11826000, 75.30889000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q712099'),
(57906, 'Batala', 4015, 'PB', 101, 'IN', 31.80921000, 75.20294000, '2019-10-05 18:53:44', '2020-07-04 07:23:52', 1, 'Q709254'),
(57907, 'Baud', 4013, 'OR', 101, 'IN', 20.83773000, 84.32618000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q303761'),
(57908, 'Baudh', 4013, 'OR', 101, 'IN', 20.83300000, 84.33300000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2363639'),
(57909, 'Bawana', 4021, 'DL', 101, 'IN', 28.79820000, 77.03431000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q760346'),
(57910, 'Bayana', 4014, 'RJ', 101, 'IN', 26.90791000, 77.28985000, '2019-10-05 18:53:44', '2021-02-20 13:12:44', 1, 'Q760257'),
(57911, 'Bedi', 4030, 'GJ', 101, 'IN', 22.50143000, 70.04363000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q516587'),
(57912, 'Beed', 4008, 'MH', 101, 'IN', 18.98921000, 75.75634000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q814033'),
(57913, 'Begamganj', 4039, 'MP', 101, 'IN', 23.59917000, 78.34064000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q760167'),
(57914, 'Begowal', 4015, 'PB', 101, 'IN', 31.61152000, 75.52135000, '2019-10-05 18:53:44', '2020-07-04 07:23:55', 1, 'Q760357'),
(57915, 'Begusarai', 4037, 'BR', 101, 'IN', 25.41853000, 86.13389000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q598985'),
(57917, 'Begun', 4014, 'RJ', 101, 'IN', 24.98333000, 75.00000000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q759147'),
(57918, 'Behat', 4022, 'UP', 101, 'IN', 30.17180000, 77.61390000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q757842'),
(57919, 'Behror', 4014, 'RJ', 101, 'IN', 27.88832000, 76.28108000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q760169'),
(57920, 'Bela', 4022, 'UP', 101, 'IN', 25.92058000, 81.99629000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q760169'),
(57921, 'Belaguntha', 4013, 'OR', 101, 'IN', 19.88249000, 84.63801000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q2444458'),
(57922, 'Belgaum', 4026, 'KA', 101, 'IN', 16.33333000, 74.75000000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q815464'),
(57923, 'Bellampalli', 4012, 'TG', 101, 'IN', 19.05577000, 79.49300000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q759677'),
(57924, 'Bellary', 4026, 'KA', 101, 'IN', 15.14205000, 76.92398000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q429063'),
(57925, 'Belluru', 4026, 'KA', 101, 'IN', 12.98140000, 76.73308000, '2019-10-05 18:53:44', '2021-02-20 13:14:02', 1, 'Q429063'),
(57926, 'Belonia', 4038, 'TR', 101, 'IN', 23.25178000, 91.45407000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q757844'),
(57927, 'Belsand', 4037, 'BR', 101, 'IN', 26.44365000, 85.40076000, '2019-10-05 18:53:44', '2019-10-05 18:53:44', 1, 'Q721485'),
(57928, 'Beltangadi', 4026, 'KA', 101, 'IN', 13.98333000, 75.30000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q721485'),
(57929, 'Belur', 4035, 'TN', 101, 'IN', 11.70752000, 78.41437000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q721485'),
(57930, 'Belur', 4026, 'KA', 101, 'IN', 13.16558000, 75.86519000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q760603'),
(57931, 'Bemetara', 4040, 'CT', 101, 'IN', 21.71556000, 81.53423000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q4885104'),
(57932, 'Benaulim', 4009, 'GA', 101, 'IN', 15.26435000, 73.92812000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2564851'),
(57933, 'Bengaluru', 4026, 'KA', 101, 'IN', 12.97194000, 77.59369000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q1355'),
(57934, 'Beniganj', 4022, 'UP', 101, 'IN', 27.29293000, 80.44364000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q2442072'),
(57935, 'Beohari', 4039, 'MP', 101, 'IN', 24.02423000, 81.37831000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2314377'),
(57936, 'Berasia', 4039, 'MP', 101, 'IN', 23.63134000, 77.43351000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2281620'),
(57937, 'Beri Khas', 4007, 'HR', 101, 'IN', 28.70146000, 76.57708000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2234154'),
(57938, 'Beswan', 4022, 'UP', 101, 'IN', 27.63792000, 77.88019000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2442016'),
(57939, 'Betamcherla', 4017, 'AP', 101, 'IN', 15.45144000, 78.14797000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2442016'),
(57940, 'Betma', 4039, 'MP', 101, 'IN', 22.68653000, 75.61456000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q757845'),
(57941, 'Bettiah', 4037, 'BR', 101, 'IN', 26.80229000, 84.50311000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759222'),
(57942, 'Betul', 4039, 'MP', 101, 'IN', 21.83333000, 77.83333000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q1815279'),
(57943, 'Betul Bazar', 4039, 'MP', 101, 'IN', 21.85572000, 77.92913000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q2314399'),
(57944, 'Bewar', 4022, 'UP', 101, 'IN', 27.21869000, 79.29761000, '2019-10-05 18:53:45', '2021-06-06 07:41:13', 1, 'Q730492'),
(57945, 'Beypore', 4028, 'KL', 101, 'IN', 11.17151000, 75.80611000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759539'),
(57946, 'Beawar', 4014, 'RJ', 101, 'IN', 26.10119000, 74.32028000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q757855'),
(57947, 'Bhabhua', 4037, 'BR', 101, 'IN', 25.04049000, 83.60749000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759544'),
(57948, 'Bhachau', 4030, 'GJ', 101, 'IN', 23.29858000, 70.34279000, '2019-10-05 18:53:45', '2020-06-14 11:24:16', 1, 'Q759550'),
(57949, 'Bhadarwah', 4029, 'JK', 101, 'IN', 32.97941000, 75.71723000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q760372'),
(57950, 'Bhadaur', 4015, 'PB', 101, 'IN', 30.47651000, 75.33049000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q757840'),
(57951, 'Bhadohi', 4022, 'UP', 101, 'IN', 25.39526000, 82.57030000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759217'),
(57952, 'Bhadradri Kothagudem', 4012, 'TG', 101, 'IN', 17.55460000, 80.61976000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759217'),
(57953, 'Bhadrak', 4013, 'OR', 101, 'IN', 21.00000000, 86.60000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q685638'),
(57954, 'Bhadrakh', 4013, 'OR', 101, 'IN', 21.05447000, 86.51560000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759556'),
(57955, 'Bhadrachalam', 4012, 'TG', 101, 'IN', 17.66846000, 80.88887000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q759204'),
(57956, 'Bhadravati', 4026, 'KA', 101, 'IN', 13.84846000, 75.70502000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2284099'),
(57957, 'Bhagirathpur', 4037, 'BR', 101, 'IN', 26.26950000, 86.06346000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2284099'),
(57958, 'Bhagwantnagar', 4022, 'UP', 101, 'IN', 26.22383000, 80.75750000, '2019-10-05 18:53:45', '2021-06-06 07:41:13', 1, 'Q26791707'),
(57959, 'Bhainsdehi', 4039, 'MP', 101, 'IN', 21.64491000, 77.63023000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759139'),
(57960, 'Bhaisa', 4012, 'TG', 101, 'IN', 19.11285000, 77.96336000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q759999'),
(57961, 'Bhandara', 4008, 'MH', 101, 'IN', 21.18333000, 80.00000000, '2019-10-05 18:53:45', '2021-06-06 09:11:00', 1, 'Q33424761'),
(57963, 'Bhanjanagar', 4013, 'OR', 101, 'IN', 19.92719000, 84.58201000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q760179'),
(57964, 'Bharatpur', 4014, 'RJ', 101, 'IN', 27.21000000, 77.29000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q854846'),
(57965, 'Bharthana', 4022, 'UP', 101, 'IN', 26.75231000, 79.22180000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q662285'),
(57966, 'Bharwari', 4022, 'UP', 101, 'IN', 25.56078000, 81.49164000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2442005'),
(57967, 'Bharuch', 4030, 'GJ', 101, 'IN', 21.69482000, 72.98050000, '2019-10-05 18:53:45', '2020-06-14 11:24:13', 1, 'Q760153'),
(57968, 'Bhasawar', 4014, 'RJ', 101, 'IN', 27.03895000, 77.04849000, '2019-10-05 18:53:45', '2021-06-06 07:52:22', 1, 'Q26791337'),
(57969, 'Bhatgaon', 4040, 'CT', 101, 'IN', 21.15000000, 81.70000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q13403597'),
(57970, 'Bhatkal', 4026, 'KA', 101, 'IN', 13.98534000, 74.55531000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q13403597'),
(57971, 'Bhattiprolu', 4017, 'AP', 101, 'IN', 16.10260000, 80.78074000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q3429099'),
(57972, 'Bhavnagar', 4030, 'GJ', 101, 'IN', 21.76287000, 72.15331000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q242992'),
(57973, 'Bhavani', 4035, 'TN', 101, 'IN', 11.44553000, 77.68215000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q1749241'),
(57974, 'Bhawanipur', 4037, 'BR', 101, 'IN', 26.45352000, 87.02744000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q4901597'),
(57975, 'Bhawaniganj', 4039, 'MP', 101, 'IN', 24.41582000, 75.83552000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q4901597'),
(57976, 'Bhawanipatna', 4013, 'OR', 101, 'IN', 19.90717000, 83.16697000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q759348'),
(57977, 'Bhawanigarh', 4015, 'PB', 101, 'IN', 30.26685000, 76.03854000, '2019-10-05 18:53:45', '2020-07-04 07:24:01', 1, 'Q760176'),
(57978, 'Bhayandar', 4008, 'MH', 101, 'IN', 19.30157000, 72.85107000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q4901615'),
(57979, 'Bhigvan', 4008, 'MH', 101, 'IN', 18.30070000, 74.76701000, '2019-10-05 18:53:45', '2021-06-06 09:11:00', 1, 'Q26791344'),
(57980, 'Bhikangaon', 4039, 'MP', 101, 'IN', 21.86764000, 75.96391000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2314441'),
(57981, 'Bhilai', 4040, 'CT', 101, 'IN', 21.20919000, 81.42850000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q242144'),
(57982, 'Bhind', 4039, 'MP', 101, 'IN', 26.50000000, 78.75000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q2341700'),
(57983, 'Bhindar', 4014, 'RJ', 101, 'IN', 24.50235000, 74.18551000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q2341700'),
(57984, 'Bhinga', 4022, 'UP', 101, 'IN', 27.70283000, 81.93430000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q795811'),
(57985, 'Bhitarwar', 4039, 'MP', 101, 'IN', 25.79216000, 78.11085000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q796805');
INSERT INTO `cities` (`id`, `name`, `state_id`, `state_code`, `country_id`, `country_code`, `latitude`, `longitude`, `created_at`, `updated_at`, `flag`, `wikiDataId`) VALUES
(57986, 'Bhiwadi', 4014, 'RJ', 101, 'IN', 28.21024000, 76.86056000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796761'),
(57987, 'Bhiwandi', 4008, 'MH', 101, 'IN', 19.30023000, 73.05881000, '2019-10-05 18:53:45', '2021-06-06 09:11:00', 1, 'Q31856876'),
(57988, 'Bhiwani', 4007, 'HR', 101, 'IN', 28.75000000, 76.16667000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q1852857'),
(57990, 'Bhogpur', 4015, 'PB', 101, 'IN', 31.55442000, 75.64271000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796770'),
(57991, 'Bhojpur', 4037, 'BR', 101, 'IN', 25.30886000, 84.44504000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796770'),
(57992, 'Bhojudih', 4025, 'JH', 101, 'IN', 23.63962000, 86.44105000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q795805'),
(57993, 'Bhongaon', 4022, 'UP', 101, 'IN', 27.25515000, 79.18118000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q4901949'),
(57994, 'Bhongir', 4012, 'TG', 101, 'IN', 17.51544000, 78.88563000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q797132'),
(57995, 'Bhopal', 4039, 'MP', 101, 'IN', 23.25469000, 77.40289000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q80989'),
(57997, 'Bhor', 4008, 'MH', 101, 'IN', 18.14861000, 73.84336000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q797462'),
(57998, 'Bhowali', 4016, 'UT', 101, 'IN', 29.38985000, 79.50481000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796801'),
(57999, 'Bhuban', 4013, 'OR', 101, 'IN', 20.88197000, 85.83334000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796742'),
(58000, 'Bhubaneshwar', 4013, 'OR', 101, 'IN', 20.27241000, 85.83385000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q171771'),
(58001, 'Bhudgaon', 4008, 'MH', 101, 'IN', 16.90742000, 74.59954000, '2019-10-05 18:53:45', '2021-06-06 09:11:00', 1, 'Q26791355'),
(58002, 'Bhuj', 4030, 'GJ', 101, 'IN', 23.25397000, 69.66928000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q798382'),
(58004, 'Bhuma', 4014, 'RJ', 101, 'IN', 27.78333000, 74.93333000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q4902137'),
(58005, 'Bhusaval', 4008, 'MH', 101, 'IN', 21.04365000, 75.78506000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q796650'),
(58006, 'Bhabhra', 4039, 'MP', 101, 'IN', 22.53048000, 74.32846000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q796650'),
(58007, 'Bhadra', 4014, 'RJ', 101, 'IN', 29.10298000, 75.17138000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q777668'),
(58008, 'Bhadasar', 4014, 'RJ', 101, 'IN', 28.31457000, 74.28952000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q777668'),
(58009, 'Bhagalpur', 4037, 'BR', 101, 'IN', 25.29023000, 87.06665000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q49155'),
(58010, 'Bhalki', 4026, 'KA', 101, 'IN', 18.04348000, 77.20600000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q49155'),
(58011, 'Bhander', 4039, 'MP', 101, 'IN', 25.73581000, 78.74555000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q759166'),
(58012, 'Bhanpura', 4039, 'MP', 101, 'IN', 24.51300000, 75.74690000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q674268'),
(58013, 'Bhanpuri', 4040, 'CT', 101, 'IN', 21.09190000, 80.93218000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q720123'),
(58014, 'Bhanvad', 4030, 'GJ', 101, 'IN', 21.93053000, 69.78081000, '2019-10-05 18:53:45', '2020-06-14 11:24:33', 1, 'Q720917'),
(58015, 'Bhatapara', 4040, 'CT', 101, 'IN', 21.73500000, 81.94711000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q757847'),
(58017, 'Bhayavadar', 4030, 'GJ', 101, 'IN', 21.85523000, 70.24791000, '2019-10-05 18:53:45', '2020-06-14 11:24:39', 1, 'Q759168'),
(58018, 'Bhikhi', 4015, 'PB', 101, 'IN', 30.05918000, 75.53500000, '2019-10-05 18:53:45', '2020-07-04 07:24:05', 1, 'Q2546717'),
(58019, 'Bhilwara', 4014, 'RJ', 101, 'IN', 25.50000000, 74.75000000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q41991'),
(58020, 'Bhim Tal', 4016, 'UT', 101, 'IN', 29.34447000, 79.56336000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q41991'),
(58021, 'Bhimavaram', 4017, 'AP', 101, 'IN', 16.54078000, 81.52322000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q757853'),
(58022, 'Bhimunipatnam', 4017, 'AP', 101, 'IN', 17.89017000, 83.45203000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q2483868'),
(58023, 'Bhinmal', 4014, 'RJ', 101, 'IN', 24.99944000, 72.27141000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q797437'),
(58024, 'Bhum', 4008, 'MH', 101, 'IN', 18.45908000, 75.65877000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q796520'),
(58025, 'Biaora', 4039, 'MP', 101, 'IN', 23.92050000, 76.91074000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q796769'),
(58026, 'Bid', 4008, 'MH', 101, 'IN', 18.83333000, 75.75000000, '2019-10-05 18:53:45', '2019-10-05 18:53:45', 1, 'Q814037'),
(58027, 'Bidhuna', 4022, 'UP', 101, 'IN', 26.80172000, 79.50829000, '2019-10-05 18:53:45', '2021-02-20 13:14:02', 1, 'Q796775'),
(58028, 'Bihpuriagaon', 4027, 'AS', 101, 'IN', 27.01718000, 93.91673000, '2019-10-05 18:53:45', '2021-02-20 13:12:44', 1, 'Q796775'),
(58029, 'Bihar Sharif', 4037, 'BR', 101, 'IN', 25.20084000, 85.52389000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q2308343'),
(58030, 'Bihariganj', 4037, 'BR', 101, 'IN', 25.73415000, 86.98837000, '2019-10-05 18:53:45', '2021-02-20 13:13:29', 1, 'Q4907104'),
(58031, 'Bijapur', 4026, 'KA', 101, 'IN', 16.82442000, 75.71537000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q3636023'),
(58032, 'Bijapur', 4040, 'CT', 101, 'IN', 18.84322000, 80.77610000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q100164'),
(58033, 'Bijbehara', 4029, 'JK', 101, 'IN', 33.79378000, 75.10700000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q100164'),
(58034, 'Bijni', 4027, 'AS', 101, 'IN', 26.49588000, 90.70298000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q797126'),
(58035, 'Bijnor', 4022, 'UP', 101, 'IN', 29.41667000, 78.51667000, '2019-10-05 19:03:48', '2021-06-06 07:41:13', 1, 'Q796664'),
(58036, 'Bijrauni', 4039, 'MP', 101, 'IN', 24.93296000, 77.64352000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q1937865'),
(58038, 'Bijawar', 4039, 'MP', 101, 'IN', 24.62351000, 79.48994000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q797222'),
(58039, 'Bikramganj', 4037, 'BR', 101, 'IN', 25.21073000, 84.25508000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q796526'),
(58040, 'Bilariaganj', 4022, 'UP', 101, 'IN', 26.19593000, 83.22690000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q795717'),
(58041, 'Bilaspur', 4020, 'HP', 101, 'IN', 31.33027000, 76.75663000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q795717'),
(58042, 'Bilgi', 4026, 'KA', 101, 'IN', 16.34714000, 75.61804000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q796485'),
(58043, 'Bilgram', 4022, 'UP', 101, 'IN', 27.17509000, 80.03201000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q795814'),
(58044, 'Bilhaur', 4022, 'UP', 101, 'IN', 26.84345000, 80.06388000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858170'),
(58045, 'Bilimora', 4030, 'GJ', 101, 'IN', 20.76957000, 72.96134000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q862141'),
(58046, 'Bilkha', 4030, 'GJ', 101, 'IN', 21.44150000, 70.60063000, '2019-10-05 19:03:48', '2021-06-06 07:55:54', 1, 'Q11909377'),
(58047, 'Biloli', 4008, 'MH', 101, 'IN', 18.77385000, 77.72463000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q861330'),
(58048, 'Bilsanda', 4022, 'UP', 101, 'IN', 28.24341000, 79.95135000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q861856'),
(58049, 'Bilsi', 4022, 'UP', 101, 'IN', 28.12941000, 78.91090000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859148'),
(58050, 'Bilthra', 4022, 'UP', 101, 'IN', 26.12705000, 83.89148000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859148'),
(58051, 'Bilara', 4014, 'RJ', 101, 'IN', 26.18067000, 73.70550000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q796497'),
(58052, 'Bilari', 4022, 'UP', 101, 'IN', 28.62146000, 78.80361000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q796749'),
(58053, 'Bilasipara', 4027, 'AS', 101, 'IN', 26.23285000, 90.23410000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q795803'),
(58054, 'Bilaspur', 4007, 'HR', 101, 'IN', 30.30450000, 77.30424000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q3639927'),
(58055, 'Bilaspur', 4040, 'CT', 101, 'IN', 22.38333000, 82.13333000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q100157'),
(58057, 'Bindki', 4022, 'UP', 101, 'IN', 26.03613000, 80.57617000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858148'),
(58058, 'Binka', 4013, 'OR', 101, 'IN', 21.02626000, 83.81197000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q860226'),
(58059, 'Birbhaddar', 4016, 'UT', 101, 'IN', 30.07120000, 78.28189000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q860226'),
(58060, 'Birmitrapur', 4013, 'OR', 101, 'IN', 22.40000000, 84.76667000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q860226'),
(58061, 'Birur', 4026, 'KA', 101, 'IN', 13.59723000, 75.97167000, '2019-10-05 19:03:48', '2021-02-20 13:14:02', 1, 'Q861119'),
(58062, 'Bisauli', 4022, 'UP', 101, 'IN', 28.30772000, 78.93678000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q862048'),
(58063, 'Bisenda Buzurg', 4022, 'UP', 101, 'IN', 25.40350000, 80.61889000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859094'),
(58064, 'Bishnupur', 4010, 'MN', 101, 'IN', 24.60769000, 93.77998000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859094'),
(58065, 'Bishnah', 4029, 'JK', 101, 'IN', 32.61060000, 74.85557000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q861136'),
(58066, 'Bishunpur Urf Maharajganj', 4022, 'UP', 101, 'IN', 26.25914000, 83.11643000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q2606051'),
(58067, 'Bissau', 4014, 'RJ', 101, 'IN', 28.24737000, 75.07666000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q739697'),
(58068, 'Biswan', 4022, 'UP', 101, 'IN', 27.49581000, 80.99618000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q858291'),
(58069, 'Bithur', 4022, 'UP', 101, 'IN', 26.60664000, 80.27098000, '2019-10-05 19:03:48', '2021-02-20 13:14:02', 1, 'Q858291'),
(58070, 'Bobbili', 4017, 'AP', 101, 'IN', 18.57366000, 83.35925000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q861841'),
(58071, 'Bodhan', 4012, 'TG', 101, 'IN', 18.66208000, 77.88581000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859167'),
(58072, 'Bodinayakkanur', 4035, 'TN', 101, 'IN', 10.01171000, 77.34976000, '2019-10-05 19:03:48', '2021-02-20 13:14:02', 1, 'Q859153'),
(58073, 'Bodri', 4039, 'MP', 101, 'IN', 23.16524000, 81.43262000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858405'),
(58074, 'Boisar', 4008, 'MH', 101, 'IN', 19.80362000, 72.75598000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858592'),
(58075, 'Bokajan', 4027, 'AS', 101, 'IN', 26.02131000, 93.77945000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q633816'),
(58076, 'Bokaro', 4025, 'JH', 101, 'IN', 23.68562000, 85.99026000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q2295925'),
(58077, 'Bokakhat', 4027, 'AS', 101, 'IN', 26.64018000, 93.60052000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q859160'),
(58079, 'Bolanikhodan', 4013, 'OR', 101, 'IN', 22.11312000, 85.33645000, '2019-10-05 19:03:48', '2021-02-20 13:13:29', 1, 'Q1926941'),
(58080, 'Bomdila', 4024, 'AR', 101, 'IN', 27.26475000, 92.42472000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q859141'),
(58081, 'Bongaigaon', 4027, 'AS', 101, 'IN', 26.46030000, 90.64640000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q42197'),
(58082, 'Borivli', 4008, 'MH', 101, 'IN', 19.23496000, 72.85976000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q4945504'),
(58083, 'Borkhera', 4014, 'RJ', 101, 'IN', 25.52115000, 75.64028000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q4945504'),
(58084, 'Borsad', 4030, 'GJ', 101, 'IN', 22.40788000, 72.89817000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858219'),
(58085, 'Botad', 4030, 'GJ', 101, 'IN', 22.16917000, 71.66671000, '2019-10-05 19:03:48', '2020-06-14 11:24:43', 1, 'Q858162'),
(58086, 'Brahmapur', 4013, 'OR', 101, 'IN', 19.31151000, 84.79290000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q860210'),
(58087, 'Brajarajnagar', 4013, 'OR', 101, 'IN', 21.81667000, 83.91667000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q860215'),
(58088, 'Budaun', 4022, 'UP', 101, 'IN', 28.11667000, 78.98333000, '2019-10-05 19:03:48', '2021-06-06 07:41:13', 1, 'Q798839'),
(58089, 'Buddh Gaya', 4037, 'BR', 101, 'IN', 24.69808000, 84.98690000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q176767'),
(58090, 'Budhlada', 4015, 'PB', 101, 'IN', 29.92799000, 75.56205000, '2019-10-05 19:03:48', '2020-07-04 07:24:08', 1, 'Q783187'),
(58091, 'Budhana', 4022, 'UP', 101, 'IN', 29.28805000, 77.47534000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q861968'),
(58092, 'Buguda', 4013, 'OR', 101, 'IN', 19.80806000, 84.79084000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q858514'),
(58093, 'Bulandshahr', 4022, 'UP', 101, 'IN', 28.41667000, 77.83333000, '2019-10-05 19:03:48', '2021-06-06 07:41:13', 1, 'Q861248'),
(58094, 'Buldana', 4008, 'MH', 101, 'IN', 20.58333000, 76.41667000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q1752328'),
(58096, 'Burhanpur', 4039, 'MP', 101, 'IN', 21.31000000, 76.23000000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q2125592'),
(58097, 'Burhar', 4039, 'MP', 101, 'IN', 23.21494000, 81.53204000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q861346'),
(58099, 'Burla', 4013, 'OR', 101, 'IN', 21.50976000, 83.87259000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q1937513'),
(58100, 'Buxar', 4037, 'BR', 101, 'IN', 25.50000000, 84.10000000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q49161'),
(58101, 'Byndoor', 4026, 'KA', 101, 'IN', 13.86667000, 74.63333000, '2019-10-05 19:03:48', '2019-10-05 19:03:48', 1, 'Q3595293'),
(58102, 'Byadgi', 4026, 'KA', 101, 'IN', 14.67325000, 75.48680000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q858385'),
(58103, 'Babai', 4039, 'MP', 101, 'IN', 22.70256000, 77.93494000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q765367'),
(58104, 'Babra', 4030, 'GJ', 101, 'IN', 21.84577000, 71.30544000, '2019-10-05 19:03:48', '2020-06-14 11:24:46', 1, 'Q8239185'),
(58105, 'Badami', 4026, 'KA', 101, 'IN', 15.91495000, 75.67683000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q8239185'),
(58106, 'Bag', 4039, 'MP', 101, 'IN', 22.35905000, 74.79052000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q1924964'),
(58107, 'Bagepalli', 4026, 'KA', 101, 'IN', 13.78338000, 77.79667000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q633164'),
(58109, 'Bagha Purana', 4015, 'PB', 101, 'IN', 30.68809000, 75.09838000, '2019-10-05 19:03:48', '2020-07-04 07:24:13', 1, 'Q625714'),
(58111, 'Bagli', 4039, 'MP', 101, 'IN', 22.64124000, 76.34877000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q2719910'),
(58112, 'Bah', 4022, 'UP', 101, 'IN', 26.86912000, 78.59385000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q633132'),
(58113, 'Bajna', 4022, 'UP', 101, 'IN', 27.89793000, 77.67836000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q2426646'),
(58114, 'Baleshwar', 4013, 'OR', 101, 'IN', 21.50000000, 86.75000000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q2022279'),
(58115, 'Bali', 4014, 'RJ', 101, 'IN', 25.19725000, 73.29117000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q632862'),
(58116, 'Balotra', 4014, 'RJ', 101, 'IN', 25.83242000, 72.24000000, '2019-10-05 19:03:48', '2021-02-20 13:12:44', 1, 'Q638695'),
(58117, 'Balugaon', 4013, 'OR', 101, 'IN', 20.17838000, 85.11327000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q632799'),
(58118, 'Balachor', 4015, 'PB', 101, 'IN', 31.06062000, 76.30166000, '2019-10-05 19:03:49', '2020-07-04 07:24:20', 1, 'Q632799'),
(58119, 'Balaghat', 4039, 'MP', 101, 'IN', 21.96667000, 80.33333000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q641904'),
(58120, 'Balapur', 4012, 'TG', 101, 'IN', 17.31018000, 78.49969000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q641904'),
(58121, 'Balapur', 4008, 'MH', 101, 'IN', 20.66612000, 76.77386000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q2315612'),
(58122, 'Bamor Kalan', 4039, 'MP', 101, 'IN', 24.89298000, 78.15105000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q622611'),
(58123, 'Banapur', 4013, 'OR', 101, 'IN', 19.77889000, 85.17033000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q632773'),
(58124, 'Banda', 4022, 'UP', 101, 'IN', 25.50000000, 80.50000000, '2019-10-05 19:03:49', '2021-06-06 07:41:13', 1, 'Q2575623'),
(58125, 'Bandikui', 4014, 'RJ', 101, 'IN', 27.05087000, 76.57325000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q629203'),
(58126, 'Bangarmau', 4022, 'UP', 101, 'IN', 26.89120000, 80.21149000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q607333'),
(58128, 'Banki', 4013, 'OR', 101, 'IN', 20.37912000, 85.52953000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q2563333'),
(58129, 'Banposh', 4013, 'OR', 101, 'IN', 22.24834000, 84.81044000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q2563333'),
(58130, 'Bansdih', 4022, 'UP', 101, 'IN', 25.88377000, 84.21827000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q637106'),
(58131, 'Bansgaon', 4022, 'UP', 101, 'IN', 26.55032000, 83.34503000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q625687'),
(58132, 'Bansi', 4022, 'UP', 101, 'IN', 27.17749000, 82.93442000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q637722'),
(58133, 'Banswada', 4012, 'TG', 101, 'IN', 18.37725000, 77.88007000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q3428196'),
(58134, 'Banswara', 4014, 'RJ', 101, 'IN', 23.54109000, 74.44250000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q633308'),
(58135, 'Bantva', 4030, 'GJ', 101, 'IN', 21.48815000, 70.07576000, '2019-10-05 19:03:49', '2020-06-14 11:24:49', 1, 'Q625718'),
(58136, 'Banavar', 4026, 'KA', 101, 'IN', 13.41029000, 76.16314000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q625718'),
(58137, 'Bapatla', 4017, 'AP', 101, 'IN', 15.90422000, 80.46743000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q633274'),
(58138, 'Bara Banki', 4022, 'UP', 101, 'IN', 26.93864000, 81.32740000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q633274'),
(58139, 'Baramula', 4029, 'JK', 101, 'IN', 34.19287000, 74.36920000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q633274'),
(58140, 'Bardoli', 4030, 'GJ', 101, 'IN', 21.12297000, 73.11151000, '2019-10-05 19:03:49', '2020-06-14 11:24:52', 1, 'Q712003'),
(58141, 'Barh', 4037, 'BR', 101, 'IN', 25.48339000, 85.70928000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q709313'),
(58142, 'Bari', 4014, 'RJ', 101, 'IN', 26.64661000, 77.61634000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q707848'),
(58143, 'Barmer', 4014, 'RJ', 101, 'IN', 25.75000000, 71.50000000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q42016'),
(58144, 'Barsi', 4008, 'MH', 101, 'IN', 18.23454000, 75.69275000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q42016'),
(58145, 'Baruni', 4037, 'BR', 101, 'IN', 25.47509000, 85.96813000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q42016'),
(58146, 'Baramati', 4008, 'MH', 101, 'IN', 18.15174000, 74.57767000, '2019-10-05 19:03:49', '2021-06-06 09:11:00', 1, 'Q712015'),
(58148, 'Basoda', 4039, 'MP', 101, 'IN', 23.85153000, 77.93652000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q714617'),
(58149, 'Basudebpur', 4013, 'OR', 101, 'IN', 21.11974000, 86.72896000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q712632'),
(58150, 'Basugaon', 4027, 'AS', 101, 'IN', 26.46742000, 90.41951000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q712428'),
(58151, 'Basar', 4024, 'AR', 101, 'IN', 27.99008000, 94.69451000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q712428'),
(58152, 'Bawal', 4007, 'HR', 101, 'IN', 28.07184000, 76.58312000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q759164'),
(58153, 'Bazpur', 4016, 'UT', 101, 'IN', 29.15299000, 79.10814000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q759164'),
(58154, 'Bidar', 4026, 'KA', 101, 'IN', 18.08333000, 77.33333000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q1790568'),
(58155, 'Bighapur Khurd', 4022, 'UP', 101, 'IN', 26.34734000, 80.65698000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q796734'),
(58156, 'Bikaner', 4014, 'RJ', 101, 'IN', 28.01762000, 73.31495000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q200718'),
(58158, 'Bikapur', 4022, 'UP', 101, 'IN', 26.59534000, 82.13272000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q795718'),
(58159, 'Bilaspur', 4022, 'UP', 101, 'IN', 28.88655000, 79.27030000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q795718'),
(58160, 'Birpur', 4037, 'BR', 101, 'IN', 26.50823000, 87.01194000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q795718'),
(58161, 'Bisalpur', 4022, 'UP', 101, 'IN', 28.29253000, 79.80472000, '2019-10-05 19:03:49', '2021-02-20 13:13:29', 1, 'Q858297'),
(58162, 'Bundi', 4014, 'RJ', 101, 'IN', 25.43855000, 75.63735000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q862612'),
(58163, 'Bundu', 4025, 'JH', 101, 'IN', 23.16095000, 85.59007000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q862612'),
(58164, 'Buriya', 4007, 'HR', 101, 'IN', 30.15911000, 77.35814000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q862612'),
(58165, 'Calangute', 4009, 'GA', 101, 'IN', 15.54390000, 73.75530000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q861976'),
(58166, 'Canacona', 4026, 'KA', 101, 'IN', 14.99590000, 74.05056000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q861976'),
(58167, 'Candolim', 4009, 'GA', 101, 'IN', 15.51807000, 73.76259000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q858424'),
(58168, 'Captainganj', 4022, 'UP', 101, 'IN', 26.92640000, 83.71334000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2544447'),
(58169, 'Carapur', 4009, 'GA', 101, 'IN', 15.56588000, 73.98713000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q861379'),
(58170, 'Cavelossim', 4009, 'GA', 101, 'IN', 15.17255000, 73.94194000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q5054993'),
(58171, 'Central Delhi', 4021, 'DL', 101, 'IN', 28.64857000, 77.21895000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q107941'),
(58172, 'Chail', 4022, 'UP', 101, 'IN', 25.42654000, 81.63198000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q3665740'),
(58173, 'Chakia', 4022, 'UP', 101, 'IN', 25.04891000, 83.22155000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q3665752'),
(58174, 'Chaklasi', 4030, 'GJ', 101, 'IN', 22.65320000, 72.94497000, '2019-10-05 19:03:49', '2020-06-14 11:24:55', 1, 'Q607388'),
(58175, 'Chakradharpur', 4025, 'JH', 101, 'IN', 22.67611000, 85.62892000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q278913'),
(58176, 'Chakrata', 4016, 'UT', 101, 'IN', 30.70369000, 77.86386000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q858555'),
(58177, 'Chaksu', 4014, 'RJ', 101, 'IN', 26.60510000, 75.94814000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q861891'),
(58178, 'Challakere', 4026, 'KA', 101, 'IN', 14.31800000, 76.65165000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2340109'),
(58179, 'Challapalle', 4017, 'AP', 101, 'IN', 16.11756000, 80.93139000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2340109'),
(58180, 'Chalala', 4030, 'GJ', 101, 'IN', 21.41073000, 71.16621000, '2019-10-05 19:03:49', '2020-06-14 11:24:57', 1, 'Q858287'),
(58181, 'Chamba', 4020, 'HP', 101, 'IN', 32.57147000, 76.10229000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q1060614'),
(58182, 'Chamoli', 4016, 'UT', 101, 'IN', 30.50000000, 79.50000000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q1797372'),
(58183, 'Champawat', 4016, 'UT', 101, 'IN', 29.28756000, 80.03737000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q1797372'),
(58184, 'Champhai', 4036, 'MZ', 101, 'IN', 23.47444000, 93.32556000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q1965256'),
(58185, 'Chamrajnagar', 4026, 'KA', 101, 'IN', 11.96000000, 77.09000000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q1965256'),
(58186, 'Chandauli', 4022, 'UP', 101, 'IN', 25.25803000, 83.26825000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2733368'),
(58187, 'Chandauli District', 4022, 'UP', 101, 'IN', 25.26134000, 83.26408000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2733368'),
(58188, 'Chanderi', 4039, 'MP', 101, 'IN', 24.71312000, 78.13809000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q860192'),
(58189, 'Chandia', 4039, 'MP', 101, 'IN', 23.65647000, 80.70911000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2446932'),
(58190, 'Chandigarh', 4031, 'CH', 101, 'IN', 30.73629000, 76.78840000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q2446932'),
(58191, 'Chandla', 4039, 'MP', 101, 'IN', 25.07148000, 80.19294000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q858413'),
(58192, 'Chandrapur', 4008, 'MH', 101, 'IN', 20.11793000, 79.44377000, '2019-10-05 19:03:49', '2021-06-06 09:11:00', 1, 'Q861194'),
(58193, 'Chanduasi', 4022, 'UP', 101, 'IN', 28.45178000, 78.78277000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q858672'),
(58194, 'Chandur', 4012, 'TG', 101, 'IN', 17.87455000, 78.10017000, '2019-10-05 19:03:49', '2021-02-20 13:14:02', 1, 'Q721388'),
(58195, 'Changanacheri', 4028, 'KL', 101, 'IN', 9.44203000, 76.53604000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q721388'),
(58196, 'Changlang', 4024, 'AR', 101, 'IN', 27.36265000, 96.34518000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q15427'),
(58197, 'Channagiri', 4026, 'KA', 101, 'IN', 14.02399000, 75.92577000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q15427'),
(58198, 'Channapatna', 4026, 'KA', 101, 'IN', 12.65143000, 77.20672000, '2019-10-05 19:03:49', '2019-10-05 19:03:49', 1, 'Q721354'),
(58199, 'Channarayapatna', 4026, 'KA', 101, 'IN', 12.90642000, 76.38775000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q886632'),
(58200, 'Charkhi Dadri', 4007, 'HR', 101, 'IN', 28.59166000, 76.27161000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q888946'),
(58201, 'Charkhari', 4022, 'UP', 101, 'IN', 25.40304000, 79.74877000, '2019-10-05 19:03:49', '2021-02-20 13:12:44', 1, 'Q886602');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `iso3` char(3) DEFAULT NULL,
  `iso2` char(2) DEFAULT NULL,
  `phonecode` varchar(255) DEFAULT NULL,
  `capital` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(255) DEFAULT NULL,
  `tld` varchar(255) DEFAULT NULL,
  `native` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `subregion` varchar(255) DEFAULT NULL,
  `timezones` text DEFAULT NULL,
  `translations` text DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `emoji` varchar(191) DEFAULT NULL,
  `emojiU` varchar(191) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT 1,
  `wikiDataId` varchar(255) DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `iso3`, `iso2`, `phonecode`, `capital`, `currency`, `currency_symbol`, `tld`, `native`, `region`, `subregion`, `timezones`, `translations`, `latitude`, `longitude`, `emoji`, `emojiU`, `created_at`, `updated_at`, `flag`, `wikiDataId`) VALUES
(101, 'India', 'IND', 'IN', '91', 'New Delhi', 'INR', '₹', '.in', 'भारत', 'Asia', 'Southern Asia', '[{\"zoneName\":\"Asia\\/Kolkata\",\"gmtOffset\":19800,\"gmtOffsetName\":\"UTC+05:30\",\"abbreviation\":\"IST\",\"tzName\":\"Indian Standard Time\"}]', '{\"kr\":\"인도\",\"br\":\"Índia\",\"pt\":\"Índia\",\"nl\":\"India\",\"hr\":\"Indija\",\"fa\":\"هند\",\"de\":\"Indien\",\"es\":\"India\",\"fr\":\"Inde\",\"ja\":\"インド\",\"it\":\"India\",\"cn\":\"印度\"}', 20.00000000, 77.00000000, '🇮🇳', 'U+1F1EE U+1F1F3', '2018-07-20 20:11:03', '2021-07-17 15:01:29', 1, 'Q668');

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
(19, 'view_dashboard', '2025-02-15 06:20:04', '2025-02-15 06:20:04'),
(20, 'activedeactive_user', '2025-10-06 04:41:06', '2025-10-06 07:10:29'),
(21, 'view_sdr', '2025-10-06 09:10:39', '2025-10-06 09:10:39'),
(22, 'view_cdr', '2025-10-11 05:28:45', '2025-10-11 05:28:45'),
(23, 'view_settings', '2025-10-13 04:56:45', '2025-10-13 04:56:45'),
(24, 'create_settings', '2025-10-13 04:57:14', '2025-10-13 04:57:14'),
(25, 'update_settings', '2025-10-13 04:57:25', '2025-10-13 04:57:25'),
(26, 'delete_settings', '2025-10-13 04:57:46', '2025-10-13 04:57:46'),
(27, 'view_case', '2025-11-04 15:59:33', '2025-11-04 15:59:33'),
(28, 'create_case', '2025-11-04 15:59:47', '2025-11-04 15:59:47'),
(29, 'update_case', '2025-11-04 15:59:55', '2025-11-04 15:59:55'),
(30, 'delete_case', '2025-11-04 16:00:01', '2025-11-04 16:00:01'),
(31, 'view_bandobast', '2026-01-16 08:52:41', '2026-01-16 08:52:41'),
(32, 'create_bandobast', '2026-01-16 08:52:49', '2026-01-16 08:52:49'),
(33, 'update_bandobast', '2026-01-16 11:16:20', '2026-01-16 11:16:20'),
(34, 'approve_bandobast', '2026-01-16 11:16:26', '2026-01-16 11:16:26'),
(35, 'delete_bandobast', '2026-01-16 11:16:33', '2026-01-16 11:16:33'),
(36, 'view_master_data', '2026-01-19 16:29:29', '2026-01-19 16:29:29'),
(37, 'create_master_data', '2026-01-19 16:29:43', '2026-01-19 16:29:43'),
(38, 'update_master_data', '2026-01-19 16:29:55', '2026-01-19 16:29:55'),
(39, 'delete_master_data', '2026-01-19 16:30:07', '2026-01-19 16:30:07');

-- --------------------------------------------------------

--
-- Table structure for table `priority_levels`
--

CREATE TABLE `priority_levels` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `priority_levels`
--

INSERT INTO `priority_levels` (`id`, `name`, `color`, `level`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'Low', '#4CAF50', 1, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(2, 'Medium', '#FFC107', 2, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(3, 'High', '#FF9800', 3, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1),
(4, 'Critical', '#F44336', 4, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'super admin', '2024-07-20 12:46:46', '2024-07-20 12:46:46'),
(2, 'sub admin', '2024-07-20 12:46:46', '2024-07-20 12:46:46'),
(3, 'editor', '2024-07-20 12:46:46', '2024-07-20 12:46:46'),
(4, 'client', '2024-09-02 06:21:55', '2024-09-02 06:21:55'),
(5, 'Tech Peat', '2025-02-15 10:00:00', '2025-02-15 10:00:00'),
(6, 'client 2', '2025-02-15 10:30:01', '2025-02-15 10:30:01'),
(7, 'Naresh Mor', '2025-02-15 10:30:40', '2025-02-15 10:30:40');

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
(1, 19, '2025-02-15 06:22:31', '2025-02-15 06:22:31'),
(1, 20, '2025-10-11 05:53:57', '2025-10-11 05:53:57'),
(1, 21, '2025-10-11 05:53:57', '2025-10-11 05:53:57'),
(1, 22, '2025-10-11 05:28:45', '2025-10-11 05:28:45'),
(1, 23, '2025-10-13 04:56:45', '2025-10-13 04:56:45'),
(1, 24, '2025-10-13 04:57:14', '2025-10-13 04:57:14'),
(1, 25, '2025-10-13 04:57:25', '2025-10-13 04:57:25'),
(1, 26, '2025-10-13 04:57:46', '2025-10-13 04:57:46'),
(1, 27, '2025-11-04 15:59:33', '2025-11-04 15:59:33'),
(1, 28, '2025-11-04 15:59:47', '2025-11-04 15:59:47'),
(1, 29, '2025-11-04 15:59:55', '2025-11-04 15:59:55'),
(1, 30, '2025-11-04 16:00:01', '2025-11-04 16:00:01'),
(1, 31, '2026-01-16 08:52:41', '2026-01-16 08:52:41'),
(1, 32, '2026-01-16 08:52:49', '2026-01-16 08:52:49'),
(1, 33, '2026-01-16 11:16:20', '2026-01-16 11:16:20'),
(1, 34, '2026-01-16 11:16:26', '2026-01-16 11:16:26'),
(1, 35, '2026-01-16 11:16:33', '2026-01-16 11:16:33'),
(1, 36, '2026-01-19 16:29:29', '2026-01-19 16:29:29'),
(1, 37, '2026-01-19 16:29:43', '2026-01-19 16:29:43'),
(1, 38, '2026-01-19 16:29:55', '2026-01-19 16:29:55'),
(1, 39, '2026-01-19 16:30:07', '2026-01-19 16:30:07'),
(2, 1, '2025-10-11 04:39:29', '2025-10-11 04:39:29'),
(2, 2, '2025-10-11 04:39:29', '2025-10-11 04:39:29'),
(2, 3, '2025-10-06 09:09:23', '2025-10-06 09:09:23'),
(2, 7, '2025-10-11 04:41:36', '2025-10-11 04:41:36'),
(2, 11, '2025-10-11 04:41:36', '2025-10-11 04:41:36'),
(2, 17, '2025-10-06 09:09:23', '2025-10-06 09:09:23'),
(2, 18, '2025-10-06 09:09:23', '2025-10-06 09:09:23'),
(2, 19, '2025-10-06 09:09:23', '2025-10-06 09:09:23'),
(2, 21, '2025-10-06 09:10:47', '2025-10-06 09:10:47');

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

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `isSystemvariable` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `value`, `createdAt`, `updatedAt`, `isSystemvariable`) VALUES
(2, 'contact_email', 'info@example1.com', '2025-10-13 05:16:20', '2025-10-13 07:08:11', 0),
(4, 'Title', 'Mor', '2025-10-13 07:14:04', '2025-10-13 07:14:04', 0),
(5, 'max_otp_attempts', '5', '2025-10-16 11:21:07', '2025-10-16 11:21:07', 1),
(6, 'block_duration_hours', '24', '2025-10-16 11:21:07', '2025-10-16 11:21:07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_id` mediumint(8) UNSIGNED NOT NULL,
  `country_code` char(2) NOT NULL,
  `fips_code` varchar(255) DEFAULT NULL,
  `iso2` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT 1,
  `wikiDataId` varchar(255) DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `country_id`, `country_code`, `fips_code`, `iso2`, `latitude`, `longitude`, `created_at`, `updated_at`, `flag`, `wikiDataId`) VALUES
(4006, 'Meghalaya', 101, 'IN', '18', 'ML', 25.46703080, 91.36621600, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1195'),
(4007, 'Haryana', 101, 'IN', '10', 'HR', 29.05877570, 76.08560100, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1174'),
(4008, 'Maharashtra', 101, 'IN', '16', 'MH', 19.75147980, 75.71388840, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1191'),
(4009, 'Goa', 101, 'IN', '33', 'GA', 15.29932650, 74.12399600, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1171'),
(4010, 'Manipur', 101, 'IN', '17', 'MN', 24.66371730, 93.90626880, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1193'),
(4011, 'Puducherry', 101, 'IN', '22', 'PY', 11.94159150, 79.80831330, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q66743'),
(4012, 'Telangana', 101, 'IN', '40', 'TG', 18.11243720, 79.01929970, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q677037'),
(4013, 'Odisha', 101, 'IN', '21', 'OR', 20.95166580, 85.09852360, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q22048'),
(4014, 'Rajasthan', 101, 'IN', '24', 'RJ', 27.02380360, 74.21793260, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1437'),
(4015, 'Punjab', 101, 'IN', '23', 'PB', NULL, NULL, '2019-10-05 17:48:57', '2019-10-05 17:48:57', 1, 'Q22424'),
(4016, 'Uttarakhand', 101, 'IN', '39', 'UT', 30.06675300, 79.01929970, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1499'),
(4017, 'Andhra Pradesh', 101, 'IN', '02', 'AP', 15.91289980, 79.73998750, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1159'),
(4018, 'Nagaland', 101, 'IN', '20', 'NL', 26.15843540, 94.56244260, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1599'),
(4019, 'Lakshadweep', 101, 'IN', '14', 'LD', 10.32802650, 72.78463360, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q26927'),
(4020, 'Himachal Pradesh', 101, 'IN', '11', 'HP', 31.10482940, 77.17339010, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1177'),
(4021, 'Delhi', 101, 'IN', '07', 'DL', 28.70405920, 77.10249020, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1353'),
(4022, 'Uttar Pradesh', 101, 'IN', '36', 'UP', 26.84670880, 80.94615920, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1498'),
(4023, 'Andaman and Nicobar Islands', 101, 'IN', '01', 'AN', 11.74008670, 92.65864010, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q40888'),
(4024, 'Arunachal Pradesh', 101, 'IN', '30', 'AR', 28.21799940, 94.72775280, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1162'),
(4025, 'Jharkhand', 101, 'IN', '38', 'JH', 23.61018080, 85.27993540, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1184'),
(4026, 'Karnataka', 101, 'IN', '19', 'KA', 15.31727750, 75.71388840, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1185'),
(4027, 'Assam', 101, 'IN', '03', 'AS', 26.20060430, 92.93757390, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1164'),
(4028, 'Kerala', 101, 'IN', '13', 'KL', 10.85051590, 76.27108330, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1186'),
(4029, 'Jammu and Kashmir', 101, 'IN', '12', 'JK', 33.27783900, 75.34121790, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1180'),
(4030, 'Gujarat', 101, 'IN', '09', 'GJ', 22.25865200, 71.19238050, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1061'),
(4031, 'Chandigarh', 101, 'IN', '05', 'CH', 30.73331480, 76.77941790, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q43433'),
(4033, 'Dadra and Nagar Haveli and Daman and Diu', 101, 'IN', '32', 'DH', 20.39737360, 72.83279910, '2019-10-05 17:48:57', '2021-05-30 15:58:52', 1, 'Q66710'),
(4034, 'Sikkim', 101, 'IN', '29', 'SK', 27.53297180, 88.51221780, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1505'),
(4035, 'Tamil Nadu', 101, 'IN', '25', 'TN', 11.12712250, 78.65689420, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1445'),
(4036, 'Mizoram', 101, 'IN', '31', 'MZ', 23.16454300, 92.93757390, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1502'),
(4037, 'Bihar', 101, 'IN', '34', 'BR', 25.09607420, 85.31311940, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1165'),
(4038, 'Tripura', 101, 'IN', '26', 'TR', 23.94084820, 91.98815270, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1363'),
(4039, 'Madhya Pradesh', 101, 'IN', '35', 'MP', 22.97342290, 78.65689420, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1188'),
(4040, 'Chhattisgarh', 101, 'IN', '37', 'CT', 21.27865670, 81.86614420, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1168'),
(4852, 'Ladakh', 101, 'IN', NULL, 'LA', 34.22684750, 77.56194190, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'MANUAL'),
(4853, 'West Bengal', 101, 'IN', '28', 'WB', 22.98675690, 87.85497550, '2019-10-05 17:48:57', '2020-12-21 15:50:22', 1, 'Q1356');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `lang` varchar(20) DEFAULT NULL,
  `parent_type` varchar(50) DEFAULT NULL,
  `child_type` varchar(50) DEFAULT NULL,
  `group_type` varchar(50) DEFAULT NULL,
  `platform_type` varchar(50) DEFAULT NULL,
  `canvas_width` varchar(10) DEFAULT NULL,
  `canvas_height` varchar(10) DEFAULT NULL,
  `canvas_units` varchar(10) DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `json_file` varchar(100) DEFAULT NULL,
  `old_json_file` varchar(100) DEFAULT NULL,
  `is_paid` int(11) DEFAULT 0,
  `status` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `threat_levels`
--

CREATE TABLE `threat_levels` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `threat_levels`
--

INSERT INTO `threat_levels` (`id`, `name`, `color`, `level`, `created_at`, `updated_at`, `is_active`, `description`) VALUES
(1, 'Low', '#4CAF50', 1, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(2, 'Moderate', '#FFC107', 2, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(3, 'High', '#FF9800', 3, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(4, 'Severe', '#F44336', 4, '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `mobileNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(254) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `city` mediumint(8) UNSIGNED DEFAULT NULL,
  `state` mediumint(8) UNSIGNED DEFAULT NULL,
  `country` mediumint(8) UNSIGNED DEFAULT NULL,
  `jobPosition` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0 CHECK (`isDeleted` in (0,1)),
  `otp` varchar(6) DEFAULT NULL,
  `otpAttempts` int(11) DEFAULT 0,
  `blockedUntil` datetime DEFAULT NULL,
  `lastOtpAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `roleId`, `mobileNumber`, `emailAddress`, `profilePicture`, `city`, `state`, `country`, `jobPosition`, `address`, `status`, `createdAt`, `updatedAt`, `isDeleted`, `otp`, `otpAttempts`, `blockedUntil`, `lastOtpAttempt`, `lastLoginIp`) VALUES
(1, 'Mor', '$2a$08$Jqj7GB.M.RUtOvIhZNAkfO.VNgH6EO3wwozikFsQIfR00DDNpJBV6', 1, '8469551552', 'mor@gmail.com', NULL, 57606, 4030, 101, NULL, '46/47, Gate no. 5, Shree Krishnanagar Society Opp.', 1, '2025-02-06 11:47:33', '2026-01-19 16:31:26', 0, '616838', 0, NULL, NULL, '152.58.62.133'),
(2, 'Naresh Mor', '$2a$08$FmckSlq77vf0f/Bgt0WLdeyk5qrVY/YlhsCgGndsfrJbCyNcJ/O5C', 2, '8469550554', 'nareshmor@gmail.com', NULL, 57606, 4030, 101, NULL, 'Ahmedabad new', 1, '2025-02-15 04:18:09', '2025-10-06 05:55:55', 0, NULL, 0, NULL, NULL, NULL),
(3, 'Naresh Mor', '$2a$08$6rbDxoTDZsb92DLrUPs.XuUl8wxY3VlCpzMDECcr71A59vnoN2omm', 2, '7778889999', 'mor1@gmail.com', NULL, 57606, 4030, 101, NULL, '46, Near Mahadev Mandir, Bhammar123', 1, '2025-10-06 04:32:55', '2025-10-16 08:53:08', 0, NULL, 0, NULL, NULL, NULL),
(15, 'Ravi Mor', '$2a$08$SdKc5.52qRtWFCZGEPK1PenqeqhVTIXNodEYsSnAGDtUysM.D6MRm', 2, '7778889991', 'ravi@brands.live', NULL, 57606, 4030, 101, NULL, '46, Near Mahadev Mandir, Bhammar', 0, '2025-10-11 04:25:52', '2025-10-11 06:08:44', 1, NULL, 0, NULL, NULL, NULL),
(16, 'Jayesh Kanani', '$2a$08$b0CZOjGUjUFmwSjRuslgrulg6iM.NZs/AS5MrkhrU3ogS1HLQpbdq', 2, '7778884567', 'jayesh@gmail.com', NULL, 57606, 4030, 101, NULL, '46, Near Mahadev Mandir, Saparsdsd', 0, '2025-10-16 10:44:57', '2025-10-16 10:48:14', 0, NULL, 0, NULL, NULL, NULL),
(17, 'Ashish Patel', '$2a$08$.KgV4jgg33LjI6iOPViBLegkKVk1d9mZs0HY/z/X.y5sLC9mXGF3C', 2, '8469450554', 'ashish@gmail.com', NULL, 57591, 4030, 101, NULL, 'adalaj', 0, '2025-10-16 10:47:30', '2025-10-16 10:47:57', 0, NULL, 0, NULL, NULL, NULL),
(18, 'vivek surani', '$2a$08$j2xJweF1j5V8j64LNj5me.u.52qliJzrng119AI0zeQRCFoX.m1/C', 2, '8464535554', 'vivek@gmail.com', NULL, 57685, 4030, 101, NULL, NULL, 0, '2025-10-16 11:30:17', '2025-10-16 11:30:17', 0, NULL, 0, NULL, NULL, NULL),
(19, 'rohit ramani', '$2a$08$kfjtT2UWtuIZUZefCSUT8OiTtAlTfy85dlFmICJZuvJEIfbEBY1Ue', 2, '8464568755', 'rohit@gmail.com', NULL, 57591, 4030, 101, NULL, 'adalajjj', 0, '2025-10-16 11:32:38', '2025-10-16 11:32:38', 0, NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_tokens`
--

INSERT INTO `user_tokens` (`id`, `token`, `userId`, `createdAt`, `updatedAt`) VALUES
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6MiwiaWF0IjoxNzYwMzQ0OTU5fQ.f91oTy1H8kmEMGk3JryDWeP2Vc65MLOLsXZXRdAbwsQ', 3, '2025-10-13 08:42:39', '2025-10-13 08:42:39'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNzY4ODQwMjg2fQ.i-CVZPrpPLFOClj3K6FU9IsNFKZhyS0TMgHDfbzItMA', 1, '2026-01-19 16:31:26', '2026-01-19 16:31:26');

-- --------------------------------------------------------

--
-- Table structure for table `vip_categories`
--

CREATE TABLE `vip_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `security_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vip_categories`
--

INSERT INTO `vip_categories` (`id`, `name`, `description`, `created_at`, `updated_at`, `is_active`, `security_level`) VALUES
(1, 'Z+ Security', 'Highest level of security with 36+ security personnel', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(2, 'Z Security', 'High security with 22+ security personnel', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(3, 'Y+ Security', 'Enhanced security with 11+ security personnel', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(4, 'Y Security', 'Standard high security with 11 security personnel', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(5, 'X Security', 'Basic security with 2-4 security personnel', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL),
(6, 'No Category', 'No specific security category assigned', '2026-01-16 10:42:51', '2026-01-16 10:42:51', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approving_authorities`
--
ALTER TABLE `approving_authorities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `designation` (`designation`);

--
-- Indexes for table `bandobasts`
--
ALTER TABLE `bandobasts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bandobast_type_id` (`bandobast_type_id`),
  ADD KEY `priority_id` (`priority_id`),
  ADD KEY `approving_authority_id` (`approving_authority_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `fk_bandobasts_vip_category` (`vip_category_id`),
  ADD KEY `fk_bandobasts_threat_level` (`threat_level_id`);

--
-- Indexes for table `bandobast_points`
--
ALTER TABLE `bandobast_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bandobast_points_bandobast` (`bandobast_id`);

--
-- Indexes for table `bandobast_point_officers`
--
ALTER TABLE `bandobast_point_officers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `idx_point_officers_point` (`point_id`),
  ADD KEY `idx_point_officers_bandobast` (`bandobast_id`);

--
-- Indexes for table `bandobast_staff`
--
ALTER TABLE `bandobast_staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bandobast_id` (`bandobast_id`);

--
-- Indexes for table `bandobast_types`
--
ALTER TABLE `bandobast_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `priority_levels`
--
ALTER TABLE `priority_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idx_priority_level` (`level`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`roleId`,`permissionId`),
  ADD UNIQUE KEY `role_permissions_permissionId_roleId_unique` (`roleId`,`permissionId`),
  ADD KEY `permissionId` (`permissionId`);

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
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `threat_levels`
--
ALTER TABLE `threat_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idx_threat_level` (`level`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailAddress` (`emailAddress`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `city` (`city`),
  ADD KEY `state` (`state`),
  ADD KEY `country` (`country`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_userId_roleId_unique` (`userId`,`roleId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `vip_categories`
--
ALTER TABLE `vip_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approving_authorities`
--
ALTER TABLE `approving_authorities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bandobasts`
--
ALTER TABLE `bandobasts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bandobast_points`
--
ALTER TABLE `bandobast_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `bandobast_point_officers`
--
ALTER TABLE `bandobast_point_officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `bandobast_staff`
--
ALTER TABLE `bandobast_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `bandobast_types`
--
ALTER TABLE `bandobast_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118224;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `priority_levels`
--
ALTER TABLE `priority_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sdr`
--
ALTER TABLE `sdr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4926;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `threat_levels`
--
ALTER TABLE `threat_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `vip_categories`
--
ALTER TABLE `vip_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bandobasts`
--
ALTER TABLE `bandobasts`
  ADD CONSTRAINT `bandobasts_ibfk_1` FOREIGN KEY (`bandobast_type_id`) REFERENCES `bandobast_types` (`id`),
  ADD CONSTRAINT `bandobasts_ibfk_2` FOREIGN KEY (`priority_id`) REFERENCES `priority_levels` (`id`),
  ADD CONSTRAINT `bandobasts_ibfk_5` FOREIGN KEY (`approving_authority_id`) REFERENCES `approving_authorities` (`id`),
  ADD CONSTRAINT `bandobasts_ibfk_6` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_bandobasts_threat_level` FOREIGN KEY (`threat_level_id`) REFERENCES `threat_levels` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_bandobasts_vip_category` FOREIGN KEY (`vip_category_id`) REFERENCES `vip_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `bandobast_points`
--
ALTER TABLE `bandobast_points`
  ADD CONSTRAINT `bandobast_points_ibfk_1` FOREIGN KEY (`bandobast_id`) REFERENCES `bandobasts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bandobast_point_officers`
--
ALTER TABLE `bandobast_point_officers`
  ADD CONSTRAINT `bandobast_point_officers_ibfk_1` FOREIGN KEY (`point_id`) REFERENCES `bandobast_points` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bandobast_point_officers_ibfk_2` FOREIGN KEY (`bandobast_id`) REFERENCES `bandobasts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bandobast_point_officers_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `bandobast_staff` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `bandobast_staff`
--
ALTER TABLE `bandobast_staff`
  ADD CONSTRAINT `bandobast_staff_ibfk_1` FOREIGN KEY (`bandobast_id`) REFERENCES `bandobasts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cities_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `states`
--
ALTER TABLE `states`
  ADD CONSTRAINT `states_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`city`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`state`) REFERENCES `states` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`country`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
