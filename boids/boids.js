const turnfactor = 0.2;
const visual_range = 40;
const protected_range = 8;
const centeringfactor = 0.0005;
const avoidfactor = 0.05;
const matchingfactor = 0.05;
const maxspeed = 6;
const minspeed = 3;

function getRandomInt()

class Boid {
	constructor(){
		this.x = Math.random(init_x);
		this.y = Math.random(init_y);
		this.vx = init_vx;
		this.vy = init_vy;
	}
}

function updateBoids(boids) {
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
			
			// Differences in x and y
			dx = boid.x - otherboid.x
			dy = boid.y - otherboid.y
			
			if (Math.abs(dx) < visual_range && Math.abs(dy) < visual_range) {
				squared_distance = dx*dx + dy*dy
				if (squared_distance < protected_range_squared) {
					close_dx += boid.x - otherboid.x;
					close_dy += boid.y - otherboid.y;
				} else if (squared_distance < visual_range_squared) {
					xpos_avg += otherboid.x;
					ypos_avg += otherboid.y;
					xvel_avg += otherboid.vx;
					yvel_avg += otherboid.vy;
					neighbouring_boids += 1;
				}
			}

			if (neighbouring_boids > 0) {
				xpos_avg = xpos_avg/neighbouring_boids;
				ypos_avg = ypos_avg/neighbouring_boids;
				xvel_avg = xvel_avg/neighbouring_boids;
				yvel_avg = yvel_avg/neighbouring_boids;

				boid.vx = (boid.vx + (xpos_avg - boid.x)*centeringfactor + (xvel_avg-boid.vx)*matchingfactor);
				boid.vy = (boid.vy + (ypos_avg - boid.y)*centeringfactor + (yvel_avg-boid.vy)*matchingfactor);

			}
			boid.vx = boid.vx + (close_dx*avoidfactor);
			boid.vy = boid.vy + (close_dy*avoidfactor);

			speed = Math.sqrt(boid.vx*boid.vx + boid.vy*boid.vy);

			if speed < minspeed {
				boid.vx = (boid.vx/speed)*minspeed;
				boid.vy = (boid.vy/speed)*minspeed;
			}
			if speed > maxspeed {
				boid.vx = (boid.vx/speed)*minspeed;
				boid.vy = (boid.vy/speed)*minspeed;
			}
			boid.x = boid.x + boid.vx
			boid.y = boid.y + boid.vy
		}
	}
}
