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
	municipality TEXT,
	province TEXT,
	pointType TEXT NOT NULL,
	creatorID INTEGER
);
CREATE TABLE HUT (
	hutID INTEGER PRIMARY KEY,
	bedspace INTEGER
);
CREATE TABLE PARKINGLOT (
	parkingLotId INTEGER PRIMARY KEY,
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
	description TEXT,
	municipality TEXT,
	province TEXT,
	creatorID INTEGER
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

INSERT INTO USER (userID, name, surname, email, phoneNumber, type, salt, hashedPassword, verified, token)
		VALUES
		(1,		"Mario",	"Rossi",	"mario.rossi@email.com",	"12345678901",	"hiker",		"e2c8b3c929cbd232d2b0a4ec86541f2b", "3737b273a3ce89d39a0defe68af81f41", 0, "096f319906eeb497308b"),
		(2,		"Antonio",	"Bianchi",	"antonio.bianchi@email.com","234567890",	"localGuide",	"4d0674a27d4b512b7d1a5e576b7bd22e", "9beb9b87d0ada1dc9a0294f6cda52de2", 1, "9db183835b5095a2fe3b"),
		(3,		"Cristian",	"Verdi",	"cristian.verdi@email.com",	"3456789012",	"hutWorker",	"c916da4ef3a473d862a7b10c65f10ec0", "214e83c9288a28eeae8ef4c5d90bcbbc", 0, "b8ad08aad8e0246f9796"),
		(4,		"Randolph",	"Carter",	"andolph.arter@email.com",	"3456789012" ,	"hiker",		"19553e12f7a26f5a03e27535bdcaa934", "6c162af51f7d3bd4dcdd3473f5ef966c", 1, "9624204ad3e62652572f"),
		(5,		"Larry",	"Thomas",	".homas@email.com",			"12345678901",	"hiker",		"64338048d65002be18a12aa199f066ab", "614945b9aa9ed013352e086c69de3a69", 0, "92f036e0b3e9cdaca0be"),
		(6,		"Frank",	"Johnson",	"rank.ohnson@email.com",	"12345678901",	"hiker",		"eb2262a72a0a66fefc27d41fb5c4fa1b", "76fc845c94171f48fbf760f07bf4b800", 1, "95de7689d924b30fc36d"),
		(7,		"Eric",		"Williams",	"ric.illiams@email.com",	"12345678901",	"hiker",		"d462395a99e5bb30410f0df3661f5c6e", "21e4ff57a3613181597028b67c1fddea", 0, "af0ac3118920c4221d37"),
		(8,		"Stephen",	"Brown",	"tephen.rown@mail.com",		"12345678901",	"hiker",		"81e1eab27b85250d64e5869f373abb24", "afb686bd9e4f422bed33dc6fa001f6b6", 1, "dcb31fcaeaa09ca1d889"),
		(9,		"Andrew",	"Miller",	"ndrew.iller@email.com",	"12345678901",	"localGuide",	"ed407a43fe0316eee0aa6162b45e3a20", "bcca6b149b5c978304bcab18bcefa83f", 0, "a7cbaefd65187a2c72dd"),
		(10,	"Gregory",	"Jones",	"regory.ones@email.com",	"12345678901",	"localGuide",	"d62ecd543f8f1baf24b2576562c59aaf", "3e8a2844dbf65ca99a3537459ca9ad31", 1, "c60030e908b4dfe6ca56"),
		(11,	"Mary",		"Lee",		"ary.ee@email.com",			"234567890",	"localGuide",	"fd6fc0d277420d47bec20814c789b3f2", "663a3233acb3c6a11d7221f8f8384552", 0, "c5bd845e9d0d842580bb"),
		(12,	"Friede",	"Gonzalez",	"riede.onzalez@email.com",	"234567890",	"localGuide",	"14810b323656d8fe539f965157ea94f5", "c5fcb8fc2860f59520d17f24d869cac9", 1, "b2d46a8548ea512dd661"),
		(13,	"Patricia",	"Harris",	"atricia.arris@email.com",	"234567890",	"localGuide",	"103398d9b123750bf0035d89fe7f152a", "775b7ec077d60d8d6632bff70c2f7631", 0, "fbf7d15ab43f19267fc8"),
 		(14,	"Linda",	"Clark",	"inda.lark@email.com",		"234567890",	"localGuide",	"99b5a2008096a75094accd4fd3b622c5", "35e6d9bdc58601c6df083575eca0a85b", 1, "9feadc7620ea50b0de06"),
		(15,	"Barbara",	"Robinson",	"arbara.obinson@email.com",	"234567890",	"localGuide",	"2b3e4e973bd44c441859307476401419", "d05239a4245ba825e61786cd1649e58d", 0, "97af67210f9d7f510d6c"),
		(16,	"Elizabeth","Lewis",	"lizabeth.ewis@email.com",	"3456789012",	"hutWorker",	"230f5385efe5cc7eb8e7cf8eb0fcfb05", "160df082f2fb1074cf554feebbcfb736", 1, "2943f3fc5c8f9f0900b6"),
		(17,	"Jennifer",	"Walker",	"ennifer.alker@email.com",	"3456789012",	"hutWorker",	"4ae199deae86fc7a2adcc7b3d3146087", "4ae199deae86fc7a2adcc7b3d3146087", 0, "216884a5fe6f6e91e6d0"), 
		(18,	"Maria",	"Hall",		"aria.all@email.com", 		"3456789012",	"hutWorker",	"2e4536acd14508c40cc19d3dc06b3070", "1b89bba839d3a1f69f37b1069bcf32e9", 1, "df9e7b5cac18ab2286bd"), 
		(19,	"Susan",	"Young",	"usan.oung@email.com",		"3456789012",	"hutWorker",	"986dbcae3953cae1172e8ccc3e38d18c", "ca1171e03a509d2c4347db364d559ee1", 0, "882887635bc1ba86472c"), 
		(20,	"Eileen",	"Allen",	"ileen.llen@email.com",		"3456789012",	"hutWorker",	"add7d5daded92afa014417539a998213", "9bc8b87be611f3a15fee8901507f83a3", 1, "29ed7fceaabfa15b1833"), 
		(21,	"Dorothy",	"Sanchez",	"orothy.anchez@email.com",	"3456789012",	"hutWorker",	"8df096854b70171f1b802824efa9e2d0", "a19d1cae7186a9d334b3d756d5239d49", 0, "bd3968a7d6b351f09420");
		
INSERT INTO POINT(pointID, name, latitude, longitude, address, municipality, province, pointType) 
	VALUES
		(1, "Al Sap", "44.87021540832461", "7.161989618049187", "Alpe del Sap, 215", "Angrogna", "Torino", "hut"), --height: 1480
		(3, "Barbara Lowrie", "44.76013231583071", "7.084189202618271", "Pis della Rossa","Bobbio Pellice", "Torino", "hut"), --height: 1753
		(6,  "Giuseppe Melano Casa Canada", "44.974323728091", "7.299674437120998", "Rocca Sbarua", "Frossasco", "Torino", "hut"), --height: 1060
		(7,  "Battaglione Alpini Monte Granero", "44.75212487414308", "7.041395441417518", "Adrec del Laus", "Bobbio Pellice", "Torino", "hut"), --height: 2377
		(8,  "Troncea", "44.9748395084994", "6.961313725385879", "Frazione Troncea", "Pragelato", "Torino", "hut"), --height: 
		(9,  "Severino Bessone al Lago Verde", "44.848984612543376", "7.009471574959937", "Founset, Lago", "Prali", "Torino", "hut"), --height: 
		(10, "Willy Jervis", "44.781275965331645", "7.036207939450853", "Conca del Prà", "Bobbio Pellice", "Torino", "hut"), --height: 
		(11, "Salza", "44.97762748047302", "6.839397138848224", "Borgata Didietro, 16", "Salza di Pinerolo", "Torino", "hut"), --height: 
		(12, "Ciabota del Prà", "44.779813801333994", "7.036207939162996", "Prà del Mirabores", "Bobbio Pellice", "Torino", "hut"), --height: 
		(13, "La Foresteria di Massello", "44.96606539680167", "7.055764188864649", "Borgata Molino, 4", "Massello", "Torino", "hut"), --height: 
		(14, "Pzit Rei", "45.07289553862993", "7.020671525603902", "Via della Rocca, 1", "Usseaux", "Torino", "hut"), --height: 
		(15, "Selleries", "45.05829677248282", "7.118452955805334", "Alpe Selleries", "Roure", "Torino", "hut"), --height: 
		(16, "Villanova", "44.81076401991162", "7.056185604385492", "Borgata Villanova", "Bobbio Pellice", "Torino", "hut"), --height: 
		(17, "Alpe Balma", "45.051410442504775", "7.190947337226893", "Alpe della Balma", "Coazze", "Torino", "hut"), --height: 1986
		(18, "Alpeggio Toglie", "45.100620071304604", "7.121516296162575", "Toglie", "Mattie", "Torino", "hut"), --height: 1530
		(19, "Avanzà", "45.181048386933924", " 6.949786842590845", "Passo Avanzà", "Venaus", "Torino", "hut"), --height: 2580
		(20, "Baita Gimont", "44.941458755424115", " 6.760199666306238", "Pian Gimont", "Cesana", "Torino", "hut"), --height: 2035
		(21, "Cà d'Asti", "45.20134583464137", "7.074022245228914", "Cà d'Asti", "Mompanero", "Torino",  "hut"), --height: 2854
		(2, "park#1", "45.181048386933924", "6.949786842590845", "address2", "Settimo", "Torino", "parkinglot"),
		(4, "park#2", "123", "456", "address4", "Settimo", "Torino", "parkinglot"),
		(22, "park#3", "123", "456", "address22", "Trecate", "Novara", "parkinglot"),
		(23, "park#4", "123", "456", "address23", "Settimo", "Torino",  "parkinglot"),
		(24, "park#5", "123", "456", "address24", "Refrancore", "Asti", "parkinglot"),
		(25, "park#6", "123", "456", "address25", "Settimo", "Torino",  "parkinglot"),
		(26, "park#7", "123", "456", "address26", "Candelo", "Biella", "parkinglot"),
		(27, "park#8", "123", "456", "address27", "Settimo", "Torino",  "parkinglot"),
		(28, "park#9", "123", "456", "address28", "Candelo", "Biella", "parkinglot"),
		(29, "park#10", "123", "456", "address29", "Settimo", "Torino",  "parkinglot"),
		(30, "park#11", "123", "456", "address30", "Refrancore", "Asti", "parkinglot"),
		(31, "park#12", "123", "456", "address31", "Settimo", "Torino",  "parkinglot"),
		(32, "park#13", "123", "456", "address32", "Trecate", "Novara", "parkinglot"),
		(33, "park#14", "123", "456", "address33", "Settimo", "Torino",  "parkinglot"),
		(5, "generic#1", "123", "456", "address5", "Settimo", "Torino", "generic"),
		(34, "generic#2", "123", "456", "address34", "Refrancore", "Asti", "generic"),
		(35, "generic#3","123", "456", "address35", "Refrancore", "Asti", "generic"),
		(36, "generic#4", "123", "456", "address36", "Candelo", "Biella", "generic"),
		(37, "generic#5", "123", "456", "address37", "Trecate", "Novara", "generic"),
		(38, "generic#6", "123", "456", "address38", "Candelo", "Biella", "generic"),
		(39, "generic#7", "123", "456", "address39", "Trecate", "Novara", "generic"),
		(40, "generic#8", "123", "456", "address40", "Candelo", "Biella", "generic"),
		(41, "generic#9", "123", "456", "address41", "Refrancore", "Asti", "generic"),
		(42, "generic#10", "123", "456", "address42", "Trecate", "Novara", "generic"),
		(43, "generic#11", "123", "456", "address43", "Refrancore", "Asti", "generic"),
		(44, "generic#12", "123", "456", "address44", "Settimo", "Torino", "generic"),
		(45, "generic#13", "123", "456", "address45", "Trecate", "Novara", "generic"),
		(46, "generic#14", "123", "456", "address46", "Settimo", "Torino", "generic"),
		(47, "generic#15", "123", "456", "address47", "Refrancore", "Asti", "generic"),
		(48, "generic#16", "123", "456", "address48", "Settimo", "Torino", "generic"),
		(49, "generic#17", "123", "456", "address49", "Refrancore", "Asti", "generic"),
		(50, "generic#18", "123", "456", "address50", "Settimo", "Torino", "generic");

INSERT INTO HUT (hutID, bedspace) 
	VALUES
		(1, 50),
		(3, 48),
		(6, 45),
		(7, 44),
		(8, 43),
		(9, 42),
		(10, 41),
		(11, 40),
		(12, 39),
		(13, 38),
		(14, 37),
		(15, 36),
		(16, 35),
		(17, 34),
		(18, 33),
		(19, 32),
		(20, 31),
		(21, 30);

INSERT INTO PARKINGLOT (parkingLotId, carspace)
	VALUES
		(2,100),
		(4,100),
		(22,100),
		(23,100),
		(24,100),
		(25,100),
		(26,100),
		(27,100),
		(28,100),
		(29,100),
		(30,100),
		(31,100),
		(32,100),
		(33,100);

INSERT INTO HIKEREFERENCEPOINT (hikeID, referencePointId)
	VALUES
		(1, 1),
		(1, 2),
		(2, 2),
		(2, 4);

INSERT INTO HIKE (hikeID, title, length, expectedTime, ascent, difficulty, startPointID, endPointID, description, municipality, province)
	VALUES
		(1, "hike#1", 700, 130, 100, "Tourist", 1, 4, "description1","Settimo", "Torino"),
		(2, "hike#2", 2122, 145, 123, "Hiker", 2, 5, "Description2","Candelo", "Biella"),
		(3, "hike#3", 3976, 160, 514, "Professional Hiker", 3, 6, "description3","Settimo", "Torino"),
		(4, "hike#4", 1683, 200, 178, "Tourist", 12, 42 , "description4","Candelo", "Biella"),
		(5, "hike#5", 930, 212, 189, "Hiker", 50, 45, "description5", "Trecate", "Novara"),
		(6, "hike#6", 512, 313, 526, "Tourist", 44, 36, "description6","Refrancore", "Asti"),
		(7, "hike#7", 4673, 124, 345, "Hiker", 33, 27, "description7","Trecate", "Novara"),
		(8, "hike#8", 5426, 152, 123, "Tourist", 22, 38, "description8","Refrancore", "Asti"),
		(9, "hike#9", 9731, 300, 300, "Professional Hiker", 11, 49, "description9", "Trecate", "Novara"),
		(10, "hike#10", 1111, 210,  200, "Tourist", 1, 21, "description10", "Settimo", "Torino");

INSERT INTO HIKEGROUP(groupID, hikeID, leaderID)
	VALUES
		(1,	10,	1),
		(2,	9,	2),
		(3,	8,	10),
		(4,	7,	9),
		(5,	6,	8),
		(6,	5,	7),
		(7,	4,	6),
		(8,	3,	5),
		(9,	2,	4),
		(10,1,	3);

INSERT INTO HIKEGROUPMEMBER (groupID, userID, confirmed, completed)
	VALUES
		(1,1,1,1),
		(2,2,1,0),
		(3,3,1,0),
		(4,4,0,1),
		(5,5,0,1),
		(6,6,0,1),
		(7,7,0,1),
		(8,8,0,1),
		(9,9,0,1),
		(10,10,0,1),
		(1,11,0,1),
		(2,12,0,1),
		(3,13,0,1),
		(4,14,0,1),
		(5,15,0,1),
		(6,16,0,1),
		(7,17,1,1),
		(8,18,1,1),
		(9,19,1,1),
		(10,20,0,1),
		(1,21,1,1),
		(2,22,1,1),
		(3,23,1,1),
		(4,24,0,1),
		(5,25,0,1),
		(6,26,0,1),
		(7,27,1,0),
		(8,28,1,0),
		(9,29,1,0),
		(10,30,0,0),
		(1,31,0,0),
		(2,32,0,0),
		(3,33,1,0),
		(4,34,1,0),
		(5,35,1,1),
		(6,36,0,1),
		(7,37,0,1),
		(8,38,1,1),
		(9,39,1,1),
		(10,40,1,1);

INSERT INTO HUTWORKER (userID, hutID, confirmed)
	VALUES
		(1,  50, 0),
		(2,  49, 0),
		(3,  48, 0),
		(4,  47, 0),
		(5,  46, 0),
		(6,  45, 0),
		(7,  44, 0),
		(8,  43, 0),
		(9,  42, 0),
		(10, 41, 1),
		(11, 40, 1),
		(12, 39, 1),
		(13, 38, 1),
		(14, 37, 1),
		(15, 36, 1),
		(16, 35, 1),
		(17, 34, 1),
		(18, 33, 1),
		(19, 32, 0),
		(20, 31, 0),
		(21, 30, 0),
		(22, 29, 0),
		(23, 28, 0),
		(24, 27, 0),
		(25, 26, 0),
		(26, 25, 0),
		(27, 24, 0),
		(28, 23, 1),
		(29, 22, 1),
		(30, 21, 1),
		(31, 20, 1),
		(32, 19, 1),
		(33, 18, 1),
		(34, 17, 1),
		(35, 16, 1),
		(36, 15, 1),
		(37, 14, 0),
		(38, 13, 0),
		(39, 12, 0),
		(40, 11, 0),
		(41, 10, 0),
		(42, 9, 0),
		(43, 8, 0),
		(44, 7, 0),
		(45, 6, 0),
		(46, 5, 0),
		(47, 4, 1),
		(48, 3, 1),
		(49, 2, 1),
		(50, 1, 1);