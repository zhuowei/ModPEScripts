// AutoTorch mod by kacperski1
// Automatically places torches behind you every few meters :)

var LastTorchX;
var LastTorchY;
var LastTorchZ;
var Active = 0;
var Temp;

function useItem(x,y,z,itemId,blockId)
{
  if(itemId == 50 && blockId == 20)
	{
		if(Active == 0)
		{
			Active = 1;
			print("AutoTorch activated!");
			setTile(getPlayerX(),getPlayerY(),getPlayerZ(),50);
			
			LastTorchX = getPlayerX();
			LastTorchY = getPlayerY();
			LastTorchZ = getPlayerZ();
		}
		else
		if(Active == 1)
		{
			Active = 0;
			print("AutoTorch disactivated!");
		}
		preventDefault();
	}
}

function placeTorch(x,y,z)
{
	setTile(x,y,z,50);
	LastTorchX = x;
	LastTorchY = y;
	LastTorchZ = z;
}

function bl_tickHook()
{

	if(Active == 1)
	{
	Temp = getPlayerX() - LastTorchX;
	if(Temp < 0) {Temp = -Temp;}
	if(Temp > 10) {placeTorch(getPlayerX(), getPlayerY(), getPlayerZ());}
	else
	{
		Temp = getPlayerY() - LastTorchY;
		if(Temp < 0) {Temp = -Temp;}
		if(Temp > 10) {placeTorch(getPlayerX(), getPlayerY(), getPlayerZ());}
		else
		{
			Temp = getPlayerZ() - LastTorchZ;
			if(Temp < 0) {Temp = -Temp;}
			if(Temp > 10) {placeTorch(getPlayerX(), getPlayerY(), getPlayerZ());}
		}
	}
}
