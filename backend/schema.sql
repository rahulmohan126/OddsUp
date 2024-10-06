
create extension if not exists "uuid-ossp";

create or table
  OddsUpUser (
    id uuid default uuid_generate_v4 () primary key,
    username text unique not null
  );

create table
  UserGroup (
    id uuid default uuid_generate_v4 () primary key,
    name text not null,
    joinCode text not null,
    ended boolean default false
  );

create table
  Member (
    userId uuid not null,
    groupId uuid not null,
    points int default 0,
    primary key (userId, groupId),
    foreign key (userId) references OddsUpUser (id) on delete cascade,
    foreign key (groupId) references UserGroup (id) on delete cascade
  );

create table
  OddsOption (
    id uuid default uuid_generate_v4 () primary key,
    challengeId uuid not null,
    name text not null,
    payout int not null default 0
  );

create table
  Challenge (
    id uuid default uuid_generate_v4 () primary key,
    name text not null,
    completed boolean default false,
    winner uuid null,
    foreign key (winner) references OddsOption (id) on delete set null
  );

alter table OddsOption
  add constraint fk_option_challenge
      foreign key (challengeId)
      references Challenge (id)
      on delete cascade;

create table
  Selection (
    memberId uuid not null,
    challengeId uuid not null,
    optionId uuid not null,
    primary key (memberId, challengeId),
    foreign key (memberId) references OddsUpUser (id) on delete cascade,
    foreign key (challengeId) references Challenge (id) on delete cascade,
    foreign key (optionId) references OddsOption (id) on delete cascade
  );