ModPE.setItem(1000, "blaze_rod", 0, "Freeze Rod", 1);

function newLevel(level) {
if(level) {
clientMessage(ChatColor.YELLOW + "FreezeRod joined the game");
clientMessage("<FreezeRod> Added to creative inventory");
Player.addItemCreativeInv(1000, 1, 0);
}else {
clientMessage(ChatColor.YELLOW + "FreezeRod joined the game");
clientMessage("<FreezeRod> Added to creative inventory");
Player.addItemCreativeInv(1000, 1, 0);
}
}

function attackHook(attacker, victim) {
if(Player.getCarriedItem() == 1000) {
Entity.setImmobile(victim, true);
}
}
