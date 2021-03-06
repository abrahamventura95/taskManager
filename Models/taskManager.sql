-- MySQL Script generated by MySQL Workbench
-- Mon Aug 10 12:50:16 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema taskManager
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema taskManager
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `taskManager` DEFAULT CHARACTER SET utf8 ;
USE `taskManager` ;

-- -----------------------------------------------------
-- Table `taskManager`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `fullName` VARCHAR(45) NOT NULL,
  `gender` ENUM('male', 'female', 'other') NOT NULL DEFAULT 'male',
  `dateOfBirth` DATE NOT NULL,
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `taskManager`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  `priority` ENUM('5', '4', '3', '2', '1') NOT NULL DEFAULT '3',
  `status` BIT NOT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_task`
    FOREIGN KEY (`id_user`)
    REFERENCES `taskManager`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`subTask`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`subTask` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_task` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  `status` BIT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `subtask_task`
    FOREIGN KEY (`id_task`)
    REFERENCES `taskManager`.`task` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  `place` VARCHAR(45) NULL,
  `topic` VARCHAR(45) NULL,
  `status` BIT NOT NULL DEFAULT 0,
  `time` DATETIME NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_appointment`
    FOREIGN KEY (`id_user`)
    REFERENCES `taskManager`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`habit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`habit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `tag` VARCHAR(45) NULL,
  `status` BIT NULL DEFAULT 1,
  `alarm` BIT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_habit`
    FOREIGN KEY (`id_user`)
    REFERENCES `taskManager`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`habitDay`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`habitDay` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_habit` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  `frequency` INT NULL,
  `day` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'everyday') NOT NULL DEFAULT 'everyday',
  `time` TIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `habitDay_habit`
    FOREIGN KEY (`id_habit`)
    REFERENCES `taskManager`.`habit` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`completedTask`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`completedTask` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_task` INT NULL,
  `id_user` INT NULL,
  `tag` VARCHAR(45) NULL,
  `priority` VARCHAR(45) NULL,
  `begin_time` DATETIME NULL,
  `end_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `task_completed`
    FOREIGN KEY (`id_task`)
    REFERENCES `taskManager`.`task` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `taskManager`.`completedAppointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `taskManager`.`completedAppointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_appointment` INT NULL,
  `id_user` INT NULL,
  `tag` VARCHAR(45) NULL,
  `place` VARCHAR(45) NULL,
  `topic` VARCHAR(45) NULL,
  `time` DATETIME NULL,
  `begin_at` DATETIME NULL,
  `end_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `completed_appointment`
    FOREIGN KEY (`id_appointment`)
    REFERENCES `taskManager`.`appointment` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;

USE `taskManager`;

DELIMITER $$
USE `taskManager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `taskManager`.`task_BEFORE_UPDATE` BEFORE UPDATE ON `task` FOR EACH ROW
BEGIN
	 IF new.status = 1 THEN
		INSERT INTO completedtask(id_task,id_user,tag,priority,begin_time) values (old.id, old.id_user, old.tag, old.priority, old.created_at);
     END IF;
END$$

USE `taskManager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `taskManager`.`appointment_BEFORE_UPDATE` BEFORE UPDATE ON `appointment` FOR EACH ROW
BEGIN
	IF new.status = 1 THEN
		INSERT INTO completedappointment(id_appointment,id_user,tag,place,topic,time,begin_at) VALUES (old.id,old.id_user,old.tag,old.place,old.topic,old.time,old.created_at);
    END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;