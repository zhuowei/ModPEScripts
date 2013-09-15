function attackHook(attacker, victim) {
	var itemInHand = getCarriedItem();
	if (itemInHand != 344) return; //egg
	var victimType = Entity.getEntityTypeId(victim);
	Entity.spawnMob(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), victimType, null);
	preventDefault();
}
