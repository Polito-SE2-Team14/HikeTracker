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
    hashedPassword TEXT
);
CREATE TABLE POINT(
    pointID INTEGER PRIMARY KEY,
    name TEXT,
    latitude TEXT,
    longitude TEXT,
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
    lenght INTEGER,
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
VALUES (1, "mario", "rossi", "mario.rossi@email.com", "12345678901", "hiker", "312311", "awfwafwqafa"),
    (2, "antonio", "bianchi", "antonio.bianchi@email.com", "234567890", "localGuide", "45124124", "fwafawfa"),
    (3, "cristian", "verdi", "cristian.verdi@email.com", "3456789012", "hutWorkers", "51512451", "ajdhapduwhpad");
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
INSERT INTO HIKE (hikeID, title, lenght, expectedTime, ascent, difficulty, startPointID, endPointID, description    )
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