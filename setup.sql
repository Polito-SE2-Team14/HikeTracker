DROP TABLE IF EXISTS HUT;
DROP TABLE IF EXISTS PARKINGLOT;
DROP TABLE IF EXISTS HIKEREFERENCEPOINT;
DROP TABLE IF EXISTS HIKE;
DROP TABLE IF EXISTS USER;
CREATE TABLE HUT (
    hutID INTEGER PRIMARY KEY,
    latitude TEXT,
    longitude TEXT
);
CREATE TABLE PARKINGLOT (
    parkinglotID INTEGER PRIMARY KEY,
    latitude TEXT,
    longitude TEXT
);
CREATE TABLE HIKEREFERENCEPOINT (
    hikeID INTEGER NOT NULL,
    referencePointId INTEGER NOT NULL,
    referencePointType TEXT,
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
INSERT INTO HUT (hutID, latitude, longitude) VALUES (1, "123", "456");
INSERT INTO HUT (hutID, latitude, longitude) VALUES (2, "789", "456");
INSERT INTO PARKINGLOT (parkinglotID, latitude, longitude)
VALUES (2, "123", "456"),
    (4, "789", "456");
INSERT INTO HIKEREFERENCEPOINT (hikeID, referencePointId, referencePointType)
VALUES(1, 1, "hut"),
    (1, 2, "parkingLot"),
    (2, 2, "hut"),
    (2, 4, "parkingLot");
INSERT INTO HIKE (hikeID, title, lenght, expectedTime, ascent, difficulty, startPointID, endPointID, description    )
VALUES (1, "hike#1", 7, 30, 100, "Tourist", 1, 4, "firstDescription"),
    (2, "hike#2", 2, 45, 123, "Hiker", 2, 5, "secondDescription"),
    (3, "hike#3", 3, 60, 514, "Professional Hiker", 3, 6, "thirdDescription");
INSERT INTO USER (userID, name, surname, email, phoneNumber, type, salt, hashedPassword)
VALUES (1, "mario", "rossi", "mario.rossi@email.com", "12345678901", "hiker", "312311", "awfwafwqafa"),
    (2, "antonio", "bianchi", "antonio.bianchi@email.com", "234567890", "localGuide", "45124124", "fwafawfa"),
    (3, "cristian", "verdi", "cristian.verdi@email.com", "3456789012", "hutWorkers", "51512451", "ajdhapduwhpad");