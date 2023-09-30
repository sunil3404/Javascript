DROP DATABASE TODOAPP;
CREATE DATABASE TODOAPP;

\c todoapp;

CREATE SCHEMA DEV;

CREATE TABLE IF NOT EXISTS DEV.TODOSTATUS (
	ID INT PRIMARY KEY NOT NULL,
	STATUS CHAR(50) NOT NULL
);

INSERT INTO DEV.TODOSTATUS VALUES(1, 'CREATED');
INSERT INTO DEV.TODOSTATUS VALUES(2, 'IN PROGRESS');
INSERT INTO DEV.TODOSTATUS VALUES(3, 'COMPLETED');
