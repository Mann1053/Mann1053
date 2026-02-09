DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `mobileNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(254) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `city` int DEFAULT NULL,
  `state` int DEFAULT NULL,
  `country` int DEFAULT NULL,
  `jobPosition` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress` (`emailAddress`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `roleId`, `mobileNumber`, `emailAddress`, `profilePicture`, `city`, `state`, `country`, `jobPosition`, `address`, `status`, `createdAt`, `updatedAt`) VALUES
(1,	'Mor',	'$2a$08$Jqj7GB.M.RUtOvIhZNAkfO.VNgH6EO3wwozikFsQIfR00DDNpJBV6',	1,	'8469551552',	'mor@gmail.com',	NULL,	57606,	4030,	101,	NULL,	'46/47, Gate no. 5, Shree Krishnanagar Society Opp.',	1,	'2025-02-06 11:47:33',	'2025-02-15 08:06:24'),
(2,	'Naresh Mor',	'$2a$08$FmckSlq77vf0f/Bgt0WLdeyk5qrVY/YlhsCgGndsfrJbCyNcJ/O5C',	7,	'8469550554',	'nareshmor@gmail.com',	NULL,	57606,	4030,	101,	NULL,	'Ahmedabad new',	1,	'2025-02-15 04:18:09',	'2025-02-15 12:32:27');
