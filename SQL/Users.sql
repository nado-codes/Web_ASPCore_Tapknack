create table Users (
	Id int not null primary key identity,
	Username nvarchar(60) not null constraint UsersUsernameUniqueConstraint unique,
	Email nvarchar(128) not null,
	[Password] nvarchar(256) not null,
	DateAdded datetime2 not null constraint UsersDateAddedDefaultConstraint default(getutcdate()),
	LastModified timestamp not null
)
go
create procedure AddUser
	@username nvarchar(128),
	@email nvarchar(256),
	@password nvarchar(256)
as
begin
	set nocount on;
	insert into Users (Username, Email, [Password]) values (@username,@email,@password)

	select cast(SCOPE_IDENTITY() as int) as Id
end
go
create procedure GetUserById
	@id int
as
	select 
		Id,
		Username,
		Email,
		DateAdded,
		LastModified
	from Users where Id=@id
go
create procedure GetUserByUsername
	@username nvarchar(256)
as
	select 
		Id,
		Username,
		[Password],
		Email,
		DateAdded,
		LastModified
	from Users where Username=@username
go
create procedure GetUserByEmail
	@email nvarchar(128)
as
	select 
		Id,
		Username,
		Email,
		DateAdded,
		LastModified
	from Users where Email=@email
go
create procedure SearchUserByUsernameEmail
	@username nvarchar(256),
	@email nvarchar(128)
as
	select 
		Id,
		Username,
		Email,
		DateAdded,
		LastModified
	from Users where Username like @username OR Email like @email
create procedure UpdateUser
	@id int,
	@username nvarchar(60),
	@email nvarchar(128),
	@password nvarchar(256),
	@lastModified binary(8)
as
begin
	set nocount on;
	update Users SET 
		Username=@username,
		Email=@email,
		[Password]=@password
	where Id=@id and LastModified=@lastModified
end
-- ROLLBACK
/*
drop procedure AddUser
drop procedure GetUserById
drop procedure GetUserByUsername
drop procedure GetUserByEmail
drop procedure SearchUserByUsernameEmail
drop procedure UpdateUser
drop table Users
*/