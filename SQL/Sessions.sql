create table [Sessions] (
	Id int not null primary key identity,
	UserId int not null foreign key references Users(Id),
	Token uniqueidentifier not null constraint SessionsTokenUniqueConstraint unique,
	Expiry datetime2 not null,
	AccessToken uniqueidentifier not null constraint SessionsAccessTokenUniqueConstraint unique,
	AccessExpiry datetime2 not null,
	IsExpired bit not null,
	DateAdded datetime2 not null constraint SessionsDateAddedDefaultConstraint default(getutcdate()),
	LastModified timestamp not null
)
go
create procedure AddSession
	@userId int,
	@token uniqueidentifier,
	@expiry datetime2,
	@accessToken uniqueidentifier,
	@accessExpiry datetime2
as
begin
	set nocount on;
	insert into [Sessions] (UserId, Token, Expiry, AccessToken, AccessExpiry) values (@userId,@token,@expiry,@accessToken,@accessExpiry)

	select cast(SCOPE_IDENTITY() as int) as Id
end
go
create procedure GetSessionById
	@id int
as
begin
	set nocount on;
	select 
		Id,
		UserId,
		Token,
		Expiry,
		AccessToken,
		AccessExpiry,
		DateAdded,
		LastModified
	from [Sessions] where Id=@id
end
go
create procedure GetSessionByUserId
	@userId int
as 
begin
	set nocount on;
	select 
		Id,
		UserId,
		Token,
		Expiry,
		AccessToken,
		AccessExpiry,
		DateAdded,
		LastModified
	from [Sessions] where UserId=@userId
end
go
create procedure GetSessionByToken
	@token uniqueidentifier
as
begin
	set nocount on;
	select 
		Id,
		UserId,
		Token,
		Expiry,
		AccessToken,
		AccessExpiry,
		DateAdded,
		LastModified
	from [Sessions] where Token=@token
end
go
create procedure GetSessionByAccessToken
	@accessToken uniqueidentifier
as
begin 
	set nocount on;
	select 
		Id,
		UserId,
		Token,
		Expiry,
		AccessToken,
		AccessExpiry,
		DateAdded,
		LastModified
	from [Sessions] where AccessToken=@accessToken
end
go
create procedure UpdateSession
	@id int,
	@token uniqueidentifier,
	@expiry datetime2,
	@accessToken uniqueidentifier,
	@accessExpiry datetime2,
	@lastModified binary(8)
as
begin
	set nocount off;
	update Sessions SET
		Token=@token,
		Expiry=@expiry,
		AccessToken	= @accessToken,
		AccessExpiry=@accessExpiry
	where Id=@id and LastModified=@lastModified
end

/* ROLLBACK

drop procedure AddSession
drop procedure GetSessionById
drop procedure GetSessionByUserId
drop procedure GetSessionByToken
drop procedure GetSessionByAccessToken
drop procedure UpdateSession
drop table Sessions

*/
