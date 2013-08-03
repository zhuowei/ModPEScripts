// Treecapitator mod by kacperski1

function useItem(x,y,z,itemId,blockId)
{
  if(itemId == 271 || itemId == 275 || itemId == 279 || itemId == 286 || itemId == 258)
	{
		if(blockId == 17)
		{
			setTile(x,y,z,0);
			addItemInventory(17,1);
			for(var a = 1; a < 10; a++)
			{
				if(getTile(x,y+a,z) == 17)
				{
					setTile(x,y+a,z,0);
					addItemInventory(17,1);
				}
				else {break;}
			}
			preventDefault();
		}
	}
}
