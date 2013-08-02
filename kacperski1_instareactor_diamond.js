// Instant Nether Reactor mod by kacperski1

function useItem(x,y,z,itemId,blockId)
{
  if(itemId == 264) // replace 264 with another item id if you want ;)
	{
		setTile(x,y,z,4);
		setTile(x-1,y,z,4);
		setTile(x+1,y,z,4);
		setTile(x,y,z-1,4);
		setTile(x,y,z+1,4);
		setTile(x-1,y,z-1,41);
		setTile(x-1,y,z+1,41);
		setTile(x+1,y,z-1,41);
		setTile(x+1,y,z+1,41);
		setTile(x,y+1,z,247);
		setTile(x-1,y+1,z-1,4);
		setTile(x-1,y+1,z+1,4);
		setTile(x+1,y+1,z-1,4);
		setTile(x+1,y+1,z+1,4);
		setTile(x,y+2,z,4);
		setTile(x-1,y+2,z,4);
		setTile(x+1,y+2,z,4);
		setTile(x,y+2,z-1,4);
		setTile(x,y+2,z+1,4);
		print("Nether Reactor created!");
		
		preventDefault();
	}
}
