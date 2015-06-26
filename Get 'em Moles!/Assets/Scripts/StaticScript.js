
#pragma strict

import System;
import System.IO;
import System.Math;
import System.Text.RegularExpressions;
import System.Collections.Generic;

static var gameObjects : List.<GameObject>;

static var scripts : List.<Correct>;

public  var style:GUIStyle;

public static var words:List.<String>;
public static var correctLetter:String;
public static var currentPos:int = 0;  
public static var word:String;
public static var alphabet:String[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
public static var score=0;
static var roundScore:int;
static var posScore:float;
public static var hitCount:int=1;
public static var goNext:boolean= false;
static var Hints:List.<String>;
static var wordLength:int;
static var startTime:float;
static var isPressed:boolean = false;
static var VoiceObject:GameObject;
static var n:int;


public static var wordlist:String[];

wordlist = ['weird',
'conscience',
'field',
'privilege',
'pronunciation',
'receive',
'despair'];



function  Start () {
 
	n=0;
 	roundScore=0;
 	VoiceObject = GameObject.Find("WordVoice");
 	gameObjects = new List.<GameObject>();
 
	scripts = new List.<Correct>();
	words= new List.<String>();
	Hints= new List.<String>();
	initWords();
 	word = getWord();
 	//word="banana";
 	print(word);
 	wordLength=word.Length;
 	posScore=100/wordLength;
 	correctLetter = word.ToString()[currentPos].ToString();
 	//	print(correctLetter);
 	/*
 	  var a : GameObject = GameObject.Find("q");	
 	  a.renderer.enabled = false;
 	  var sc:Correct = a.GetComponent("Correct");
 	  sc.wrong.renderer.enabled = true;
 	*/
 	  
 	for(var i=0;i<=25;i++){
		gameObjects.Add(GameObject.Find(i.ToString()));
 	  	var temp:GameObject;
 	  	temp = gameObjects[i];
 	  	var sc:Correct =  temp.GetComponent("Correct");
 	  	scripts.Add(sc);
	}
	var tempsnd:AudioClip = UnityEngine.Resources.Load("WordBank/" + word);
	VoiceObject.audio.clip = tempsnd;	 
	VoiceObject.audio.Play();
 	  
	startTime=Time.time;
}

function Update () {

	if(Time.time-startTime > 3 &&Time.time-startTime < 6 &&!isPressed){
		//Hints
		posScore=posScore*3/4;
		getScript(correctLetter).PlayBomb();
		if(Hints.Count<3){
			var temp = alphabet[UnityEngine.Random.Range(0,25)];
	 		getScript(temp).PlayBomb();
	 		Hints.Add(temp);
		}
	}
	else if(Time.time-startTime>=6){//&&notPressedYet==true){
	//Blast
		posScore*=2/3;
		for(var i =0;i<Hints.Count;i++){
			getScript(Hints[i]).PlayBlast();
		}
		getScript(correctLetter).PlayMole();
	}
	
	/*
	if(pressed!=0&&Time.time-pressed>2){
		renderer.enabled=true;
		correct.renderer.enabled=false;
		notPressedYet=true;
	}
	
	*/
	
}

static function playWordAgain()
{

var tempsnd:AudioClip = UnityEngine.Resources.Load("WordBank/" + word);
	VoiceObject.audio.clip = tempsnd;	 
	VoiceObject.audio.Play();
	
}

static function getLetter(obj){
	// var mmm =Convert.ToInt16(rgx.Match(obj.ToString()).ToString());
	var temp:GameObject;
	temp=obj;
	var mmm =Convert.ToInt16(temp.name);
	//var mmm =rgx.Match(obj.ToString());
	return alphabet[mmm];
}
static function getObject(obj){
	//return gameObjects[alphabet.IndexOf(obj.ToString())];
	return gameObjects[Convert.ToInt32("a"[0]) - Convert.ToInt32(obj.ToString()[0])];
}
static function getScript(obj){
	return scripts[Convert.ToInt32(obj.ToString()[0]) - Convert.ToInt32("a"[0]) ];
}
static function getWord(){
	return words[UnityEngine.Random.Range(0,words.Count-1)];
}
static function initWords(){
	/*

	var s =  new StreamReader("words.txt");
	var i = 0;
	var temp = s.ReadLine();	
 	words.Add(temp.ToString());
	while (words[i]!=null) {
		i++;
		words.Add(s.ReadLine());
		//print(words[i]);
	}
	*/
	var tr:StringReader;
	var data:TextAsset;
 	data = UnityEngine.Resources.Load("words", typeof(TextAsset));
	tr = new StringReader(data.text);
	var w = tr.ReadLine();

	while(w!=null){
		words.Add(w);
		w = tr.ReadLine();
	}
	for(var i =0 ;i<7;i++){
		words.Add(wordlist[i]);
	}

}

static function correct(){
	Hints.Clear();
	

	
	if(StaticScript.currentPos!=StaticScript.word.ToString().Length-1){
		currentPos++;
 		//yield WaitForSeconds(0.2);
	 	correctLetter = word.ToString()[currentPos].ToString();
	 	score+=posScore;
	 	roundScore+=posScore;
	 	posScore=100/wordLength;
	 }
	else{
		//Load new word and reset vars
		if(roundScore>200){
			Application.LoadLevel("Bonus");
		}
		else{
			ResetScripts();
			print("Next Word");
			score+=posScore;
			roundScore+=posScore;
	 		word = getWord();
 			print(word);
 			wordLength=word.Length;
 			posScore=100/wordLength;
 			print("PosScore: "+posScore);
 			currentPos = 0;
 			correctLetter = word.ToString()[currentPos].ToString();
 			//print(correctLetter);
			var tempsnd:AudioClip = UnityEngine.Resources.Load("WordBank/" + word);
 	  		yield WaitForSeconds(0.7);
 	 		VoiceObject.audio.clip = tempsnd;	 
 	 		VoiceObject.audio.Play();
 	 	}
	}
	 
		yield WaitForSeconds(0.1);
	for(var i=0;i<=25;i++){
		scripts[i].Reset();
	}

	
 	  
 	startTime=Time.time;
 	isPressed = false;
}

static function wrong(){
	//Play Wrong sound
	getScript(correctLetter).PlayMole();
	//Show right mole
}

static function ResetScripts()
{


}

function OnGUI(){
	var s:String;
	for(var i =0;i<=currentPos-1;i++){
		s+=word.ToString()[i].ToString();
	}
	if (s==null)s="";
	GUI.Label (Rect(200, 20, 500, 200),s,style);
	GUI.Label(Rect(270,Screen.height-75,200,200),""+score,style);
}
