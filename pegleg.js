function addPegLegToRenderer(renderer) {
	var rightLeg = renderer.getModel().getPart("rightLeg");
	rightLeg.clear();
	rightLeg.setTextureOffset(0, 16);
	rightLeg.addBox(-1.0, 0.0, -1.0, 2, 10, 2); //leg
	rightLeg.setTextureOffset(0, 26);
	rightLeg.addBox(-2.0, 10, -2.0, 4, 2, 4); //shoe
}
addPegLegToRenderer(Renderer.get(3)); //player
addPegLegToRenderer(Renderer.get(16)); //player (multiplayer)
