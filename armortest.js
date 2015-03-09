//Item.defineArmor(int id, String iconName, int iconIndex, String name,
//			String texture, int damageReduceAmount, int maxDamage, int armorType)
Item.defineArmor(411, "empty_armor_slot_boots", 0, "Zombie mask",
			"mob/zombie.png", 1, 10, ArmorType.helmet);
Item.defineArmor(412, "empty_armor_slot_chestplate", 0, "Zombie shirt",
			"mob/zombie.png", 1, 10, ArmorType.chestplate);
// usually for leggings, you'll have a separate texture (e.g. built-in armour has a _2.png for leggings)
Item.defineArmor(413, "empty_armor_slot_leggings", 0, "Zombie pants",
			"mob/zombie.png", 1, 10, ArmorType.leggings);
Item.defineArmor(414, "empty_armor_slot_boots", 0, "Zombie shoes",
			"mob/zombie.png", 1, 10, ArmorType.boots);

function procCmd(cmd) {
	if (cmd == "zombiegear") {
		addItemInventory(411, 1);
		addItemInventory(412, 1);
		addItemInventory(413, 1);
		addItemInventory(414, 1);
	}
}
