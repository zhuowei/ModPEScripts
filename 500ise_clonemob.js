function attackHook(attacker, victim) {
	var itemInHand = getCarriedItem();
	if (itemInHand != 344) return; //egg
	var victimType = Entity.getEntityTypeId(victim);
	var result = Entity.spawnMob(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), victimType, null);
	if (victimType >= 10 && victimType < 14) { //animals
		var oldAge = Entity.getAnimalAge(victim);
		Entity.setAnimalAge(result, oldAge);
	}
	preventDefault();
}
