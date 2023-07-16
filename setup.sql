CREATE TABLE IF NOT EXISTS Users (
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Files (
  FileID int NOT NULL AUTO_INCREMENT,
  fileName varchar(255) NOT NULL,
  fileDescription text NOT NULL,
  filePrice float NOT NULL,
  filePictureRoute varchar(255) NOT NULL,
  fileRoute varchar(255) NOT NULL,
  ownerEmail varchar(255) NOT NULL,
  PRIMARY KEY (FileID),
  FOREIGN KEY (ownerEmail) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS UserPrivileges (
  PrivilegeID int NOT NULL AUTO_INCREMENT,
  buyerEmail varchar(255) NOT NULL,
  FileID int NOT NULL,
  expiryDate Date NOT NULL,
  PRIMARY KEY (PrivilegeID),
  FOREIGN KEY (buyerEmail) REFERENCES Users(email),
  FOREIGN KEY (FileID) REFERENCES Files(FileID)
);