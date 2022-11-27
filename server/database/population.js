const { readFileSync } = require("fs");
const path = require("path");
const gpxParser = require('gpxparser');

const Singleton = require('./DBManagerSingleton');
const dbManager = Singleton.getInstance();

const HikeDAO = require('../DAO/hikeDAO');

function script() {
	let sql = 'INSERT INTO Hike VALUES(?, ?, ?, ?, ?, ?, NULL, NULL, "A description", ?, ?)';

	dbManager.clearDb();

	let hikes = [
		{ title: 'Mergozzo Sentiero Azzurro', difficulty: 'Hiker', municipality: 'Mergozzo', province: 'Verbano' },
		{ title: 'Monte Faje - Vercio', difficulty: 'Hiker', municipality: 'Mergozzo', province: 'Verbano' },
		{ title: 'Parco Giacomo Leopardi - Parco San Vito - Parco della Rimembranza', difficulty: 'Hiker', municipality: 'Torino', province: 'Torino' },
		{ title: 'Barolo - La Morra - Castello della Volta', difficulty: 'Hiker', municipality: 'Barolo', province: 'Cuneo' },
		{ title: 'Cappella Fina - i Balmint - Monte Todum', difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: 'Tour Monte Rosa', difficulty: 'Professional Hiker', municipality: 'Macugnaga', province: 'Verbano' },
		{ title: 'Ponte Diga - Basilica di Superga', difficulty: 'Hiker', municipality: 'Torino', province: 'Torino' },
		{ title: 'Dormelletto - Lagoni di Mercurago', difficulty: 'Tourist', municipality: 'Arona', province: 'Novara' },
		{ title: 'Monte Chaberton', difficulty: 'Professional Hiker', municipality: 'Claviere', province: 'Torino' },
		{ title: 'La Morra - Cappella del Barolo - Silio', difficulty: 'Hiker', municipality: 'La Morra', province: 'Cuneo' },
		{ title: 'Pian Cavallone - Alpe Cornala', difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: "Lago di Sant'Anna - Col du Saboulé - Lago Lousfer Supérieur", difficulty: 'Hiker', municipality: 'Unknown', province: 'Unknown' },
		{ title: 'Tour Monte Rosa, Tappa 5 Alagna, Rifugio Pastore - Macugnaga Staffa', difficulty: 'Professional Hiker', municipality: 'Alagna Valsesia', province: 'Vercelli' },
		{ title: 'Torino Centro Città', difficulty: 'Hiker', municipality: 'Torino', province: 'Torino' },
		{ title: 'Sentiero dei Principi', difficulty: 'Hiker', municipality: 'Avigliana', province: 'Torino' },
		{ title: 'Cicogna - Alpe del Braco - Pogallo', difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: 'Stresa - Belgirate via Sentiero dei Castagni', difficulty: 'Hiker', municipality: 'Stresa', province: 'Verbano' },
		{ title: 'Pian delle Gorre - Cascata Gias Fontana - Pis del Pesio', difficulty: 'Hiker', municipality: 'Ormea', province: 'Cuneo' },
		{ title: 'Mottarone Sentiero L1', difficulty: 'Professional Hiker', municipality: 'Stresa', province: 'Verbano' },
		{ title: 'Mont Taou Blanc via Refuge Savoia', difficulty: 'Professional Hiker', municipality: 'Ceresole Reale', province: 'Torino' },
		{ title: 'Rocca Sella', difficulty: 'Hiker', municipality: 'Caprie', province: 'Torino' },
		{ title: 'Sentiero Azzurro Agliano Terme', difficulty: 'Tourist', municipality: 'Agliano Terme', province: 'Asti' },
		{ title: 'Panchina Gigante Rossa via Sentiero 7-6', difficulty: 'Hiker', municipality: 'La Morra', province: 'Cuneo' },
		{ title: 'Lago Sirio - Lago Pistano', difficulty: 'Hiker', municipality: 'Ivrea', province: 'Torino' },
		{ title: 'Parco del Valentino - Parco Michelotti - Parco del Meisino', difficulty: 'Hiker', municipality: 'Torino', province: 'Torino' },
		{ title: 'Sentiero del Tasso - Strada di Valdolmo', difficulty: 'Hiker', municipality: "Vezza d'Alba", province: 'Cuneo' },
		{ title: 'Monte Mucrone', difficulty: 'Professional Hiker', municipality: 'Unknown', province: 'Biella' },
		{ title: "Gallo d'Alba - Grinzane Cavour", difficulty: 'Tourist', municipality: 'Grinzane Cavour', province: 'Cuneo' },
		{ title: "Cannobio - Sant'Anna via Sant'Agata", difficulty: 'Hiker', municipality: 'Cannobio', province: 'Verbano' },
		{ title: "Sant'Ambrogio - Monte Pirchiriano - Sacra San Michele", difficulty: 'Hiker', municipality: "Sant'Ambrogio di Torino", province: 'Torino' },
		{ title: 'La Riposa - Monte Rocciamelone', difficulty: 'Professional Hiker', municipality: 'Mompantero', province: 'Torino' },
		{ title: 'Cannobio - Carmine - Cannero', difficulty: 'Hiker', municipality: 'Cannobio', province: 'Verbano' },
		{ title: 'Pista Tagliafuco Caselette-Almese', difficulty: 'Hiker', municipality: 'Caselette', province: 'Torino' },
		{ title: 'Ruspesso - Monte Faiè', difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: 'Giro del Ciantiplagna', difficulty: 'Professional Hiker', municipality: 'Bussoleno', province: 'Torino' },
		{ title: 'Alpe Quaggione - Monte Cerano - Poggio Croce - Bochetta di Bagnone', difficulty: 'Hiker', municipality: 'Loreglia', province: 'Verbano' },
		{ title: 'Tour Monte Rosa, Tappa 6 Macugnaga - Saas Fee', difficulty: 'Professional Hiker', municipality: 'Macugnaga', province: 'Verbano' },
		{ title: 'Pian del Re - Lago Grande di Viso', difficulty: 'Hiker', municipality: 'Crissolo', province: 'Cuneo' },
		{ title: 'Rifugio Franco Remondino - Monte Argentera Sud', difficulty: 'Professional Hiker', municipality: 'Aisone', province: 'Cuneo' },
		{ title: 'Monte Moncuni', difficulty: 'Hiker', municipality: 'Rivoli', province: 'Torino' },
		{ title: 'Rifugio Questa - Lago delle Portette', difficulty: 'Professional Hiker', municipality: 'Valdieri', province: 'Cuneo' },
		{ title: 'Parco della Burcina', difficulty: 'Hiker', municipality: 'Biella', province: 'Biella' },
		{ title: 'San Pietro - Chiusa di San Michele - Monte Pirchiriano', difficulty: 'Hiker', municipality: "Sant'Ambrogio di Torino", province: 'Torino' },
		{ title: 'Lago Portette - Lago Claus - Lago Valscura', difficulty: 'Professional Hiker', municipality: 'Aisone', province: 'Cuneo' },
		{ title: 'Pecetto - Zamboni - Lago delle Locce', difficulty: 'Professional Hiker', municipality: 'Macugnaga', province: 'Verbano' },
		{ title: "Lungofiume Cannobio - Sant'Anna", difficulty: 'Hiker', municipality: 'Cannobio', province: 'Verbano' },
		{ title: 'Lesa - Magognino - Comnago', difficulty: 'Hiker', municipality: 'Lesa', province: 'Novara' },
		{ title: "Piancavallo - Cima di Morissolo - Cima l'Alpe", difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: 'Cicogna - Pogallo', difficulty: 'Hiker', municipality: 'Verbano', province: 'Verbano' },
		{ title: 'Lago Sottano della Sella', difficulty: 'Professional Hiker', municipality: 'Aisone', province: 'Cuneo' },
	];

	return hikes.map(h => {
		let data = readFileSync(path.join(__dirname, `../../Tracks/${h.title}.gpx`), 'utf8');
		let gpx = new gpxParser();
		gpx.parse(data);

		h.length = Math.round(gpx.tracks[0].distance.total);
		h.ascent = gpx.tracks[0].elevation.pos ? Math.round(gpx.tracks[0].elevation.pos) : 0;
		h.expectedTime = Math.round((12.09 * h.length + 98.4 * h.ascent) / 1000);
		h.track = gpx.tracks[0].points.map(p => [p.lat, p.lon]);
		h.description = "A description";

		return HikeDAO.addHike(h);
	});
}

Promise.all(script());