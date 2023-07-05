class Automata {
	constructor() {
		this.steps = [];
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			this.steps.push([]);
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.steps[i].push(0);
			}
		}
		this.tick = 0;
		this.walkers = [];

		this.walkers1d = 0;
		this.walkers2d = 0;
		this.escaped = 0;

		this.explored = [];
		this.totalSteps = 0;
	}	

	clearWalkers() {
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				this.steps[i][j] = 0;
			}
		}

		this.tick = 0;
		this.walkers = [];

		this.walkers1d = 0;
		this.walkers2d = 0;
		this.escaped = 0;

		this.explored = [];
		this.totalSteps = 0;
	}

	add1DWalker() {
		this.walkers1d++;
		this.walkers.push({ 
			x: PARAMETERS.dimension/2,
		 	y: PARAMETERS.dimension/2,
			type: 1
		});
	}

	add2DWalker() {
		this.walkers2d++;
		this.walkers.push({ 
			x: PARAMETERS.dimension/2,
		 	y: PARAMETERS.dimension/2,
			type: 2
		});
	}

	addDrunk() {
		this.drunks++;
		this.walkers.push({ 
			x: PARAMETERS.dimension/2,
		 	y: PARAMETERS.dimension/2,
			type: 3
		});
	}

	step(x, y) {
		this.totalSteps++;
		if(!(x < 0 || x >= PARAMETERS.dimension) && !(y < 0 || y >= PARAMETERS.dimension)) this.steps[x][y]++;
		if(!this.explored[`x${x}y${y}`]) {
			this.explored[`x${x}y${y}`] = true;
		}
	}

	hasEscaped(walker) {
		const x = walker.x;
		const y = walker.y;
		if(!(x < 0 || x >= PARAMETERS.dimension) && !(y < 0 || y >= PARAMETERS.dimension)) return false;
		return true;
	}

	updateData() {
		document.querySelector("#tick").innerHTML = `Tick: ${this.tick}`;
		document.querySelector("#steps").innerHTML = `Steps: ${this.totalSteps}`;
		document.querySelector("#explored").innerHTML = `Explored: ${Object.keys(this.explored).length}`;
		document.querySelector("#walkers1d").innerHTML = `1d Walkers: ${this.walkers1d}`;
		document.querySelector("#walkers2d").innerHTML = `2d Walkers: ${this.walkers2d}`;
		document.querySelector("#escaped").innerHTML = `Escaped: ${this.escaped}`;
	}

	updateWalkers() {
		if(this.walkers.length > 0) this.tick++;

		this.escaped = 0;
		this.walkers.forEach(walker => {
			if (walker.type === 1) {
				if (Math.random() < 0.5) walker.x++; else walker.x--;
			}
			if (walker.type === 2) {
				if (Math.random() < 0.5)
					if (Math.random() < 0.5) walker.x++; else walker.x--;
				else if (Math.random() < 0.5) walker.y++; else walker.y--;
			}
			if (walker.type === 3) {
				let x = walker.x;
				let y = walker.y;
				do {
					x = walker.x;
					y = walker.y;
					if (Math.random() < 0.5)
						if (Math.random() < 0.5) x++; else x--;
					else if (Math.random() < 0.5) y++; else y--;
				} while (walker.lastX === x && walker.lastY === y)
				walker.lastX = walker.x;
				walker.lastY = walker.y;
				walker.x = x;
				walker.y = y;
			}
			this.step(walker.x, walker.y);
			if (this.hasEscaped(walker)) this.escaped++;
		});
	}

	update() {
		for (let i = 0; i < 10; i++) {
			this.updateWalkers();
			this.updateData();
		}
	}

	draw(ctx) {
		const size = PARAMETERS.size;
		for(var i = 0; i < PARAMETERS.dimension; i++) {
			for(var j = 0; j < PARAMETERS.dimension; j++) {
				const steps = this.steps[i][j];
		
				ctx.fillStyle = rgb(steps,steps,steps);
				ctx.fillRect(i * size, j * size, size, size);
				ctx.strokeStyle = rgb(100,100,100);
				if (steps > 0) ctx.strokeRect(i * size, j * size, size, size);
			}
		}

		this.walkers.forEach(walker => {
			ctx.strokeStyle = walker.type === 1 ? "turquoise" : "pink";
			ctx.strokeRect(walker.x * size, walker.y * size, size, size);		
		});
	}
};