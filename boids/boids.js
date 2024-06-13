class Boid {
	constructor(init_x,init_y,init_vx,init_vy){
		this.x = init_x;
		this.y = init_y;
		this.vx = init_vx;
		this.vy = init_vy;
	}

	updateBoids(boids) {
		for (let i = 0; i < boids.length; i++) {
			var close_dx = 0;
			var close_dy = 0;
			var xvel_avg = 0;
			var yvel_avg = 0;
			var xpos_avg = 0;
			var ypos_avg = 0;
			var neighbouring_boids = 0;

			var boid = boids[i];
			for (let j = 0; j < boids.length; j++) {
				var otherboid = boids[j];
				// Seperation
				close_dx += boid.x - otherboid.x;
				close_dy += boid.y - otherboid.y;
				boid.vx += close_dx*avoidfactor;
				boid.vy += close_dy*avoidfactor;
				// Alignment
				xvel_avg += otherboid.vx;
				yvel_avg += otherboid.vy;
				neighbouring_boids += 1;
				if (neighbouring_boids > 0) {
					xvel_avg = xvel_avg/neighbouring_boids;
					yvel_avg = yvel_avg/neighbouring_boids;
				}
				boid.vx += (xvel_avg - boid.vx)*matchingfactor;
				boid.vy += (yvel_avg - boid.vy)*matchingfactor;
				// Cohesion
				xpos_avg += otherboid.x;
				ypos_avg += otherboid.y;
				neighbouring_boids += 1;
				xpos_avg = xpos_avg/neighbouring_boids;
				ypos_avg = ypos_avg/neighbouring_boids;
				boid.vx += (xpos_avg - boid.x)*centeringfactor
				boid.vy += (ypos_avg - boid.y)*centeringfactor
			}
		}
	}
}
