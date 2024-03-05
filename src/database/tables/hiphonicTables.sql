USE HIPHONICDB

CREATE TABLE tbl_user (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    TagName VARCHAR(50),
    Location VARCHAR(100),
    company_name VARCHAR(100) DEFAULT 'Binford Ltd',
    website_link VARCHAR(500) DEFAULT 'https://dribbble.com/',
    profileImage VARCHAR(500) DEFAULT 'https://www.vecteezy.com/vector-art/2002403-man-with-beard-avatar-character-isolated-icon',
    welcomed BIT Default 0,
    isDeleted BIT DEFAULT 0,
    isSend BIT DEFAULT 0,
    isFriend Bit DEFAULT 0,
    isGroupMember Bit DEFAULT 0,
    registeredDate DATETIME,
);



SELECT * FROM tbl_user

-- DROP TABLE tbl_user
-- Create post Table
CREATE TABLE post (
post_id  VARCHAR(255) PRIMARY KEY,
UserID  VARCHAR(255),
content VARCHAR(999) DEFAULT 'no content',
post_date DATETIME,
likes INT DEFAULT 1,
comments INT DEFAULT 1,
FOREIGN KEY (UserID)
REFERENCES tbl_user (UserID)
);

-- Create comment Table

CREATE TABLE Comment (
    CommentID VARCHAR(255) PRIMARY KEY,
    PostID VARCHAR(255),
    UserID VARCHAR(255),
    CommentDate DATETIME DEFAULT GETDATE(),
    Content VARCHAR(999)
    FOREIGN KEY (UserID) REFERENCES tbl_user (UserID),
    FOREIGN KEY (PostID) REFERENCES post(Post_id)
);

--////////////////////////////////////////////////////////////////////
-- Create Like Table
CREATE TABLE tbl_like (
    LikeID VARCHAR(255) PRIMARY KEY,
    CommentID VARCHAR(255),
    post_id VARCHAR(255),
    UserID VARCHAR(255),
    like_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (post_id) REFERENCES Post(post_id),
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (CommentID) REFERENCES Comment (CommentID)
);

-- Create post Table [Drop and change your table to this one] added photo url and video url
--///////////////////////////////////////////////////////////////////////////
CREATE TABLE post (
post_id  VARCHAR(255) PRIMARY KEY,
UserID  VARCHAR(255),
content VARCHAR(999) DEFAULT 'no content',
imageUrl VARCHAR(999),
videoUrl VARCHAR(999),
post_date DATETIME DEFAULT GETDATE(),
FOREIGN KEY (UserID) REFERENCES tbl_user (UserID),
);



