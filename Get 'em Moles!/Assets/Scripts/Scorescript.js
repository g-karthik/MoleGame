#pragma strict
var k:GameObject;
var sc:StaticScript;
var scorea:int;
function Start () {
	k=GameObject.Find("StaticO");
	sc=k.GetComponent("StaticScript");
	DontDestroyOnLoad(this);

}

function Update () {
	scorea=sc.score;
}
