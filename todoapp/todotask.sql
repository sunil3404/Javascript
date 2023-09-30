\c todoapp;

drop table if exists dev.todotask;
create table dev.todotask (
	ID SERIAL primary key not null,
	task char(20) not null,
	status char(10) not null default 'Created',
	created_date date not null default current_date,
	updated_date date default null

);

insert into dev.todotask (task) values('test task1');


