drop database if exists jiraapp;
create database jiraapp;


\c jiraapp;
create schema dev;

drop table if exists dev.jiraissue;
drop table if exists dev.jirastatus;
drop table if exists dev.employees;
drop table if exists dev.jiraprojects;
drop table if exists dev.jiratypes;



-- Status Tables.
create table if not exists dev.jirastatus (
	ID INT primary key not null,
	status varchar(50) not null unique
);

Insert into dev.jirastatus (id, status) values(1, 'new');
Insert into dev.jirastatus (id, status) values(2, 'ready');
Insert into dev.jirastatus (id, status) values(3, 'in progress');
Insert into dev.jirastatus (id, status) values(4, 'in review');
Insert into dev.jirastatus (id, status) values(5, 'complete');
Insert into dev.jirastatus (id, status) values(6, 'done');
Insert into dev.jirastatus (id, status) values(7, 'duplicate');
Insert into dev.jirastatus (id, status) values(8, 'wont do');


-- Table for Project names 
create table if not exists dev.jiraprojects (

	ID INT primary key not null,
	project varchar(50) not null unique
);

Insert into dev.jiraprojects(id, project) values(1, 'datascience');
Insert into dev.jiraprojects(id, project) values(2, 'data-ops');
Insert into dev.jiraprojects(id, project) values(3, 'myvoyage');
Insert into dev.jiraprojects(id, project) values(4, 'voya Test');

-- Table for jiratypes

create table if not exists dev.jiratypes (

	ID INT primary key not null,
	jiratype varchar(50) not null unique

);

INSERT into dev.jiratypes (id, jiratype) values(1, 'bug');
INSERT into dev.jiratypes (id, jiratype) values(2, 'enhancement');
INSERT into dev.jiratypes (id, jiratype) values(3, 'story');
INSERT into dev.jiratypes (id, jiratype) values(4, 'task');
INSERT into dev.jiratypes (id, jiratype) values(5, 'spike');


-- Table for employees
create table if not exists dev.employees(
	ID serial primary key,
	username varchar(100) not null unique,
	password varchar(250) not null,
	join_date DATE Default current_date,
	last_login date Default current_date,
	project_id INT not null,

	CONSTRAINT fk_projects
      FOREIGN KEY(project_id) 
	  REFERENCES dev.jiraprojects(id)

);

insert into dev.employees(username, password, project_id) values('sunil', 'password', 1);

-- Table create jiraissue

create table if not exists dev.jiraissue (
	id serial primary key not null,
	story_points INT default 1,
	create_date date default current_date,
	update_date date default null,
	summary varchar(20) not null,
	description varchar(255),
	
	reported_by INT default null,
	assigned_to INT default null,

	jiratype_id INT not null,
	jirastatus_id INT not null,
	jiraproject_id INT not null,

	CONSTRAINT fk_employees_report
	  FOREIGN KEY(reported_by)
	  REFERENCES dev.employees(id),

	CONSTRAINT fk_employees_assigned
	  FOREIGN KEY(assigned_to)
	  REFERENCES dev.employees(id),

	CONSTRAINT fk_jiraproject
	  FOREIGN KEY(jiraproject_id)
	  REFERENCES dev.jiraprojects(id),

	CONSTRAINT fk_jiratypes
	  FOREIGN KEY(jiratype_id)
	  REFERENCES dev.jiratypes(id),

	CONSTRAINT fk_jirastatus
	  FOREIGN KEY(jirastatus_id)
	  REFERENCES dev.jirastatus(id)
);


-- insert into dev.jiraissue (summary, description, reported_by, assigned_to, jiratype_id, jirastatus_id, jiraproject_id)
-- values('Test Summary', 'Test Description', 1, 1 , 1, 1 , 1);
