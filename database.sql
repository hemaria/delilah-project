CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `login` varchar(45) NOT NULL,
  `email` varchar(80) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cellphone` varchar(45) DEFAULT NULL,
  `doctype` varchar(2) DEFAULT NULL,
  `docnum` varchar(45) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `register` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);
