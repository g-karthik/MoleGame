#pragma strict

import System;
import System.IO;
import System.Math;
import System.Text.RegularExpressions;

public var correct:Sprite;
public var wrong:Sprite;
var normal:Sprite;
var bomb:Sprite;
var blast:Sprite;
var moleBlast:GameObject;
var startTime:float;
var notPressedYet=true;
public var isActive=true;
public static var pressed=0.0;

static var buzzer:GameObject;
static var ting:GameObject ;
var l:String;
function Start () {
buzzer = GameObject.Find("WrongBuzzer");
ting = GameObject.Find("CorrectBuzzer");
l=(Convert.ToInt32("a"[0])+Convert.ToInt32(gameObject.name)).ToString();
print(l);
/*
	if(!IfCorrect()){
		isActive=false;
	}
	if(!isActive==true){
		//this.enabled=false;
	}
	else{
		
	}
	*/
	startTime=Time.time;
}
function Update () {	

/*
	if(Time.time-startTime>2&&Time.time-startTime<4){//&&notPressedYet==true){
		renderer.enabled=false;
		bomb.renderer.enabled=true;
	}
	else if(Time.time-startTime>=4){//&&notPressedYet==true){
		bomb.renderer.enabled=false;
		blast.renderer.enabled=true;
		if(IfCorrect()){
			MoleBlast();
		}
	}
	
	
	if(pressed!=0&&Time.time-pressed>2){
		renderer.enabled=true;
		correct.renderer.enabled=false;
		notPressedYet=true;
	}
	
	*/
	if(Input.GetKeyDown((Convert.ToChar(Convert.ToInt32("a"[0])+Convert.ToInt32(gameObject.name))).ToString())){
		Pressed();
	}
	
}
function OnGUI(){
	
}


function OnMouseDown(){
	Pressed();
	//pressed=Time.time;
	//print("Wrong!!!!");
	
	
	
/*	else{
		wrong.renderer.enabled=true;
		m=Time.time;
		
	}
	*/
}
function Pressed(){
	StaticScript.isPressed = true;
	hideAll();
	if(IfCorrect()){	
	gameObject.GetComponent(SpriteRenderer).sprite = correct;

		//pressed=Time.time;
		//Play sound if correct
		ting.audio.Play();
		audio.Play();
		//audio.Play();
		StaticScript.correct();	 
		//print("Coreeeeeeeect!");
		 
	}
	else{
		buzzer.audio.Play();
		StaticScript.wrong();
	gameObject.GetComponent(SpriteRenderer).sprite = wrong;

		//pressed=Time.time;
		//print("Wrong!!!!");
	}
	
	
  
   
//	yield WaitForSeconds(1);
}



function IfCorrect()
{
var a = StaticScript.getLetter(gameObject).ToString();
var b = StaticScript.correctLetter.ToString();
	return (a==b);

}

public function hideAll()
{
gameObject.GetComponent(SpriteRenderer).sprite = normal;
 	moleBlast.renderer.enabled=false;
/*
   	blast.renderer.enabled = false;
   	gameObject.renderer.enabled=false;
   	wrong.renderer.enabled=false;
   	correct.renderer.enabled=false;
   	bomb.renderer.enabled=false;
   	moleBlast.renderer.enabled=false;
   	*/
}

public function Reset(){
	hideAll();
   gameObject.GetComponent(SpriteRenderer).sprite = normal;
    	moleBlast.renderer.enabled=false;
}


public function PlayMole(){
	hideAll();
   	moleBlast.renderer.enabled=true;
}

public function PlayBomb(){
	hideAll();
gameObject.GetComponent(SpriteRenderer).sprite = bomb;
}

public function PlayWrong(){
	hideAll();
gameObject.GetComponent(SpriteRenderer).sprite = wrong;
}

public function PlayCorrect(){
	hideAll();
gameObject.GetComponent(SpriteRenderer).sprite = correct;
}

public function PlayBlast(){
	hideAll();
gameObject.GetComponent(SpriteRenderer).sprite = blast;
}