// Entity Teleport mod by kacperski1

var TPx;
var TPy;
var TPz;
var TPset = 0;

function useItem(x,y,z,itemId,blockId)
{
  if(itemId == 296) // Wheat
	{
		TPx = x;
		TPy = y + 1;
		TPz = z;
		TPset = 1;
		clientMessage("Destination coords set to "+TPx+", "+TPy+", "+TPz+".");
	}
}
function attackHook(attacker, victim)
{
	if(getCarriedItem() == 296)
	{
		if(TPset == 1)
		{
			setPosition(victim,TPx,TPy,TPz);
			clientMessage("Entity "+victim+" teleported to "+TPx+", "+TPy+", "+TPz+".");
		}
		else { clientMessage("Set destination coords first by hitting a block with wheat!"); }
	}
}
