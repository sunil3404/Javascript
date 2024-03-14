\c todoapp;

drop table if exists dev.todotask;
drop table if exists dev.todotasktest;
drop table if exists dev.todostatus;
drop table if exists dev.user;


-- create table dev.todotask (
-- 	ID SERIAL primary key not null,
-- 	task char(255) not null,
-- 	status char(20) not null default 'Created',
-- 	created_date date not null default current_date,
-- 	updated_date date default null
-- );

create table dev.user(
	ID SERIAL primary key not null,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	username varchar(50) unique not null,
	hashpassword varchar(255) not null,
	email char(100) unique not null
);

create table dev.todostatus (
	ID int primary key not null,
	status varchar(40) not null
);

create table dev.todotask(
	ID SERIAL primary key not null,
	task varchar(255) not null,
	status_id INT not null default 1,
	user_id INT not null,
	created_date date not null default current_date,
	updated_date date default null,

	CONSTRAINT fk_todostatus
      FOREIGN KEY(status_id) 
	  REFERENCES dev.todostatus(id),

	CONSTRAINT fk_user
	  FOREIGN KEY(user_id)
	  REFERENCES dev.user(id)
);

-- Update todotask table
-- insert into dev.todotask (task) values('test task1');

-- Update todostatus Table
insert into dev.todostatus (id, status) values(1, 'Created');
insert into dev.todostatus (id, status) values(2, 'In Progress');
insert into dev.todostatus (id, status) values(3, 'Completed');

-- Insert sample data into user
/*insert into dev.user (first_name, last_name, username, hashpassword, email) values('sunil', 'kumar', 'sunil@3404', 'password', 'sunil@gmail.com');*/

-- Update todotasktest
-- insert into dev.todotask(task, status_id, user_id) values('Test Task 2', 1, 1);






