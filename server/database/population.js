const { readFileSync } = require("fs");
const path = require("path");
const gpxParser = require('gpxparser');
const crypto = require("crypto");

const Singleton = require('./DBManagerSingleton');
const DBManager = require("../database/DBManager");
/** @type {DBManager} */
const dbManager = Singleton.getInstance();

const HikeDAO = require('../DAO/hikeDAO');
const UserDAO = require("../DAO/userDAO");
const PointDAO = require('../DAO/pointsDAO');

function hikesCreation() {
	const gpx = new gpxParser();

	let hikes = [
		{
			title: 'Mergozzo Sentiero Azzurro',
			difficulty: 'Hiker',
			municipality: 'Mergozzo',
			province: 'Verbano'
		},
		{
			title: 'Monte Faje - Vercio',
			difficulty: 'Hiker',
			municipality: 'Mergozzo',
			province: 'Verbano'
		},
		{
			title: 'Parco Giacomo Leopardi - Parco San Vito - Parco della Rimembranza',
			difficulty: 'Hiker',
			municipality: 'Torino',
			province: 'Torino'
		},
		{
			title: 'Barolo - La Morra - Castello della Volta',
			difficulty: 'Hiker',
			municipality: 'Barolo',
			province: 'Cuneo'
		},
		{
			title: 'Cappella Fina - i Balmint - Monte Todum',
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: 'Tour Monte Rosa',
			difficulty: 'Professional Hiker',
			municipality: 'Macugnaga',
			province: 'Verbano'
		},
		{
			title: 'Ponte Diga - Basilica di Superga',
			difficulty: 'Hiker',
			municipality: 'Torino',
			province: 'Torino'
		},
		{
			title: 'Dormelletto - Lagoni di Mercurago',
			difficulty: 'Tourist',
			municipality: 'Arona',
			province: 'Novara'
		},
		{
			title: 'Monte Chaberton',
			difficulty: 'Professional Hiker',
			municipality: 'Claviere',
			province: 'Torino'
		},
		{
			title: 'La Morra - Cappella del Barolo - Silio',
			difficulty: 'Hiker',
			municipality: 'La Morra',
			province: 'Cuneo'
		},
		{
			title: 'Pian Cavallone - Alpe Cornala',
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: "Lago di Sant'Anna - Col du Saboulé - Lago Lousfer Supérieur",
			difficulty: 'Hiker',
			municipality: 'Unknown',
			province: 'Unknown'
		},
		{
			title: 'Tour Monte Rosa, Tappa 5 Alagna, Rifugio Pastore - Macugnaga Staffa',
			difficulty: 'Professional Hiker',
			municipality: 'Alagna Valsesia',
			province: 'Vercelli'
		},
		{
			title: 'Torino Centro Città',
			difficulty: 'Hiker',
			municipality: 'Torino',
			province: 'Torino'
		},
		{
			title: 'Sentiero dei Principi',
			difficulty: 'Hiker',
			municipality: 'Avigliana',
			province: 'Torino'
		},
		{
			title: 'Cicogna - Alpe del Braco - Pogallo',
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: 'Stresa - Belgirate via Sentiero dei Castagni',
			difficulty: 'Hiker',
			municipality: 'Stresa',
			province: 'Verbano'
		},
		{
			title: 'Pian delle Gorre - Cascata Gias Fontana - Pis del Pesio',
			difficulty: 'Hiker',
			municipality: 'Ormea',
			province: 'Cuneo'
		},
		{
			title: 'Mottarone Sentiero L1',
			difficulty: 'Professional Hiker',
			municipality: 'Stresa',
			province: 'Verbano'
		},
		{
			title: 'Mont Taou Blanc via Refuge Savoia',
			difficulty: 'Professional Hiker',
			municipality: 'Ceresole Reale',
			province: 'Torino'
		},
		{
			title: 'Rocca Sella',
			difficulty: 'Hiker',
			municipality: 'Caprie',
			province: 'Torino'
		},
		{
			title: 'Sentiero Azzurro Agliano Terme',
			difficulty: 'Tourist',
			municipality: 'Agliano Terme',
			province: 'Asti'
		},
		{
			title: 'Panchina Gigante Rossa via Sentiero 7-6',
			difficulty: 'Hiker',
			municipality: 'La Morra',
			province: 'Cuneo'
		},
		{
			title: 'Lago Sirio - Lago Pistano',
			difficulty: 'Hiker',
			municipality: 'Ivrea',
			province: 'Torino'
		},
		{
			title: 'Parco del Valentino - Parco Michelotti - Parco del Meisino',
			difficulty: 'Hiker',
			municipality: 'Torino',
			province: 'Torino'
		},
		{
			title: 'Sentiero del Tasso - Strada di Valdolmo',
			difficulty: 'Hiker',
			municipality: "Vezza d'Alba",
			province: 'Cuneo'
		},
		{
			title: 'Monte Mucrone',
			difficulty: 'Professional Hiker',
			municipality: 'Unknown',
			province: 'Biella'
		},
		{
			title: "Gallo d'Alba - Grinzane Cavour",
			difficulty: 'Tourist',
			municipality: 'Grinzane Cavour',
			province: 'Cuneo'
		},
		{
			title: "Cannobio - Sant'Anna via Sant'Agata",
			difficulty: 'Hiker',
			municipality: 'Cannobio',
			province: 'Verbano'
		},
		{
			title: "Sant'Ambrogio - Monte Pirchiriano - Sacra San Michele",
			difficulty: 'Hiker',
			municipality: "Sant'Ambrogio di Torino",
			province: 'Torino'
		},
		{
			title: 'La Riposa - Monte Rocciamelone',
			difficulty: 'Professional Hiker',
			municipality: 'Mompantero',
			province: 'Torino'
		},
		{
			title: 'Cannobio - Carmine - Cannero',
			difficulty: 'Hiker',
			municipality: 'Cannobio',
			province: 'Verbano'
		},
		{
			title: 'Pista Tagliafuco Caselette-Almese',
			difficulty: 'Hiker',
			municipality: 'Caselette',
			province: 'Torino'
		},
		{
			title: 'Ruspesso - Monte Faiè',
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: 'Giro del Ciantiplagna',
			difficulty: 'Professional Hiker',
			municipality: 'Bussoleno',
			province: 'Torino'
		},
		{
			title: 'Alpe Quaggione - Monte Cerano - Poggio Croce - Bochetta di Bagnone',
			difficulty: 'Hiker',
			municipality: 'Loreglia',
			province: 'Verbano'
		},
		{
			title: 'Tour Monte Rosa, Tappa 6 Macugnaga - Saas Fee',
			difficulty: 'Professional Hiker',
			municipality: 'Macugnaga',
			province: 'Verbano'
		},
		{
			title: 'Pian del Re - Lago Grande di Viso',
			difficulty: 'Hiker',
			municipality: 'Crissolo',
			province: 'Cuneo'
		},
		{
			title: 'Rifugio Franco Remondino - Monte Argentera Sud',
			difficulty: 'Professional Hiker',
			municipality: 'Aisone',
			province: 'Cuneo'
		},
		{
			title: 'Monte Moncuni',
			difficulty: 'Hiker',
			municipality: 'Rivoli',
			province: 'Torino'
		},
		{
			title: 'Rifugio Questa - Lago delle Portette',
			difficulty: 'Professional Hiker',
			municipality: 'Valdieri',
			province: 'Cuneo'
		},
		{
			title: 'Parco della Burcina',
			difficulty: 'Hiker',
			municipality: 'Biella',
			province: 'Biella'
		},
		{
			title: 'San Pietro - Chiusa di San Michele - Monte Pirchiriano',
			difficulty: 'Hiker',
			municipality: "Sant'Ambrogio di Torino",
			province: 'Torino'
		},
		{
			title: 'Lago Portette - Lago Claus - Lago Valscura',
			difficulty: 'Professional Hiker',
			municipality: 'Aisone',
			province: 'Cuneo'
		},
		{
			title: 'Pecetto - Zamboni - Lago delle Locce',
			difficulty: 'Professional Hiker',
			municipality: 'Macugnaga',
			province: 'Verbano'
		},
		{
			title: "Lungofiume Cannobio - Sant'Anna",
			difficulty: 'Hiker',
			municipality: 'Cannobio',
			province: 'Verbano'
		},
		{
			title: 'Lesa - Magognino - Comnago',
			difficulty: 'Hiker',
			municipality: 'Lesa',
			province: 'Novara'
		},
		{
			title: "Piancavallo - Cima di Morissolo - Cima l'Alpe",
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: 'Cicogna - Pogallo',
			difficulty: 'Hiker',
			municipality: 'Verbano',
			province: 'Verbano'
		},
		{
			title: 'Lago Sottano della Sella',
			difficulty: 'Professional Hiker',
			municipality: 'Aisone',
			province: 'Cuneo'
		},
	];

	let i = 1;
	return hikes.map(h => {
		let data = readFileSync(path.join(__dirname, `../../Tracks/${h.title}.gpx`), 'utf8');

		gpx.parse(data);

		h.length = Math.round(gpx.tracks[0].distance.total);
		h.ascent = gpx.tracks[0].elevation.pos ? Math.round(gpx.tracks[0].elevation.pos) : 0;
		h.expectedTime = Math.round((12.09 * h.length + 98.4 * h.ascent) / 1000);
		h.track = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
		h.description = "A description";
		console.log(i++, "- Hike added")
		return HikeDAO.addHike(h);
	});
}

