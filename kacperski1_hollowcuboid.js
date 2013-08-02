// Hollow Cuboid mod by kacperski1
// Makes you able to make hollow cuboids with 3 simple steps (based on how it works in 500ISE's mod, just to make it easier to remember)
// Currently DOESN'T WORK for some reason, please help ._.

var x1;
var x2;
var y1;
var y2;
var z1;
var z2;
var CubeBlock;
var Mode;
// Modes:
// 0 - wait for 1st block
// 1 - wait for 2nd block
// 2 - wait for block id

function createHollowCuboid(x1,y1,z1,x2,y2,z2,CubeBlock)
{
  var lowestX = Math.min(x1, x2);
	var lowestY = Math.min(y1, y2);
	var lowestZ = Math.min(z1, z2);
	var highestX = Math.max(x1, x2);
	var highestY = Math.max(y1, y2);
	var highestZ = Math.max(z1, z2);

	for(var x = lowestX; x <= highestX; x++)
	{
		for(var y = lowestY; y <= highestY; y++)
		{
			setTile(x,y,lowestZ,CubeBlock);
			setTile(x,y,highestZ,CubeBlock);
			for(var z = lowestZ; z <= highestZ; z++)
			{
				setTile(x,lowestY,z,CubeBlock);
				setTile(x,highestY,z,CubeBlock);
				setTile(lowestX,y,z,CubeBlock);
				setTile(highestX,y,z,CubeBlock);
			}
		}
	}
	print("Created a hollow cuboid!");
}

function useItem(x,y,z,itemId,blockId)
{
        if(itemId == 294) //If the item you use is a Golden Hoe
        { //wrote them backwards because reasons:
			if(Mode == 2)
			{
				CubeBlock = blockId;
				print("Material selected - " + CubeBlock);
				createHollowCuboid(x1,y1,z1,x2,y2,z2,CubeBlock);
				Mode = 3;
			}
		
			if(Mode == 1)
			{
				x2 = x;
				y2 = y;
				z2 = z;
				print("Position #2 saved at"+ x2 +", "+ y2 +", "+ z2 +".");
				Mode = 2; // Time for block selection!
			}
		
			if(Mode == 0)
			{
				x1 = x;
				y1 = y;
				z1 = z;
				print("Position #1 saved at"+ x1 +", "+ y1 +", "+ z1 +".");
				Mode = 1; // Time for second one!
			}
			
			if(Mode == 3) {Mode = 0;}
			preventDefault();
        }
        
}
