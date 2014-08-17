var l;
function modTick() {
	var a = Player.getPointedEntity();
	if (a != -1 && a != l && Entity.getEntityTypeId(a) == 33) {
		l = a;
		Level.explode(Entity.getX(a), Entity.getY(a), Entity.getZ(a), 5);
		Entity.remove(a);
	}
}