function usersCreation() {
	const jsonString = readFileSync(path.join(__dirname, "./dbFiles/user.json"));
	const users = JSON.parse(jsonString).users;

	let i = 1
	return users.map(u => {
		console.log(i++, "- User added")
		return UserDAO.Register(u, crypto.randomBytes(20).toString('hex'))
	})
}

function pointsCreation() {
	let points = [
		{
			pointID: 1,
			name: "Al Sap",
			latitude: "44.87021540832461",
			longitude: "7.161989618049187",
			address: "Alpe del Sap, 215",
			municipality: "Angrogna",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 3,
			name: "Barbara Lowrie",
			latitude: "44.76013231583071",
			longitude: "7.084189202618271",
			address: "Pis della Rossa",
			municipality: "Bobbio Pellice",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 6,
			name: "Giuseppe Melano Casa Canada",
			latitude: "44.974323728091",
			longitude: "7.299674437120998",
			address: "Rocca Sbarua",
			municipality: "Frossasco",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 7,
			name: "Battaglione Alpini Monte Granero",
			latitude: "44.75212487414308",
			longitude: "7.041395441417518",
			address: "Adrec del Laus",
			municipality: "Bobbio Pellice",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 8,
			name: "Troncea",
			latitude: "44.9748395084994",
			longitude: "6.961313725385879",
			address: "Frazione Troncea",
			municipality: "Pragelato",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 9,
			name: "Severino Bessone al Lago Verde",
			latitude: "44.848984612543376",
			longitude: "7.009471574959937",
			address: "Founset, Lago",
			municipality: "Prali",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 10,
			name: "Willy Jervis",
			latitude: "44.781275965331645",
			longitude: "7.036207939450853",
			address: "Conca del Prà",
			municipality: "Bobbio Pellice",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 11,
			name: "Salza",
			latitude: "44.97762748047302",
			longitude: "6.839397138848224",
			address: "Borgata Didietro, 16",
			municipality: "Salza di Pinerolo",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 12,
			name: "Ciabota del Prà",
			latitude: "44.779813801333994",
			longitude: "7.036207939162996",
			address: "Prà del Mirabores",
			municipality: "Bobbio Pellice",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 13,
			name: "La Foresteria di Massello",
			latitude: "44.96606539680167",
			longitude: "7.055764188864649",
			address: "Borgata Molino, 4",
			municipality: "Massello",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 14,
			name: "Pzit Rei",
			latitude: "45.07289553862993",
			longitude: "7.020671525603902",
			address: "Via della Rocca, 1",
			municipality: "Usseaux",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 15,
			name: "Selleries",
			latitude: "45.05829677248282",
			longitude: "7.118452955805334",
			address: "Alpe Selleries",
			municipality: "Roure",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 16,
			name: "Villanova",
			latitude: "44.81076401991162",
			longitude: "7.056185604385492",
			address: "Borgata Villanova",
			municipality: "Bobbio Pellice",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 17,
			name: "Alpe Balma",
			latitude: "45.051410442504775",
			longitude: "7.190947337226893",
			address: "Alpe della Balma",
			municipality: "Coazze",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 18,
			name: "Alpeggio Toglie",
			latitude: "45.100620071304604",
			longitude: "7.121516296162575",
			address: "Toglie",
			municipality: "Mattie",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 19,
			name: "Avanzà",
			latitude: "45.181048386933924",
			longitude: " 6.949786842590845",
			address: "Passo Avanzà",
			municipality: "Venaus",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 20,
			name: "Baita Gimont",
			latitude: "44.941458755424115",
			longitude: " 6.760199666306238",
			address: "Pian Gimont",
			municipality: "Cesana",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 21,
			name: "Cà d'Asti",
			latitude: "45.20134583464137",
			longitude: "7.074022245228914",
			address: "Cà d'Asti",
			municipality: "Mompanero",
			province: "Torino",
			pointType: "hut"
		},
		{
			pointID: 2,
			name: "park#1",
			latitude: "45.181048386933924",
			longitude: "6.949786842590845",
			address: "address2",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 4,
			name: "park#2",
			latitude: "123",
			longitude: "456",
			address: "address4",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 22,
			name: "park#3",
			latitude: "123",
			longitude: "456",
			address: "address22",
			municipality: "Trecate",
			province: "Novara",
			pointType: "parkinglot"
		},
		{
			pointID: 23,
			name: "park#4",
			latitude: "123",
			longitude: "456",
			address: "address23",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 24,
			name: "park#5",
			latitude: "123",
			longitude: "456",
			address: "address24",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "parkinglot"
		},
		{
			pointID: 25,
			name: "park#6",
			latitude: "123",
			longitude: "456",
			address: "address25",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 26,
			name: "park#7",
			latitude: "123",
			longitude: "456",
			address: "address26",
			municipality: "Candelo",
			province: "Biella",
			pointType: "parkinglot"
		},
		{
			pointID: 27,
			name: "park#8",
			latitude: "123",
			longitude: "456",
			address: "address27",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 28,
			name: "park#9",
			latitude: "123",
			longitude: "456",
			address: "address28",
			municipality: "Candelo",
			province: "Biella",
			pointType: "parkinglot"
		},
		{
			pointID: 29,
			name: "park#10",
			latitude: "123",
			longitude: "456",
			address: "address29",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 30,
			name: "park#11",
			latitude: "123",
			longitude: "456",
			address: "address30",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "parkinglot"
		},
		{
			pointID: 31,
			name: "park#12",
			latitude: "123",
			longitude: "456",
			address: "address31",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 32,
			name: "park#13",
			latitude: "123",
			longitude: "456",
			address: "address32",
			municipality: "Trecate",
			province: "Novara",
			pointType: "parkinglot"
		},
		{
			pointID: 33,
			name: "park#14",
			latitude: "123",
			longitude: "456",
			address: "address33",
			municipality: "Settimo",
			province: "Torino",
			pointType: "parkinglot"
		},
		{
			pointID: 5,
			name: "generic#1",
			latitude: "123",
			longitude: "456",
			address: "address5",
			municipality: "Settimo",
			province: "Torino",
			pointType: "generic"
		},
		{
			pointID: 34,
			name: "generic#2",
			latitude: "123",
			longitude: "456",
			address: "address34",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 35,
			name: "generic#3",
			latitude: "123",
			longitude: "456",
			address: "address35",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 36,
			name: "generic#4",
			latitude: "123",
			longitude: "456",
			address: "address36",
			municipality: "Candelo",
			province: "Biella",
			pointType: "generic"
		},
		{
			pointID: 37,
			name: "generic#5",
			latitude: "123",
			longitude: "456",
			address: "address37",
			municipality: "Trecate",
			province: "Novara",
			pointType: "generic"
		},
		{
			pointID: 38,
			name: "generic#6",
			latitude: "123",
			longitude: "456",
			address: "address38",
			municipality: "Candelo",
			province: "Biella",
			pointType: "generic"
		},
		{
			pointID: 39,
			name: "generic#7",
			latitude: "123",
			longitude: "456",
			address: "address39",
			municipality: "Trecate",
			province: "Novara",
			pointType: "generic"
		},
		{
			pointID: 40,
			name: "generic#8",
			latitude: "123",
			longitude: "456",
			address: "address40",
			municipality: "Candelo",
			province: "Biella",
			pointType: "generic"
		},
		{
			pointID: 41,
			name: "generic#9",
			latitude: "123",
			longitude: "456",
			address: "address41",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 42,
			name: "generic#10",
			latitude: "123",
			longitude: "456",
			address: "address42",
			municipality: "Trecate",
			province: "Novara",
			pointType: "generic"
		},
		{
			pointID: 43,
			name: "generic#11",
			latitude: "123",
			longitude: "456",
			address: "address43",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 44,
			name: "generic#12",
			latitude: "123",
			longitude: "456",
			address: "address44",
			municipality: "Settimo",
			province: "Torino",
			pointType: "generic"
		},
		{
			pointID: 45,
			name: "generic#13",
			latitude: "123",
			longitude: "456",
			address: "address45",
			municipality: "Trecate",
			province: "Novara",
			pointType: "generic"
		},
		{
			pointID: 46,
			name: "generic#14",
			latitude: "123",
			longitude: "456",
			address: "address46",
			municipality: "Settimo",
			province: "Torino",
			pointType: "generic"
		},
		{
			pointID: 47,
			name: "generic#15",
			latitude: "123",
			longitude: "456",
			address: "address47",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 48,
			name: "generic#16",
			latitude: "123",
			longitude: "456",
			address: "address48",
			municipality: "Settimo",
			province: "Torino",
			pointType: "generic"
		},
		{
			pointID: 49,
			name: "generic#17",
			latitude: "123",
			longitude: "456",
			address: "address49",
			municipality: "Refrancore",
			province: "Asti",
			pointType: "generic"
		},
		{
			pointID: 50,
			name: "generic#18",
			latitude: "123",
			longitude: "456",
			address: "address50",
			municipality: "Settimo",
			province: "Torino",
			pointType: "generic"
		}
	]

	let i = 1
	return points.map(p => {
		console.log(i++, "- Point added")
		return PointDAO.createPoint(p);
	})
}

function hutsCreation() {
	let huts = []

	let i = 1
	return huts.map(u => {
		console.log(i++, "- Hut added")
		return new Promise(1)
	})
}

function parkingLotsCreation() {
	let pLot = []

	let i = 1
	return pLot.map(u => {
		console.log(i++, "- Parking Lot added")
		return new Promise(1)
	})
}


Promise.resolve(dbManager.clearDb());
Promise.all(pointsCreation());
Promise.all(hutsCreation());
Promise.all(parkingLotsCreation());
Promise.all(usersCreation());
Promise.all(hikesCreation());