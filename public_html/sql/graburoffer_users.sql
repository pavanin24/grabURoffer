/* 
 * Student Info: Name=Pavanitha Kalyanam, ID=19361 
 * Subject: CS595(G)_GrabUrOffer_Spring_2017 
 * Author: KrishnaReddy 
 * Filename: graburoffer_users.sql 
 * Date and Time: Mar 4, 2017 6:59:55 PM  
 * Project Name: GrabUrOfferProject 
 */ 
 /**
 * Author:  KrishnaReddy
 * Created: Mar 4, 2017
 */

-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: graburoffer
-- ------------------------------------------------------
-- Server version	5.7.17-log


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FULLNAME` varchar(40) NOT NULL,
  `EMAIL` varchar(45) NOT NULL,
  `CREATED_ON` varchar(25) NOT NULL,
  `UPDATED_ON` varchar(25) DEFAULT NULL,
  `PASSWORD` varchar(25) NOT NULL,
  `USERNAME` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1001,'RAGHURAM','raghu@gmail.com','2/21/2017','2/21/2017','test@123','Raghu'),(1002,'PAVANITHA','pavanitha@yahoo.com','2/21/2017','2/21/2017','1234','Pavanitha'),(1003,'SIRISHA','siri@gmail.com','2/21/2017','2/21/2017','xxxx','Siri'),(1004,'SINDHU','sindhu@gmail.com','2/21/2017','2/21/2017','abc123','Sindhu'),(1005,'RAJITHA','raji@gmail.com','2/21/2017','2/21/2017','test111','Rajitha');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

