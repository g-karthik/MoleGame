#pragma strict
var k:GameObject;
//var m:Bonus;
var skin:GUISkin;
var ti:int;
var ti2:int;
function Start () {
	ti=Time.time;
}

function Update () {
	if((30-(ti2-ti))<=0){
		Application.LoadLevel("Continue");
		
	}
	ti2=Time.time;
	//m=(k.GetComponent("Bonus"));
}
function OnGUI(){
	GUI.Label(Rect(130,Screen.height-150,30,10),""+StaticScript.score,skin.GetStyle("Label"));
	GUI.Label(Rect(650,Screen.height-150,30,10),""+(30-(ti2-ti)),skin.GetStyle("Label"));
}