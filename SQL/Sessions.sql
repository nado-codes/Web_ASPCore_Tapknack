create table [Sessions] (
	Id int not null primary key identity,
	UserId int not null foreign key references Users(Id) constraint SessionsUserIdUniqueConstraint unique, 
	Token uniqueidentifier not null constraint SessionsTokenUniqueConstraint unique,
	Expiry datetime2 not null,
	DateAdded datetime2 not null constraint SessionsDateAddedDefaultConstraint default(getutcdate()),
	LastModified timestamp not null
)
go
create procedure AddSession
	@userId int,
	@token uniqueidentifier,
	@expiry datetime2
as
begin
	set nocount on;
	insert into [Sessions] (UserId, Token, Expiry) values (@userId,@token,@expiry)

	select cast(SCOPE_IDENTITY() as int) as Id
end
go
create procedure GetSessionById
	@id int
as
	select 
		Id,
		UserId,
		Token,
		Expiry,
		DateAdded,
		LastModified
	from [Sessions] where Id=@id
go
create procedure GetSessionByUserId
	@userId int
as 
	select 
		Id,
		UserId,
		Token,
		Expiry,
		DateAdded,
		LastModified
	from [Sessions] where UserId=@userId

/* ROLLBACK

drop procedure AddSession
drop procedure GetSessionById
drop procedure GetSessionByUserId
drop table Sessions

*/
