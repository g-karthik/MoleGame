#pragma strict
public var skin:GUISkin;
function Start () {
}

function Update () {

}
function OnGUI(){
	GUI.Label(Rect(Screen.width/2,Screen.height/2,200,200),""+StaticScript.score,skin.GetStyle("Label"));
}