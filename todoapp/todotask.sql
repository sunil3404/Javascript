\c todoapp;

drop table if exists dev.todotasktest;
drop table if exists dev.todostatus;
drop table if exists dev.todotask;


create table dev.todotask (
	ID SERIAL primary key not null,
	task char(20) not null,
	status char(20) not null default 'Created',
	created_date date not null default current_date,
	updated_date date default null
);

create table dev.todostatus (
	ID int primary key not null,
	status char(40) not null
);

create table dev.todotasktest(
	ID SERIAL primary key not null,
	task char(30) not null,
	status_id INT not null,
	created_date date not null default current_date,
	updated_date date default null,

	CONSTRAINT fk_todostatus
      FOREIGN KEY(status_id) 
	  REFERENCES dev.todostatus(id)
);

-- Update todotask table
-- insert into dev.todotask (task) values('test task1');

-- Update todostatus Table
insert into dev.todostatus (id, status) values(1, 'Created');
insert into dev.todostatus (id, status) values(2, 'In Progress');
insert into dev.todostatus (id, status) values(3, 'Completed');

-- Update todotasktest
insert into dev.todotasktest(task, status_id) values('Test Task 2', 1);






