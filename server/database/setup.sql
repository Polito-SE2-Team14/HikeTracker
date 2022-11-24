DROP TABLE IF EXISTS HUT;
DROP TABLE IF EXISTS PARKINGLOT;
DROP TABLE IF EXISTS HIKEREFERENCEPOINT;
DROP TABLE IF EXISTS POINT;
DROP TABLE IF EXISTS HIKE;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS HIKEGROUP;
DROP TABLE IF EXISTS HIKEGROUPMEMBER;
DROP TABLE IF EXISTS HUTWORKER;
CREATE TABLE USER (
    userID INTEGER PRIMARY KEY,
    name TEXT,
    surname TEXT,
    email TEXT,
    phoneNumber TEXT,
    type TEXT,
    salt TEXT,
    hashedPassword TEXT,
    verified INTEGER,
    token TEXT
);
CREATE TABLE POINT(
    pointID INTEGER PRIMARY KEY,
    name TEXT,
    latitude REAL,
    longitude REAL,
    address TEXT,
    pointType TEXT NOT NULL
);
CREATE TABLE HUT (
    hutID INTEGER PRIMARY KEY,
    bedspace INTEGER,
    hutOwnerID INTEGER
);
CREATE TABLE PARKINGLOT (
    parkinglotID INTEGER PRIMARY KEY,
    carspace INTEGER
);
CREATE TABLE HIKEREFERENCEPOINT (
    hikeID INTEGER NOT NULL,
    referencePointId INTEGER NOT NULL,
    PRIMARY KEY (hikeID, referencePointId)
);
CREATE TABLE HIKE (
    hikeID INTEGER PRIMARY KEY,
    title TEXT,
    length INTEGER,
    expectedTime INTEGER,
    ascent INTEGER,
    difficulty TEXT,
    startPointID INTEGER,
    endPointID INTEGER,
    description TEXT
);
CREATE TABLE HIKEGROUP(
    groupID INTEGER NOT NULL,
    hikeID INTEGER NOT NULL,
    leaderID INTEGER NOT NULL,
    PRIMARY KEY (groupID, hikeID)
);
CREATE TABLE HIKEGROUPMEMBER(
    groupID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    confirmed INTEGER NOT NULL,
    completed INTEGER NOT NULL, 
    PRIMARY KEY (groupID, userID)
);
CREATE TABLE HUTWORKER(
    userID INTEGER PRIMARY KEY,
    hutID INTEGER NOT NULL,
    confirmed INTEGER NOT NULL
);
INSERT INTO USER (userID, name, surname, email, phoneNumber, type, salt, hashedPassword)
VALUES (1, "mario", "rossi", "mario.rossi@email.com", "12345678901", "hiker", "e2c8b3c929cbd232d2b0a4ec86541f2b", "3737b273a3ce89d39a0defe68af81f41"),
    (2, "antonio", "bianchi", "antonio.bianchi@email.com", "234567890", "localGuide", "4d0674a27d4b512b7d1a5e576b7bd22e", "9beb9b87d0ada1dc9a0294f6cda52de2"),
    (3, "cristian", "verdi", "cristian.verdi@email.com", "3456789012", "hutWorker", "c916da4ef3a473d862a7b10c65f10ec0", "214e83c9288a28eeae8ef4c5d90bcbbc");
INSERT INTO POINT(pointID, name, latitude, longitude, address, pointType) 
    VALUES (1, "hut#1", "123", "456", "address1", "hut"),
    (2, "park#1", "123", "456", "address2", "parkinglot"),
    (3, "hut#2", "123", "456", "address3", "hut"),
    (4, "park#2", "123", "456", "address4", "parkinglot"),
    (5, "generic#1", "123", "456", "address5", "generic");
INSERT INTO HUT (hutID, bedspace, hutOwnerID) 
VALUES (1, 10, 3),
    (3, 15, 3);
INSERT INTO PARKINGLOT (parkinglotID, carspace)
VALUES (2, 100),
    (4, 300);
INSERT INTO HIKEREFERENCEPOINT (hikeID, referencePointId)
VALUES(1, 1),
    (1, 2),
    (2, 2),
    (2, 4);
INSERT INTO HIKE (hikeID, title, length, expectedTime, ascent, difficulty, startPointID, endPointID, description    )
VALUES (1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription"),
    (2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription"),
    (3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription");
INSERT INTO HIKEGROUP(hikeID, groupID, leaderID)
VALUES (1,1,1),
    (1,2,2);
INSERT INTO HIKEGROUPMEMBER (groupID, userID, confirmed, completed)
VALUES (1,1,1,1),
    (2,1,0,0),
    (2,2,1,0);
INSERT INTO HUTWORKER (userID, hutID, confirmed)
VALUES (3,1,0);