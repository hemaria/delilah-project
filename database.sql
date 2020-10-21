DROP TABLE IF EXISTS `ordersdetail`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `users`;

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
)ENGINE=InnoDB;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reference` varchar(45) DEFAULT NULL,
  `register` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `payment` varchar(45) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_ORDER_idx` (`user_id`),
  CONSTRAINT `FK_USER_ORDER` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `short` varchar(255) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB;

CREATE TABLE `ordersdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ORDER_id` (`order_id`),
  KEY `FK_PRODUCT_id` (`product_id`),
  CONSTRAINT `FK_ORDER_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PRODUCT_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
)ENGINE=InnoDB;

-- User Admin
INSERT INTO `users` (`name`, `login`, `email`, `pwd`, `role`, `register`, `status`) VALUES ('Administrator', 'admin', 'admin@mail.com', SHA1('admdelilah'), 'admin', '2020-10-10', '1');
