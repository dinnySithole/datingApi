# datingApi

.env file
APP_PORT=3000
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASS= 
MYSQL_DB=datingDB

mySql script
Stored Procedures
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_email`(IN `email` VARCHAR(255))
BEGIN
  SELECT *
  FROM userregistration
  WHERE email = email LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_by_id`(IN p_id INT)
BEGIN
  SELECT * FROM userregistration WHERE id = p_id LIMIT 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_users`()
BEGIN
  SELECT * FROM userregistration;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_userregistration`(IN `firstname` VARCHAR(255), IN `lastname` VARCHAR(255), IN `gender` VARCHAR(10), IN `occupation` VARCHAR(255), IN `address` VARCHAR(255), IN `hobbies` TEXT, IN `email` VARCHAR(255), IN `username` VARCHAR(255), IN `password` VARCHAR(255))
BEGIN
    INSERT INTO userregistration (firstname, lastname, gender, occupation, address, hobbies, email,username, password)
    VALUES (firstname, lastname, gender, occupation, address, hobbies, email,  username, password);
END$$
DELIMITER ;


Tables
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2023 at 02:50 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `userregistration`
--

CREATE TABLE `userregistration` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `hobbies` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userregistration`
--

INSERT INTO `userregistration` (`id`, `firstname`, `lastname`, `gender`, `occupation`, `address`, `hobbies`, `email`, `username`, `password`) VALUES
(8, 'Dineo', 'Sithole', 'Female', 'Developer', '822 Mabopane', 'Running', 'dineo@pulego.co.za', 'dineo@pulego.co.za', '$2b$10$LMT/PIKCPJXt0QM/rQm75.GKNKllOVl2eLVqo6YQyhR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userregistration`
--
ALTER TABLE `userregistration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userregistration`
--
ALTER TABLE `userregistration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