-- Create Friendship Table
CREATE TABLE Friendship (
    FriendshipID VARCHAR(255) PRIMARY KEY,
    User1ID VARCHAR(255),
    User2ID VARCHAR(255),
    FriendshipDate DATETIME,
    isFriend BIT DEFAULT 0,
    FOREIGN KEY (User1ID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (User2ID) REFERENCES tbl_user(UserID)
);

DROP TABLE Friendship



-- Create Photo Table
CREATE TABLE Photo (
    PhotoID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    PhotoURL VARCHAR(999),
    UploadDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

SELECT * FROM Photo

DROP TABLE Photo

CREATE  TABLE PhotoComments(
    CommentID VARCHAR(255),
    PhotoID VARCHAR(255),
    UserID VARCHAR(255),
   
    Content VARCHAR(999)

);

select * from PhotoComments
-- Create Group Table
CREATE TABLE tbl_group (
    GroupID VARCHAR(255) PRIMARY KEY,
    GroupName VARCHAR(255),
    Description TEXT,
    CreatedDate DATETIME
);

DROP TABLE tbl_group

-- Create GroupMembers Table
CREATE TABLE GroupMembers (
    GroupID VARCHAR(255),
    MemberID VARCHAR(255),
    PRIMARY KEY (GroupID, MemberID),
    FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID),
    FOREIGN KEY (MemberID) REFERENCES tbl_user(UserID)
);

DROP TABLE GroupMembers


-- Create Event Table
CREATE TABLE Event (
    EventID VARCHAR(255) PRIMARY KEY,
    EventName VARCHAR(255),
    Description TEXT,
    EventDate VARCHAR(100),
    Location VARCHAR(100),
    EventPosterURL VARCHAR(999)
);

SELECT * FROM  Events

DROP TABLE Event


-- Create EventAttendee Table
CREATE TABLE EventAttendee (
    EventID VARCHAR(255),
    AttendeeID VARCHAR(255),
    PRIMARY KEY (EventID, AttendeeID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (AttendeeID) REFERENCES tbl_user(UserID)
);


DROP TABLE EventAttendee

CREATE TABLE post (
post_id  VARCHAR(255) PRIMARY KEY,
UserID  VARCHAR(255),
content VARCHAR(999) DEFAULT 'no content',
imageUrl VARCHAR(999),
videoUrl VARCHAR(999),
post_date DATETIME DEFAULT GETDATE(),
FOREIGN KEY (UserID) REFERENCES tbl_user (UserID),
);

-- Create Message Table
CREATE TABLE Message (
    MessageID VARCHAR(255) PRIMARY KEY,
    SenderID VARCHAR(255),
    ReceiverID VARCHAR(255),
    MessageDate DATETIME,
    Content TEXT,
    FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES tbl_user(UserID)
);


CREATE TABLE Notifications (
  NotificationID INT IDENTITY(1,1) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES tbl_user(UserID),
  message VARCHAR(255),
  is_read BIT DEFAULT 0,
  created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Status (
  StatusID VARCHAR(255) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES tbl_user(UserID),
  StatusText VARCHAR(255),
  ImagePath VARCHAR(255),
  CreatedAt DATETIME DEFAULT GETDATE()
);

-- //////////////////////////////////////////////////////////////////////
-- Create Post Table
CREATE TABLE post (
post_id  VARCHAR(255) PRIMARY KEY,
UserID  VARCHAR(255),
content VARCHAR(999) DEFAULT 'no content',
imageUrl VARCHAR(999),
videoUrl VARCHAR(400),
post_date DATETIME DEFAULT GETDATE(),
FOREIGN KEY (UserID) REFERENCES tbl_user (UserID),
);

-- Create Video Table
CREATE TABLE Video (
    videoID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255),
    videoURL VARCHAR(999),
    videoCaption VARCHAR(999) DEFAULT 'no content',
    UploadDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
);

drop table Video;

-- Create table video category
CREATE TABLE videoCategory (
    categoryID VARCHAR(255) PRIMARY KEY,
    categoryName VARCHAR(255),
	previewURL VARCHAR(999),
    createDate DATETIME DEFAULT GETDATE(),
)

-- Create table category videos
CREATE TABLE CategoryVideos (
    categoryVideosID VARCHAR (255) PRIMARY KEY,
    categoryID VARCHAR (255),
    categoryVideoURL VARCHAR(255),
    FOREIGN KEY (categoryID) REFERENCES videoCategory (categoryID)
);

-- //////////////////////////////////////////////////////////////////////

DROP TABLE Message


-- Trigger for creating notifications after a friendship is inserted
GO

CREATE TRIGGER trgAfterInsertFriendship
ON Friendship
AFTER INSERT
AS
BEGIN
  DECLARE @User1ID VARCHAR(255), @User2ID VARCHAR(255);

  SELECT @User1ID = User1ID, @User2ID = User2ID
  FROM inserted;

  INSERT INTO Notifications (UserID, message)
  VALUES (@User1ID, 'You are now friends with ' + CAST(@User2ID AS NVARCHAR(10)));

  INSERT INTO Notifications (UserID, message)
  VALUES (@User2ID, 'You are now friends with ' + CAST(@User1ID AS NVARCHAR(10)));
END;




-- Dummy data for Post table
INSERT INTO Post (PostID, UserID, Content, PostDate)
VALUES 
    (1, 1, 'Post content 1', GETDATE()),
    (2, 2, 'Post content 2', GETDATE()),
    (3, 3, 'Post content 3', GETDATE());

-- Dummy data for Comment table
INSERT INTO Comment (CommentID, PostID, UserID, CommentDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Comment on post 1 by user 2'),
    (2, 2, 3, GETDATE(), 'Comment on post 2 by user 3'),
    (3, 3, 1, GETDATE(), 'Comment on post 3 by user 1');

INSERT INTO tbl_like (LikeID, PostID, UserID)
VALUES 
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 1);
-- Dummy data for Friendship table
INSERT INTO Friendship (FriendshipID, User1ID, User2ID, FriendshipDate)
VALUES 
    (1, 1, 2, GETDATE()),
    (2, 1, 3, GETDATE());

-- Dummy data for Photo table
INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate)
VALUES 
    (1, 1, 'url1', GETDATE()),
    (2, 2, 'url2', GETDATE()),
    (3, 3, 'url3', GETDATE());

-- Dummy data for Group table
INSERT INTO tbl_Group (GroupID, GroupName, Description, CreatedDate)
VALUES 
    (1, 'Group 1', 'Description for Group 1', GETDATE()),
    (2, 'Group 2', 'Description for Group 2', GETDATE());

-- Dummy data for GroupMembers tabl
INSERT INTO GroupMembers (GroupID, MemberID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);

-- Dummy data for Event table
INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL)
VALUES 
    (1, 'Event 1', 'Description for Event 1', GETDATE(), 'Location 1', 'poster_url_1'),
    (2, 'Event 2', 'Description for Event 2', GETDATE(), 'Location 2', 'poster_url_2'),
    (3, 'Event 3',  'Description for Event 3', GETDATE(), 'Location 3', 'poster_url_3'),
    (4, 'Event 4', 'Description for Event 24', GETDATE(), 'Location 4', 'poster_url_4');

-- Dummy data for EventAttendee table
INSERT INTO EventAttendee (EventID, AttendeeID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);

-- Dummy data for Message table
INSERT INTO Message (MessageID, SenderID, ReceiverID, MessageDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Message from user 1 to user 2'),
    (2, 2, 1, GETDATE(), 'Reply from user 2 to user 1'),
    (3, 3, 1, GETDATE(), 'Message from user 3 to user 1')