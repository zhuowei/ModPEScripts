// RedstonePE - iOS and Android Redstone Mod!
// version 0.0.1
// PRE-ALPHA - NOTHING REALLY WORKS YET!
// made by kacperski1 from BlackCode Studio

var tickTimer = 0;
var tickMax = 5; // After how many ticks
var temp[3];
var temp2[1];
var redstoneState[256][256][256] = 0;
var FirstUseDone = 0;
/*
0 - Inactive
1 to 14 - Active (level)
15 - Active, source
*/ 

function updateRedstone(x,y,z)
{
	
	if(getTile(x-1,y,z) == 49) {temp[0] = redstoneState[x-1][y][z];} // left
	if(getTile(x+1,y,z) == 49) {temp[1] = redstoneState[x+1][y][z];} // right
	if(getTile(x,y,z-1) == 49) {temp[2] = redstoneState[x][y][z-1];} // up
	if(getTile(x,y,z+1) == 49) {temp[3] = redstoneState[x][y][z+1];} // down
	
	if(temp[0] >= temp[1]) {temp2[0] = temp[0];} else {temp2[0] = temp[1];}
	if(temp[2] >= temp[3]) {temp2[1] = temp[2];} else {temp2[1] = temp[3];}
	
	if(temp2[0] > temp2[1]) {redstoneState[x][y][z] = temp2[0] - 1;} else {redstoneState[x][y][z] = temp2[1] - 1;}
	
	if(redstoneState[x][y][z] > 0) {setTile(x,y,z,246);}
}

function placeRedstone(x,y,z)
{
	setTile(x,y,z,49); //Glowing = 246
	updateRedstone(x,y,z);
}

function placeRedstoneTorch(x,y,z)
{
	setTile(x,y,z,50);
	redstoneState[x][y][z] = 15;
}

function useItem(x,y,z,itemId,blockId)
{
	if(FirstUseDone == 0)
	{
		for(var a = 0; a < 256; a++)
		{
			for(var b = 0; b < 256; b++)
			{
				for(var c = 0; c < 256; c++)
				{
					redstoneState[a][b][c] = 0;
				}
			}
		}
		FirstUseDone = 1;
	}

	if(itemId == 50) // Torch
	{
		placeRedstoneTorch(x,y,z);
		preventDefault();
	}
	if(itemId == 348) // Glowstone Dust
	{
		placeRedstone(x,y,z);
		preventDefault();
	}
}

function attackHook(attacker, victim)
{
	//Your Code Here
}

