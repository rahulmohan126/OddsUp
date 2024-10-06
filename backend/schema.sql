
create extension if not exists "uuid-ossp";

drop table if exists oddsupuser cascade;
create table
  oddsupuser (
    id uuid default uuid_generate_v4 () primary key,
    username text unique not null
  );

drop table if exists usergroup cascade;
create table
  usergroup (
    id uuid default uuid_generate_v4 () primary key,
    name text not null,
    joinCode text not null,
    ended boolean default false
  );

drop table if exists member cascade;
create table
  member (
    userId uuid not null,
    groupId uuid not null,
    points int default 0,
    primary key (userId, groupId),
    foreign key (userId) references oddsupuser (id) on delete cascade,
    foreign key (groupId) references usergroup (id) on delete cascade
  );

drop table if exists oddsoption cascade;
create table
  oddsoption (
    id uuid default uuid_generate_v4 () primary key,
    challengeId uuid not null,
    name text not null,
    payout int not null default 0
  );

drop table if exists challenge cascade;
create table
  challenge (
    id uuid default uuid_generate_v4 () primary key,
    groupid uuid not null,
    name text not null,
    completed boolean default false,
    winner uuid null,
    foreign key (winner) references oddsoption (id) on delete set null,
    foreign key (groupId) references usergroup (id) on delete cascade
  );

alter table oddsoption
  add constraint fk_option_challenge
      foreign key (challengeId)
      references challenge (id)
      on delete cascade;

drop table if exists selection cascade;
create table
  selection (
    memberId uuid not null,
    challengeId uuid not null,
    optionId uuid not null,
    primary key (memberId, challengeId),
    foreign key (memberId) references oddsupuser (id) on delete cascade,
    foreign key (challengeId) references challenge (id) on delete cascade,
    foreign key (optionId) references oddsoption (id) on delete cascade
  );
