CREATE DATABASE IF NOT EXISTS fullstack_db;
USE fullstack_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `faults` (
  `id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `fault_type_id` int(11) NOT NULL,
  `team_points` int(11) NOT NULL,
  `oponent_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `faults` (`id`, `set_id`, `player_id`, `fault_type_id`, `team_points`, `oponent_points`) VALUES
(130, 34, 3, 1, 16, 15),
(131, 34, 4, 2, 18, 12),
(132, 34, 3, 4, 12, 3),
(133, 34, 3, 2, 5, 5),
(134, 34, 4, 3, 17, 1),
(135, 34, 4, 3, 18, 9),
(136, 34, 4, 1, 3, 9),
(137, 34, 3, 1, 8, 6),
(138, 34, 4, 2, 13, 17),
(139, 34, NULL, 4, 21, 15),
(140, 34, NULL, 3, 19, 11),
(141, 34, NULL, 2, 13, 24),
(142, 34, NULL, 2, 18, 21),
(143, 34, NULL, 1, 24, 3),
(144, 34, NULL, 3, 12, 2),
(145, 34, NULL, 1, 18, 10),
(146, 34, NULL, 4, 9, 16),
(147, 34, NULL, 1, 1, 16),
(148, 34, NULL, 1, 25, 21),
(149, 34, NULL, 4, 25, 7),
(150, 35, 3, 1, 16, 15),
(151, 35, 4, 2, 18, 12),
(152, 35, 3, 4, 12, 3),
(153, 35, 3, 2, 5, 5),
(154, 35, 4, 3, 17, 1),
(155, 35, 4, 3, 18, 9),
(156, 35, 4, 1, 3, 9),
(157, 35, 3, 1, 8, 6),
(158, 35, 4, 2, 13, 17),
(159, 35, NULL, 4, 21, 15),
(160, 35, NULL, 3, 19, 11),
(161, 35, NULL, 2, 13, 24),
(162, 35, NULL, 2, 18, 21),
(163, 35, NULL, 1, 24, 3),
(164, 35, NULL, 3, 12, 2),
(165, 35, NULL, 1, 18, 10),
(166, 35, NULL, 4, 9, 16),
(167, 35, NULL, 1, 1, 16),
(168, 35, NULL, 1, 25, 21),
(169, 35, NULL, 4, 25, 7),
(170, 36, 3, 1, 16, 15),
(171, 36, 4, 2, 18, 12),
(172, 36, 3, 4, 12, 3),
(173, 36, 3, 2, 5, 5),
(174, 36, 4, 3, 17, 1),
(175, 36, 4, 3, 18, 9),
(176, 36, 4, 1, 3, 9),
(177, 36, 3, 1, 8, 6),
(178, 36, 4, 2, 13, 17),
(179, 36, NULL, 4, 21, 15),
(180, 36, NULL, 3, 19, 11),
(181, 36, NULL, 2, 13, 24),
(182, 36, NULL, 2, 18, 21),
(183, 36, NULL, 1, 24, 3),
(184, 36, NULL, 3, 12, 2),
(185, 36, NULL, 1, 18, 10),
(186, 36, NULL, 4, 9, 16),
(187, 36, NULL, 1, 1, 16),
(188, 36, NULL, 1, 25, 21),
(189, 36, NULL, 4, 25, 7),
(190, 37, 3, 1, 16, 15),
(191, 37, 4, 2, 18, 12),
(192, 37, 3, 4, 12, 3),
(193, 37, 3, 2, 5, 5),
(194, 37, 4, 3, 17, 1),
(195, 37, 4, 3, 18, 9),
(196, 37, 4, 1, 3, 9),
(197, 37, 3, 1, 8, 6),
(198, 37, 4, 2, 13, 17),
(199, 37, NULL, 4, 21, 15),
(200, 37, NULL, 3, 19, 11),
(201, 37, NULL, 2, 13, 24),
(202, 37, NULL, 2, 18, 21),
(203, 37, NULL, 1, 24, 3),
(204, 37, NULL, 3, 12, 2),
(205, 37, NULL, 1, 18, 10),
(206, 37, NULL, 4, 9, 16),
(207, 37, NULL, 1, 1, 16),
(208, 37, NULL, 1, 25, 21),
(209, 37, NULL, 4, 25, 7);

CREATE TABLE `fault_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `fault_type` (`id`, `name`) VALUES
(1, 'Faute de service'),
(2, 'Faute de rotation'),
(3, 'Faute de filet'),
(4, 'Pénétration'),
(5, 'Porté'),
(6, 'Collé'),
(7, 'Mordu'),
(8, 'Double contact'),
(9, 'Out'),
(10, 'Block Out');

CREATE TABLE `matches` (
  `id` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `team_id` int(11) NOT NULL,
  `opponent` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `matches` (`id`, `date`, `team_id`, `opponent`, `location`, `active`) VALUES
(3, '2024-04-04 06:01:01', 4, 'Vball', "T'occupe", 1),
(4, '2024-05-20 08:27:21', 4, 'Villefranche', 'Villefranche (Palais des sports)', 1),
(5, '2024-06-20 08:27:21', 4, 'Villefranche', 'Villefranche (Palais des sports)', 1);

CREATE TABLE `points` (
  `id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `point_type_id` int(11) NOT NULL,
  `team_points` int(11) NOT NULL,
  `oponent_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `points` (`id`, `set_id`, `player_id`, `point_type_id`, `team_points`, `oponent_points`) VALUES
(119, 34, 3, 1, 13, 9),
(120, 34, 4, 4, 5, 24),
(121, 34, 3, 1, 14, 16),
(122, 34, 4, 1, 4, 10),
(123, 34, 3, 4, 9, 8),
(124, 34, 4, 1, 7, 6),
(125, 34, 3, 3, 21, 2),
(126, 34, 3, 3, 25, 22),
(127, 34, 4, 2, 3, 18),
(128, 34, 3, 1, 2, 18),
(129, 34, 4, 4, 18, 23),
(130, 34, 4, 5, 1, 25),
(131, 34, 3, 5, 5, 21),
(132, 34, 3, 5, 24, 7),
(133, 34, NULL, 5, 6, 14),
(134, 34, NULL, 4, 4, 5),
(135, 34, NULL, 2, 10, 23),
(136, 34, NULL, 1, 21, 15),
(137, 34, NULL, 3, 10, 8),
(138, 34, NULL, 5, 8, 7),
(139, 34, NULL, 1, 16, 10),
(140, 34, NULL, 3, 21, 8),
(141, 34, NULL, 1, 5, 13),
(142, 34, NULL, 4, 1, 2),
(143, 34, NULL, 1, 10, 20),
(144, 34, NULL, 5, 17, 14),
(145, 34, NULL, 4, 3, 15),
(146, 34, NULL, 5, 20, 8),
(147, 35, 3, 1, 13, 9),
(148, 35, 4, 4, 5, 24),
(149, 35, 3, 1, 14, 16),
(150, 35, 4, 1, 4, 10),
(151, 35, 3, 4, 9, 8),
(152, 35, 4, 1, 7, 6),
(153, 35, 3, 3, 21, 2),
(154, 35, 3, 3, 25, 22),
(155, 35, 4, 2, 3, 18),
(156, 35, 3, 1, 2, 18),
(157, 35, 4, 4, 18, 23),
(158, 35, 4, 5, 1, 25),
(159, 35, 3, 5, 5, 21),
(160, 35, 3, 5, 24, 7),
(161, 35, NULL, 5, 6, 14),
(162, 35, NULL, 4, 4, 5),
(163, 35, NULL, 2, 10, 23),
(164, 35, NULL, 1, 21, 15),
(165, 35, NULL, 3, 10, 8),
(166, 35, NULL, 5, 8, 7),
(167, 35, NULL, 1, 16, 10),
(168, 35, NULL, 3, 21, 8),
(169, 35, NULL, 1, 5, 13),
(170, 35, NULL, 4, 1, 2),
(171, 35, NULL, 1, 10, 20),
(172, 35, NULL, 5, 17, 14),
(173, 35, NULL, 4, 3, 15),
(174, 35, NULL, 5, 20, 8),
(175, 36, 3, 1, 13, 9),
(176, 36, 4, 4, 5, 24),
(177, 36, 3, 1, 14, 16),
(178, 36, 4, 1, 4, 10),
(179, 36, 3, 4, 9, 8),
(180, 36, 4, 1, 7, 6),
(181, 36, 3, 3, 21, 2),
(182, 36, 3, 3, 25, 22),
(183, 36, 4, 2, 3, 18),
(184, 36, 3, 1, 2, 18),
(185, 36, 4, 4, 18, 23),
(186, 36, 4, 5, 1, 25),
(187, 36, 3, 5, 5, 21),
(188, 36, 3, 5, 24, 7),
(189, 36, NULL, 5, 6, 14),
(190, 36, NULL, 4, 4, 5),
(191, 36, NULL, 2, 10, 23),
(192, 36, NULL, 1, 21, 15),
(193, 36, NULL, 3, 10, 8),
(194, 36, NULL, 5, 8, 7),
(195, 36, NULL, 1, 16, 10),
(196, 36, NULL, 3, 21, 8),
(197, 36, NULL, 1, 5, 13),
(198, 36, NULL, 4, 1, 2),
(199, 36, NULL, 1, 10, 20),
(200, 36, NULL, 5, 17, 14),
(201, 36, NULL, 4, 3, 15),
(202, 36, NULL, 5, 20, 8),
(203, 37, 3, 1, 13, 9),
(204, 37, 4, 4, 5, 24),
(205, 37, 3, 1, 14, 16),
(206, 37, 4, 1, 4, 10),
(207, 37, 3, 4, 9, 8),
(208, 37, 4, 1, 7, 6),
(209, 37, 3, 3, 21, 2),
(210, 37, 3, 3, 25, 22),
(211, 37, 4, 2, 3, 18),
(212, 37, 3, 1, 2, 18),
(213, 37, 4, 4, 18, 23),
(214, 37, 4, 5, 1, 25),
(215, 37, 3, 5, 5, 21),
(216, 37, 3, 5, 24, 7),
(217, 37, NULL, 5, 6, 14),
(218, 37, NULL, 4, 4, 5),
(219, 37, NULL, 2, 10, 23),
(220, 37, NULL, 1, 21, 15),
(221, 37, NULL, 3, 10, 8),
(222, 37, NULL, 5, 8, 7),
(223, 37, NULL, 1, 16, 10),
(224, 37, NULL, 3, 21, 8),
(225, 37, NULL, 1, 5, 13),
(226, 37, NULL, 4, 1, 2),
(227, 37, NULL, 1, 10, 20),
(228, 37, NULL, 5, 17, 14),
(229, 37, NULL, 4, 3, 15),
(230, 37, NULL, 5, 20, 8);

CREATE TABLE `point_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `point_type` (`id`, `name`) VALUES
(1, 'Attaque'),
(2, 'Bloc'),
(3, 'Service ace'),
(4, "Faute de l'adversaire"),
(5, 'Block Out');

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `roles` (`id`, `level`) VALUES
(1, 'admin'),
(2, 'player'),
(3, 'coach');

CREATE TABLE `sets` (
  `id` int(20) NOT NULL,
  `match_id` int(11) NOT NULL,
  `number_set` int(11) NOT NULL,
  `start_set` datetime NOT NULL,
  `end_set` datetime NOT NULL,
  `team_score` int(11) NOT NULL,
  `opponent_score` int(11) NOT NULL,
  `winner` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `sets` (`id`, `match_id`, `number_set`, `start_set`, `end_set`, `team_score`, `opponent_score`, `winner`) VALUES
(34, 3, 1, '2024-02-21 14:00:00', '2024-02-21 14:45:00', 25, 23, 1),
(35, 3, 2, '2024-02-21 14:00:00', '2024-02-21 14:45:00', 25, 27, 1),
(36, 3, 3, '2024-02-21 14:00:00', '2024-02-21 14:45:00', 25, 23, 0),
(37, 3, 4, '2024-02-21 14:00:00', '2024-02-21 14:45:00', 25, 23, 1);

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` int(11) NOT NULL,
  `invitation_code` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teams` (`id`, `name`, `description`, `owner_id`, `invitation_code`, `active`) VALUES
(4, 'Team 1', 'Team1 de Volleyball', 2, 'VR6YA4QU33', 1);

CREATE TABLE `teams_users` (
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `teams_users` (`user_id`, `team_id`) VALUES
(2, 4),
(3, 4),
(4, 4);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `mail`, `role_id`, `active`) VALUES
(1, 'Antoine', 'Guerin', '$2b$10$XBZwNgezncURTtumhDyB4enNVxRg.Kg.B.6B4c0kEQM3dxGj9kH.2', 'antoineg3802@gmail.com', 1, 1),
(2, 'ta', 'ta', '$2b$10$isxlRBpoAXyxL1QAZfqmL.l.CHyZcQVf4Qg63mJS5YIATOpqPLFaG', 'tata@gmail.com', 3, 1),
(3, 'tu', 'tu', '$2b$10$22P5ZnzeQjoStE2ZxrRv4eYkqRZzptRmnB6iwHjc5uidxanlVCC3m', 'tutu@gmail.com', 2, 1),
(4, 'to', 'to', '$2b$10$K78DLf8NgGCYSCBWFwW9ROfbOiXozEgd64YA9WKFi/dJiUR5I9M4u', 'toto@gmail.com', 2, 1),
(5, 'te', 'te', '$2b$10$0E.1Y.8v24G.J6T2CzoBcuOoT.qPgrDbIQm7eDmlpB45TzVFlDyLu', 'tete@gmail.com', 2, 1);

CREATE TABLE `users_matches` (
  `user_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `faults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `fault_type_id` (`fault_type_id`),
  ADD KEY `faults_ibfk_1` (`set_id`);

ALTER TABLE `fault_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`) USING BTREE,
  ADD KEY `team_id` (`team_id`);

ALTER TABLE `points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `point_type_id` (`point_type_id`),
  ADD KEY `fk_point_set` (`set_id`);

ALTER TABLE `point_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `fk_set_match` (`match_id`);

ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

ALTER TABLE `teams_users`
  ADD PRIMARY KEY (`user_id`,`team_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

ALTER TABLE `users_matches`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `match_id` (`match_id`);

ALTER TABLE `faults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

ALTER TABLE `fault_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `matches`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

ALTER TABLE `point_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `sets`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `faults`
  ADD CONSTRAINT `faults_ibfk_1` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `faults_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_fault_set` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_fault_type` FOREIGN KEY (`fault_type_id`) REFERENCES `fault_type` (`id`) ON UPDATE CASCADE;

ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);

ALTER TABLE `points`
  ADD CONSTRAINT `fk_point_set` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `points_ibfk_1` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`),
  ADD CONSTRAINT `points_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `points_ibfk_3` FOREIGN KEY (`point_type_id`) REFERENCES `point_type` (`id`) ON UPDATE CASCADE;

ALTER TABLE `sets`
  ADD CONSTRAINT `fk_set_match` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sets_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`);

ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `teams_users`
  ADD CONSTRAINT `teams_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teams_users_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `users_matches`
  ADD CONSTRAINT `users_matches_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_matches_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`);
COMMIT;
