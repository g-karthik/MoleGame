#pragma strict

public var moled:GameObject;
public var state=false;
public var script:Scorescript;
function Start () {
	/*var p=GameObject.Find("Quad");
	script=p.GetComponent("Scorescript");
	score=script.scorea;*/
	DoIt();
}
function Update () {
	
}
function DoIt(){
	do{
		if(state){
			renderer.enabled=false;
			moled.renderer.enabled=true;
		}
		else{
			if(renderer.enabled==false){
				renderer.enabled=true;
				moled.renderer.enabled=false;
			}	
		}
		var k=Random.Range(0,100);
		if(k>75){
			state=true;
		}
		else{
			state=false;
		}
		yield WaitForSeconds(2);
	}while(4!=5);

}

function OnMouseDown(){
	if(renderer.enabled==false){
		renderer.enabled=true;
		moled.renderer.enabled=false;
		audio.Play();
		state=false;
		StaticScript.score+=10;
		print(StaticScript.score);
	}
}