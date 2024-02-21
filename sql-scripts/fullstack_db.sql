USE fullstack_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `faults` (
  `id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `fault_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `fault_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `matches` (
  `id` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `team_id` int(11) NOT NULL,
  `opponent` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `matches` (`id`, `date`, `team_id`, `opponent`, `location`) VALUES
(1, '2022-03-14 15:09:26', 4, 'PESD', 'Gymnase Alice MILLIAT'),
(5, '2022-03-14 15:09:26', 4, 'PESD', 'Gymnase Alice MILLIAT');

CREATE TABLE `points` (
  `id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `point_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `point_type` (
  `id` int(11) NOT NULL,
  `point_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `winner` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` int(11) NOT NULL,
  `invitation_code` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teams` (`id`, `name`, `description`, `owner_id`, `invitation_code`) VALUES
(4, 'Team 1', 'Team1 de Volleyball', 2, 'VR6YA4QU33');

CREATE TABLE `teams_users` (
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `teams_users` (`user_id`, `team_id`) VALUES
(3, 4),
(4, 4);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `mail`, `role_id`) VALUES
(1, 'Antoine', 'Guerin', '$2b$10$XBZwNgezncURTtumhDyB4enNVxRg.Kg.B.6B4c0kEQM3dxGj9kH.2', 'antoineg3802@gmail.com', 1),
(2, 'ta', 'ta', '$2b$10$isxlRBpoAXyxL1QAZfqmL.l.CHyZcQVf4Qg63mJS5YIATOpqPLFaG', 'tata@gmail.com', 3),
(3, 'tu', 'tu', '$2b$10$22P5ZnzeQjoStE2ZxrRv4eYkqRZzptRmnB6iwHjc5uidxanlVCC3m', 'tutu@gmail.com', 2),
(4, 'to', 'to', '$2b$10$K78DLf8NgGCYSCBWFwW9ROfbOiXozEgd64YA9WKFi/dJiUR5I9M4u', 'toto@gmail.com', 2);

CREATE TABLE `users_matches` (
  `user_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `faults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `set_id` (`set_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `fk_fault_type` (`fault_type_id`);

ALTER TABLE `fault_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`) USING BTREE,
  ADD KEY `team_id` (`team_id`);

ALTER TABLE `points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `set_id` (`set_id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `fk_point_type` (`point_type_id`);

ALTER TABLE `point_type`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `match_id` (`match_id`);

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

ALTER TABLE `fault_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `matches`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `point_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `sets`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `faults`
  ADD CONSTRAINT `faults_ibfk_1` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`),
  ADD CONSTRAINT `faults_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_fault_type` FOREIGN KEY (`fault_type_id`) REFERENCES `fault_type` (`id`);

ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);

ALTER TABLE `points`
  ADD CONSTRAINT `fk_point_type` FOREIGN KEY (`point_type_id`) REFERENCES `point_type` (`id`),
  ADD CONSTRAINT `points_ibfk_1` FOREIGN KEY (`set_id`) REFERENCES `sets` (`id`),
  ADD CONSTRAINT `points_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`);

ALTER TABLE `sets`
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
