let p0_0;
let p0;
let p0_1;

let p0_color;

let p1_0;
let p1;
let p1_2;

let p1_color;

let p2_1;
let p2;
let p2_3;

let p2_color;

let p3_2;
let p3;
let p3_4;

let p3_color;

let s=3;

//Catmull–Rom spline
//This spine consists if multiple cubic bezier curves
//First we have some anchor points
//Two anchor points are the start and end point of one cubic bezier curve
//The last to points in the cubic bezier curve are what i call the control points
//Each anchor point have two control points
//The position of first control point reletive to the anchor point is the same as
//The Next anchor points position reletive to the previous anchor points position, the anchor point before the anchor point that we are calculating the control points for
//Then then the second control point is the fist point mirrored around the anchor point
//then we draw all the cubic bezier curves after we have defined all the controlpoints to make the Catmull–Rom spline
function setup() 
{
	
	colorMode(HSB);

	createCanvas(720, 720);
	p0_0 = createVector(0, 0);
	p0 = createVector(20, 380);
  	p0_1 = createVector(20, 20);

	p0_color=color(0,85,90);

	p1_0 = createVector(380, 20);
  	p1 = createVector(380, 380);
	p1_2 = createVector(0, 0);

	p1_color=color(90,85,90);

	p2_1 = createVector(0, 0);
	p2 = createVector(0, 0);
	p2_3 = createVector(0, 0);

	p2_color=color(180,85,90);

	p3_2 = createVector(0, 0);
	p3 = createVector(0, 0);
	p3_4 = createVector(0, 0);

	p3_color=color(270,85,90);


}

function draw()
{
	background(0);

	

	if(keyIsDown(49)){
		p0.x=mouseX;
		p0.y=mouseY;
	}if(keyIsDown(50)){
		p1.x=mouseX;
		p1.y=mouseY;
	}if(keyIsDown(51)){
		p2.x=mouseX;
		p2.y=mouseY;
	}if(keyIsDown(52)){
		p3.x=mouseX;
		p3.y=mouseY;
	}


	EndAncorPoint(p0_0,p0,p1);
	EndAncorPoint(p3_4,p3,p2);


	calcFirstControlPoint(p0_1,p0,p0_0,p1);
	calcFirstControlPoint(p1_2,p1,p0,p2);
	calcFirstControlPoint(p2_3,p2,p1,p3);
	
	//Mirror
	mirrorPoints(p1_0,p1,p1_2);
	mirrorPoints(p2_1,p2,p2_3);
	mirrorPoints(p3_2,p3,p3_4);
	
	//Draw
	draw_curve(p0,p0_1,p1_0,p1,p0_color,p1_color);
	draw_curve(p1,p1_2,p2_1,p2,p1_color,p2_color);
	draw_curve(p2,p2_3,p3_2,p3,p2_color,p3_color);

	stroke(250);


	strokeWeight(2);
	point(p1_2);
	point(p2_1);
	point(p0_0);
	point(p2_3);
	point(p3_2);
	point(p3_4);
	point(p0_1);
	point(p1_0);

	strokeWeight(6);
	point(p0);
	point(p1);
	point(p2);
	point(p3);

	strokeWeight(0.1);
	line(p0_0.x, p0_0.y, p0_1.x, p0_1.y);
	
	line(p1_0.x, p1_0.y, p1_2.x, p1_2.y);
	line(p2_1.x, p2_1.y, p2_3.x, p2_3.y);
	line(p3_2.x, p3_2.y, p3_4.x, p3_4.y);




		

	
	frameRate(60);
}


function lerpPoint(p_1,p_2,time){
	return createVector(lerp(p_1.x, p_2.x, time), lerp(p_1.y, p_2.y, time))
}

function mirrorPoints(newPoint,centerPoint,pointToMirror){
	newPoint.x= centerPoint.x-(pointToMirror.x-centerPoint.x);
	newPoint.y= centerPoint.y-(pointToMirror.y-centerPoint.y);
}
function EndAncorPoint(newPoint,centerPoint,pointToMirror){
	newPoint.x= centerPoint.x-(pointToMirror.x-centerPoint.x)/s;
	newPoint.y= centerPoint.y-(pointToMirror.y-centerPoint.y)/s;
}

function calcFirstControlPoint(newPoint,anchorPoint,previousAnchorPoint,NextAnchorPoint){
	//Catmull–Rom spline
	newPoint.x=((NextAnchorPoint.x-previousAnchorPoint.x)/s+anchorPoint.x);
	newPoint.y=((NextAnchorPoint.y-previousAnchorPoint.y)/s+anchorPoint.y);
}


function draw_curve(p_1,p_2,p_3,p_4, c_1,c_2){
	for (let i = 0; i <= 1; i+=0.002) {
		let bCurvePoint= createVector(0,0);

		bCurvePoint.x=p_1.x*(-pow(i, 3)+3*pow(i,2)-3*i+1)+p_2.x*(3*pow(i,3)-6*pow(i,2)+3*i)+p_3.x*(-3*pow(i,3)+3*pow(i,2))+p_4.x*(pow(i,3))
		bCurvePoint.y=p_1.y*(-pow(i, 3)+3*pow(i,2)-3*i+1)+p_2.y*(3*pow(i,3)-6*pow(i,2)+3*i)+p_3.y*(-3*pow(i,3)+3*pow(i,2))+p_4.y*(pow(i,3))


		stroke(lerpColor(c_1, c_2, i));
		strokeWeight(4);

		point(bCurvePoint);
		//console.log(bCurvePoint)
	}
}