-- MySQL dump 10.13  Distrib 5.7.12, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: authdb
-- ------------------------------------------------------
-- Server version	5.7.13-0ubuntu0.16.04.2

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=467 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (451,'Mohamed Anil','mohamed.anil@psm.mv','$2y$10$v1lWtVnBdmv76MHTlwVDxuKvD5yO4bk6KZx6RKS62DLP005iHCrZK','WppbJs1UA4Tw3Er1sOxDEmL8uTKMq0t3q8a8WNIfbNO2WcLljOrDX8L63CsX','1469877640.jpg',NULL,'2016-07-30 11:20:40'),(452,'Ismail Mohamedddd','ismail.mohamed@psm.mv','$2y$10$v1lWtVnBdmv76MHTlwVDxuKvD5yO4bk6KZx6RKS62DLP005iHCrZK','Otk1tsOwIikc2P85iJLE8em86jnXe28tPG9DdHSP7cHDWCcblNastnhKWAYc','1469881644.jpg',NULL,'2016-07-30 12:27:24'),(465,'something else','else@sdf.com','$2y$10$hE1kR.f9CpyXL5cuz3TsjuVNiwhab6J3AdIMqYSoLQutM0GIKS4AW',NULL,'placeholder.png','2016-07-30 12:33:57','2016-07-30 12:33:57'),(458,'New user','new@user.com','$2y$10$krv7SGJ3rSauB3fvRrxML.ORYqVikOqIdg6DSyixuy8GyVr.KACJW',NULL,'1469881788.png','2016-07-28 11:54:06','2016-07-30 12:29:48'),(464,'Another new person','another@psm.mv','$2y$10$zjBTgRsPaJH.bmORU2fyveicvhW5GWuyfpftdhyMegHuPy6Q.Bq0S',NULL,'placeholder.png','2016-07-30 12:32:22','2016-07-30 12:43:38'),(463,'Someone new','someone@new.com','$2y$10$ioXQ0ihESbhNtOBY3ew1j.VFlRrUJ4ySkZQfVqiCa/QJ/GaiwEyN6',NULL,'placeholder.png','2016-07-30 12:30:18','2016-07-30 12:30:18'),(466,'Hassan Anil','anil@is.creted','$2y$10$qdW9vvCx/RzvN3/J7HsLEOfnQqzYEsnfUGXdOLYKDXhwMDthu4Ndu',NULL,'placeholder.png','2016-07-30 12:40:50','2016-07-30 12:42:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-30 20:18:31
