//This is a ModPE script that will instantly grow a tree when the ground is tapped with an oak sapling.

function useItem(x,y,z,itemId,blockId,side)
{
  {
  if(itemId==6)
      
    {
      //Creates the trunk of the tree
      setTile(x,y,z,17);
      setTile(x,y+1,z,17);
      setTile(x,y+2,z,17);
      setTile(x,y+3,z,17);
      setTile(x,y+4,z,17);
      setTile(x,y+5,z,17);
      
      //Creates the leaves of the tree
      setTile(x,y+6,z,18);
      setTile(x,y+7,z,18);
      setTile(x+1,y+6,z,18);
      setTile(x-1,y+6,z,18);
      setTile(x,y+6,z+1,18);
      setTile(x,y+6,z-1,18);
      setTile(x+1,y+5,z,18);
      setTile(x-1,y+5,z,18);
      setTile(x,y+5,z+1,18);
      setTile(x,y+5,z-1,18);
      setTile(x+1,y+4,z,18);
      setTile(x-1,y+4,z,18);
      setTile(x,y+4,z+1,18);
      setTile(x,y+4,z-1,18);
      setTile(x+1,y+5,z+1,18);
      setTile(x-1,y+5,z-1,18);
      setTile(x-1,y+5,z+1,18);
      setTile(x+1,y+5,z-1,18);
      setTile(x+2,y+5,z,18);
      setTile(x-2,y+5,z,18);
      setTile(x,y+5,z+2,18);
      setTile(x,y+5,z-2,18);
      
      
      
    }
              
              }         
              }
