CREATE TABLE IF NOT EXISTS Users (
  UserID int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  userhash varchar(255) NOT NULL,
  PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Files (
  FileID int NOT NULL AUTO_INCREMENT,
  filename varchar(255) NOT NULL,
  UserID int NOT NULL,
  PRIMARY KEY (FileID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS UserPrivileges (
  PrivilegeID int NOT NULL AUTO_INCREMENT,
  UserID int NOT NULL,
  FileID int NOT NULL,
  expiryDate Date NOT NULL,
  PRIMARY KEY (PrivilegeID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (FileID) REFERENCES Files(FileID)
);