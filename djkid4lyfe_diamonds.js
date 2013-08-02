//taken from thread at http://www.minecraftforum.net/topic/1920654-mod-pe-script-mod-cube-and-diamond-mod/
function buildCube(x,y,z,dim)
{
for(var i=0;i<dim;i++)
{
  for(var a=0;a<dim;a++)
  {
   setTile(x+i,y,z+a,56);//diamond
   setTile(x+i,y+dim-1,z+a,56);
  }
}
for(var i=0;i<dim;i++)
{
  for(var a=0;a<dim;a++)
  {
   setTile(x,y+i,z+a,57);
   setTile(x+dim-1,y+i,z+a,246);

  }
}
sayHayGurl("y0 philDawggg");
}
function sayHayGurl(msg)
{
print("HAY: "+msg);
}
function useItem(x,y,z,itemId,blockId)//hook
{
if(itemId==352)//Bone
{
  setTile(x,y,z,89);//Glowstone
}
else if(itemId==264) 
{ 
  buildCube(x,y,z,10);
}
else if(itemId==280)//If your item is a stick

        {

                addItemInventory(57,64);//Add 5 Dirt blocks to your inventory.

                print("Hello World");
     }

}
