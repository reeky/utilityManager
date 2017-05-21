-- MySQL dump 10.13  Distrib 5.7.12, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: utility_db
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.1

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
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2016_06_24_111426_create_roles_permissions_tables',2),('2016_06_24_114743_create_roles_permissions_tables',3),('2016_07_21_123358_create_sessions_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `role_id` int(10) unsigned NOT NULL,
  `permission_id` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_role_permission_id_foreign` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (33,38,'2016-07-31 14:55:43','2016-07-31 14:55:43'),(1,37,'2017-02-13 06:24:51','2017-02-13 06:24:51'),(1,1,NULL,NULL),(2,37,'2016-07-31 14:50:57','2016-07-31 14:50:57'),(33,40,'2016-07-31 15:15:14','2016-07-31 15:15:14'),(34,39,'2016-07-31 14:56:46','2016-07-31 14:56:46'),(1,38,NULL,NULL),(1,39,NULL,NULL),(1,40,NULL,NULL),(35,452,'2017-02-26 07:04:28','2017-02-26 07:04:28'),(1,452,'2017-02-26 07:04:36','2017-02-26 07:04:36');
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=453 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'super_admin','Has all the rights to the application',NULL,NULL),(39,'users_admin','Default permission for the users managers','2016-07-31 14:55:24','2017-02-13 04:45:32'),(40,'permissions_admin','Can manage permissions','2016-07-31 15:14:38','2016-07-31 15:14:38'),(37,'admin','This is the administrator permission for the application','2016-07-31 14:50:42','2016-07-31 14:50:42'),(38,'roles_admin','Can manage roles','2016-07-31 14:55:01','2016-07-31 15:14:56'),(452,'configuration_admin','Administrator for Configuration','2017-02-26 02:04:19','2017-02-26 02:04:19');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `readings`
--

DROP TABLE IF EXISTS `readings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `readings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `account` int(11) DEFAULT NULL,
  `date` bigint(14) DEFAULT NULL,
  `reading` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `readings`
--

LOCK TABLES `readings` WRITE;
/*!40000 ALTER TABLE `readings` DISABLE KEYS */;
/*!40000 ALTER TABLE `readings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `role_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `role_user_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,451,NULL,NULL);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Admin','Super administrator of the applications',NULL,'2017-02-14 01:36:25'),(2,'Admin','Administrator of the application',NULL,'2016-07-06 06:58:15'),(33,'Roles and Permissions Manager','Can manage all the roles and permissions of the application','2016-07-31 14:53:36','2016-07-31 14:53:36'),(34,'Users Manager','Can manage all the users on the application','2016-07-31 14:56:18','2017-02-14 01:36:20'),(35,'Configuration Manager','Administrator for Configuration','2017-02-26 02:03:50','2017-02-26 02:03:50');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2cf06346a7a7a4d4c8da35823f87db42a3b9e277',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiam5GQXRINFhtNTNScHBRS0ZtOExtMHF6aGo2VlVLRjJQWFF3VFdibSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoxMzoiaHR0cDovL3hpcy1ociI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE5OiJodHRwOi8veGlzLWhyL2xvZ2luIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQ3MzA0NjA2NTtzOjE6ImMiO2k6MTQ3MzA0NjA2NTtzOjE6ImwiO3M6MToiMCI7fX0=',1473046065),('42d9795e169e919055f2cd43e4f22a0bba6b6c46',NULL,'127.0.0.1','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRFNPYTlJb1JiQ2hCdnpLYlFaQUxBTWx3Q21LSnJQdXBQWm52WXZ3SCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoxMToiaHR0cDovL2F1dGgiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxMToiaHR0cDovL2F1dGgiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQ3MDA1MzgxOTtzOjE6ImMiO2k6MTQ3MDA1MzgxOTtzOjE6ImwiO3M6MToiMCI7fXM6NToiZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1470053819),('4764908d116b4912ca502b54f2adf7f57882cdee',451,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo2OntzOjY6Il90b2tlbiI7czo0MDoiRTRMa2E1eE1PMjFLZUgyVHpBSnI5eGExclFndXdPTTR4Y2ZBUkpleSI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vYXV0aC91c2Vycy80NTEiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ1MTtzOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQ3MjM5NjA3OTtzOjE6ImMiO2k6MTQ3MjM5NjA3MztzOjE6ImwiO3M6MToiMCI7fX0=',1472396079),('4a721221d41baa4e28ddc877820c0c2cb8511ab8',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiazVMM04yMjQ3R1YzVElNUnNoOUZoSnFOQ0ZFSjRJSm1mVzlCVkFlViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9hdXRoL3VzZXJzLzQ1MSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDczMDQ2NDU5O3M6MToiYyI7aToxNDczMDQ2NDU5O3M6MToibCI7czoxOiIwIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1473046459),('741d334677fa1fd699bb2975ab2bec86311b269a',451,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36','YTo2OntzOjY6Il90b2tlbiI7czo0MDoiekVxbFNwdXhmeGFuT1lGVTlmT2puczUwRHN4dGZieTEycGJHZ0oxVyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vYXV0aC91c2Vycy80NTEiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ1MTtzOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQ4NjI2NjAwNztzOjE6ImMiO2k6MTQ4NjI2NjAwMjtzOjE6ImwiO3M6MToiMCI7fX0=',1486266007),('81d3386e769848203b0265940adba5d2ab5c4d86',451,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo2OntzOjY6Il90b2tlbiI7czo0MDoib3g5aFhJdktUYXVEcXFxNmJJczZ3THFhbTI0cmc2NW9KQkZhSXhVMyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vYXV0aC91c2Vycy80NjUiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ1MTtzOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTQ3MzA0NTI4MTtzOjE6ImMiO2k6MTQ3MzA0NTI0NDtzOjE6ImwiO3M6MToiMCI7fX0=',1473045281),('9cdc4eb6cfd89b951702afeeed076d61e30f63a1',NULL,'127.0.0.1','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTU9GQXBDTGgyNWZpVWNzWm5QVmVBNFM5WDJNeTR2b1Rva2w1bHU2byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHA6Ly9hdXRoL2xvZ2luIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0NzAwNTM4MTk7czoxOiJjIjtpOjE0NzAwNTM4MTk7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1470053819),('e0761be1ce7f06822b1c4753a2b0200dd14664ab',451,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo2OntzOjY6Il90b2tlbiI7czo0MDoiSk9QSGRvaTNpT2V3dTEzQ0tkcnU1SjFvdEJxT1RXeDBPRURCeEVmUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly9jbXMucHNtLmxvY2FsL3JvbGVzIjt9czo1OiJmbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDUxO3M6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDcwMDUxODc0O3M6MToiYyI7aToxNDcwMDUwMTI0O3M6MToibCI7czoxOiIwIjt9fQ==',1470051874),('e450bf873c96e679fea15bd91912de4fcfbb4e42',NULL,'127.0.0.1','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZG10WGVKMWhPZ1ROSm5nY0JtN1JCVXdSS2Y5TUJzNnRTQUFEVE5KWiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoxNzoiaHR0cDovL2F1dGgvcm9sZXMiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cDovL2F1dGgvbG9naW4iO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNDcwMDY2MTA1O3M6MToiYyI7aToxNDcwMDY2MDk2O3M6MToibCI7czoxOiIwIjt9fQ==',1470066105),('f08b06a8d8c5248144bd289c25c615609fa8eb01',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaGh4SEhXOFRTOGxQR09vNUN2WmZaakljcXY1VDJDcXViaGRobnVkNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHA6Ly9hdXRoL3JvbGVzIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0NzMwNDY0NzY7czoxOiJjIjtpOjE0NzMwNDY0NzY7czoxOiJsIjtzOjE6IjAiO31zOjU6ImZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1473046476);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(45) DEFAULT NULL,
  `app_logo` varchar(45) DEFAULT NULL,
  `app_footer_name` varchar(145) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'LIBRARY MANAGER',NULL,'Xillion Information Systems (c) 2017 | Custom Name | For support:  7783031','0000-00-00 00:00:00',NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisors`
--

DROP TABLE IF EXISTS `supervisors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supervisors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `supervisor_name` varchar(45) DEFAULT NULL,
  `supervisor_avatar` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisors`
--

LOCK TABLES `supervisors` WRITE;
/*!40000 ALTER TABLE `supervisors` DISABLE KEYS */;
INSERT INTO `supervisors` VALUES (1,451,354,'Abdul Latheef','354.jpg',NULL,NULL),(2,452,354,'Abdul Latheef','354.jpg',NULL,NULL),(3,451,473,'Ibrahim Nasreen','473.jpg',NULL,NULL),(4,452,451,'Mohamed Anil','451.jpg',NULL,NULL);
/*!40000 ALTER TABLE `supervisors` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=MyISAM AUTO_INCREMENT=470 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (451,'Mohamed Anil','anil@xillionsolutions.com','$2y$10$lhsZrAdUniDSKxh2ee/N/usxbG6tiJ8gnHkaYj./oK6X2hCNb4krm','aAK9Z6f57U5VnDyz0kdwgoXHHAmZ2AqixVDfzhASHXqmoQvhGwZCnyPpkZKM','1469877640.jpg',NULL,'2017-02-28 02:56:16'),(467,'Test user','test@user.com','$2y$10$4z/UWbpQrt6fMEOKjYqAFe6SiIew9juowTtXMoEO6XX5ljTXWPQpi',NULL,'1486976991.jpg','2017-02-13 04:08:23','2017-02-13 04:09:51'),(468,'Hassan','hassan@is.com','$2y$10$ARHeiTr.QZB7XyesZuFG4.26ITbj05Sfd2SVqmkyPQ4lBK1gkIryu',NULL,'1486979701.jpg','2017-02-13 04:48:14','2017-02-13 04:55:01'),(469,'Ismail','ismail@ismail.com','$2y$10$efXF6eRdKYypQiBF8e/GOeIdfhe8boH9lY3vwHSf7YcTYMecvnl.K',NULL,'placeholder.png','2017-02-13 04:54:08','2017-02-13 04:54:08');
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

-- Dump completed on 2017-02-28 14:47:37
