/* 
 * Student Info: Name=Pavanitha Kalyanam, ID=19361 
 * Subject: CS595(G)_GrabUrOffer_Spring_2017 
 * Author: KrishnaReddy 
 * Filename: graburoffer_offer.sql 
 * Date and Time: Mar 4, 2017 6:58:54 PM  
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

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(45) NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `IMAGE` varchar(45) NOT NULL,
  `START_DATE` varchar(25) NOT NULL,
  `END_DATE` varchar(25) NOT NULL,
  `CAT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `OFFER_CATEGORY_idx` (`CAT_ID`),
  CONSTRAINT `OFFER_CATEGORY` FOREIGN KEY (`CAT_ID`) REFERENCES `category` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (1,'GAP 5  Jeans for $79.99 Original $99.99','GAP JEANS SALE','gapjeans.jpg','02/15/2017','05/15/2017',1),(2,'20% CASH BACK OFFER ON PURCHASE ABOVE $500','NIKE SHOES','nikeshoe.jpg','02/15/2017','05/15/2017',1),(3,'BUY TWO GET ONE OFFER','COLUMBUS CLOTHING','apparel.jpg','02/15/2017','05/15/2017',1),(4,'15% Discout on buffet for above $100','Three Seasons Dining','buffet.jpg','02/15/2017','05/15/2017',2),(5,'Any Pizza for $20 on Weekends ','Newy York Pizza','pizza.jpg','02/15/2017','05/15/2017',2),(6,'15% Offer on kids warmset','Addidas','babywarmset.jpg','02/20/2017','03/20/2017',1),(7,'$99 Save on Reclainer','LivingSpace','reclainer.jpg','02/14/2017','04/4/2017',3),(8,'20% Offer on Fourchair dining table','Wallmart','furniture.jpg','02/15/2017','04/30/2017',3),(9,'20% Offer on mixer','Wallmart','mixer.jpg','02/20/2017','03/20/2017',4),(10,'$199 Save on kitechen Dishwasher set','Costco','compact.jpg','02/20/2017','04/20/2017',4),(11,'15% Offer on Hamilton Oven','Wallmart','oven.jpg','02/20/2017','4/23/2017',4),(12,'25% offer on Systemtabel','Ikea','systemtable.jpg','02/21/2017','02/28/2017',3);
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-04 18:40:54

