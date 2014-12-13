var REDSTONE_DUST_ID = 241;

// define a block with ID 241, name "Redstone dust"
// render on layer 
Block.defineBlock(REDSTONE_DUST_ID, "Redstone dust", 
	[["redstone_dust_cross", 0]],
	1, //material source
	false // not opaque
);
// sets the block's boundaries.
// the order of parameters: xmin, ymin, zmin, xmax, ymax, zmax
// in this case, the block starts at y = 0, and stops at y = 0.0625 -- 6.25 cm high.
Block.setShape(REDSTONE_DUST_ID, 0, 0, 0, 1, 0.0625, 1);
Block.setRenderLayer(REDSTONE_DUST_ID, 1); // render on layer 1; i.e. transparent
Block.setColor(REDSTONE_DUST_ID, [0x800000]);
Block.setLightOpacity(REDSTONE_DUST_ID, 0);
