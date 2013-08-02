// Melting Stick mod by kacperski1

function useItem(x,y,z,itemId,blockId)
{
  if(blockId == 79)
	{
		setTile(x,y,z,8);
	}
	else if(blockId == 49)
	{
		setTile(x,y,z,10);
	}
	preventDefault();
}
