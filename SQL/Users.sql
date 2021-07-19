create table Users (
	Id int not null primary key identity,
	Username nvarchar(128) not null,
	Email nvarchar(256) not null,
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