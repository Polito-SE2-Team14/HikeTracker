const populationFunctions = require("../database/populationFunctions")

async function main(){
	await populationFunctions.restoreOriginalDB();
}

main();