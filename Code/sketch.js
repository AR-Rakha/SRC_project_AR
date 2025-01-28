let p0;
let p1;
let p2;
let p3;


function setup() 
{
	//Canvas
	createCanvas(600, 600);
	
	//points
	p0 = createVector(20, 20);
  	p1 = createVector(580, 20);
	p2 = createVector(20, 580);
	p3 = createVector(580, 580);

	//color
	colorMode(HSB);
	p0_color=color(0,85,90);
	p1_color=color(90,85,90);

}

function draw()
{
	background(0);



	//buttons to move points
	//eleminates the problem of to or more overlaping points
	if(keyIsDown(49)){PTM(p0);}
	if(keyIsDown(50)){PTM(p1);}
	if(keyIsDown(51)){PTM(p2);}
	if(keyIsDown(52)){PTM(p3);}
	

	//Drawing the curve with the interval 0.001
	draw_curve(p0,p1,p2,p3,p0_color,p1_color,0.001);
	
	stroke(250);

	strokeWeight(6);
	point(p0);
	point(p1);
	point(p2);
	point(p3);


	frameRate(60);

	
}

// point to mouse funktion
function PTM(_p){
	_p.x=mouseX;
	_p.y=mouseY;
}

//Lerp funktion so you dont have to lerp x and y individually many times
function lerpPoint(p_1,p_2,time){
	return createVector(lerp(p_1.x, p_2.x, time), lerp(p_1.y, p_2.y, time))
}


//Draws a quadratic bezier curve from 4 points and 2 colors (color gradiant curve)
function draw_curve(p_1,p_2,p_3,p_4, c_1,c_2,t){
	for (let i = 0; i <= 1; i+=t) {
		//lerp points
		a= lerpPoint(p_1,p_2,i)
		b= lerpPoint(p_2,p_3,i)
		c= lerpPoint(p_3,p_4,i)

		d= lerpPoint(a,b,i)
		e= lerpPoint(b,c,i)

		f= lerpPoint(d,e,i)
		
		//Drawing points on the curve
		strokeWeight(5);
		stroke(lerpColor(c_1, c_2, i));
		point(f);

	}
}