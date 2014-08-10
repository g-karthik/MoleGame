#pragma strict

import System;
import System.IO;
import System.Math;

var correct:GameObject;
var wrong:GameObject;
var bomb:GameObject;
var blast:GameObject;
var moleBlast:GameObject;
var notPressed:float;
var notPressedYet=false;
public var isActive=false;
public var pressed=0.0;

var words = Array();
var correctLetter;
var currentPos = 0;  
var word;

function Start () {
 initWords();
 word = getWord();
 print(word);
 correctLetter = word.ToString()[currentPos];
 print(correctLetter);
	notPressed=Time.time;
	if(!isActive){
		this.enabled=false;
	}
}

function Update () {
	if(pressed!=0&&Time.time-pressed>2){
		renderer.enabled=true;
		correct.renderer.enabled=false;
		currentPos++;
	}
	if(Time.time-notPressed>2&&Time.time-notPressed<4&&notPressedYet==false){
		renderer.enabled=false;
		bomb.renderer.enabled=true;
	}
	else if(Time.time-notPressed>=4&&notPressedYet==false){
		bomb.renderer.enabled=false;
		blast.renderer.enabled=true;
		MoleBlast();
	}
	
}

function MoleBlast(){
	yield WaitForSeconds(1);
   	blast.renderer.enabled = false;
   	moleBlast.renderer.enabled=true;
}
function OnMouseDown(){
	renderer.enabled=false;
	notPressedYet=true;
	//if(IfCorrect()){
	correct.renderer.enabled=true;
	pressed=Time.time;
	//}
	/*
	else{
		wrong.renderer.enabled=true;
		m=Time.time;
	}
	*/
}
function IfCorrect()
{
	//return true/false
}

function getWord()
{
var n= UnityEngine.Random.Range(0,50);
return words[n];
}


function initWords()
{
var s =  new StreamReader("words.txt");

var i = 0;
words[i]=s.ReadLine();
while (words[i]!=null) {
		i++;
		words[i]=s.ReadLine();
}


}