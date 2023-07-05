const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.entities = [];
	let automata = new Automata();
	gameEngine.addEntity(automata);

	document.getElementById("1dwalk").addEventListener("click", () => {
		automata.add1DWalker();
	});

	document.getElementById("2dwalk").addEventListener("click", () => {
		automata.add2DWalker();
	});

	document.getElementById("drunk").addEventListener("click", () => {
		automata.addDrunk();
	});

	document.getElementById("clear").addEventListener("click", () => {
		automata.clearWalkers();
	});

	gameEngine.init(ctx);

	gameEngine.start();
});
