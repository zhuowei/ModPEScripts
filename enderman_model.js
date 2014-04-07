function addEndermanToRenderer(renderer) {
	var var2 = 0;
	var model = renderer.getModel();
	var bipedBody = model.getPart("body").clear().setTextureOffset(32, 16);
	bipedBody.addBox(-4.0, 0.0, -2.0, 8, 12, 4, var2);
	var bipedRightArm = model.getPart("rightArm").clear().setTextureOffset(56, 0);
	bipedRightArm.addBox(-1.0, -2.0, -1.0, 2, 30, 2, var2);
	var bipedLeftArm = model.getPart("leftArm").clear().setTextureOffset(56, 0);
	bipedLeftArm.addBox(-1.0, -2.0, -1.0, 2, 30, 2, var2);
	var bipedRightLeg = model.getPart("rightLeg").clear().setTextureOffset(56, 0);
	bipedRightLeg.addBox(-1.0, 0.0, -1.0, 2, 30, 2, var2);
	var bipedLeftLeg = model.getPart("leftLeg").clear().setTextureOffset(56, 0);
	bipedLeftLeg.addBox(-1.0, 0.0, -1.0, 2, 30, 2, var2);
}

addEndermanToRenderer(Renderer.get(3)); //player
addEndermanToRenderer(Renderer.get(16)); //multiplayer
