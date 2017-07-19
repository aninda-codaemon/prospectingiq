CREATE TABLE `chrome_linkedin_user` ( `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT , `api_key` VARCHAR(200) NOT NULL COMMENT 'User API Key' , `api_key_credits` INT(5) NOT NULL COMMENT 'User Credits' , `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), INDEX (`api_key_credits`), UNIQUE (`api_key`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;
CREATE TABLE `chrome_linkedin_data` ( `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT , `api_key_id` INT(5) UNSIGNED NOT NULL COMMENT 'Api Key ID From User Table' , `linkedin_url` VARCHAR(300) NOT NULL COMMENT 'Linked URL' , `response_dump` TEXT NOT NULL COMMENT 'Response Dump JSON' , `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() , PRIMARY KEY (`id`), INDEX (`api_key_id`), INDEX (`linkedin_url`)) ENGINE = InnoDB;