//Car modscript by Lambo_16
//This script, unlike the other scripts in the repo, does not fall under licensing: all rights are still reserved by Lambo
var car = null;
function attackHook(player,vehicle){
	if(getCarriedItem()==280){//if the current item is a stick
		if(Entity.getEntityTypeId(vehicle)==84){//if the vehicle is a minecart (id found on http://minecraft.gamepedia.com/Data_values#Entity_IDs)
			car = vehicle;
			clientMessage("Car selected.");
			preventDefault();
			rideAnimal(player, vehicle);
		}
	}
}
function modTick(){
	var carVel = 0.5;
	if(getCarriedItem()==267){//if item is a iron sword
		if(car != null){//if car is defined
			var yaw = Entity.getYaw(Player.getEntity());
			Entity.setVelX(car, -carVel * Math.sin(yaw / 180 * Math.PI));
			Entity.setVelZ(car, carVel * Math.cos(yaw / 180 * Math.PI));
		}
	}
}
