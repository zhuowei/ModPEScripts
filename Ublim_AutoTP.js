fuction modTick() {
  ppx = Player.getX();
  ppy = Player.getY();
  ppz = Player.getZ();
  
  if((getTile(ppx, ppy, ppz) != 0) &&
     (getTile(ppx, ppy - 1, ppz) != 0) &&
     
     (getTile(ppx, ppy, ppz) != 8) &&
     (getTile(ppx, ppy - 1, ppz) != 8) &&
     
     (getTile(ppx, ppy, ppz) != 9) &&
     (getTile(ppx, ppy - 1, ppz) != 9) &&
     
     (getTile(ppx, ppy, ppz) != 10) &&
     (getTile(ppx, ppy - 1, ppz) != 10) &&
     
     (getTile(ppx, ppy, ppz) != 11) &&
     (getTile(ppx, ppy - 1, ppz) != 11)) {
    tp();
  }
}

function tp () {
  for(i=1;i<=128;i++) {
    air = (Math.floor(ppy) - 2) + i;
    block0 = Level.getTile(ppx, air, ppz);
    block1 = Level.getTile(ppx, air + 1, ppz);
    block2 = Level.getTile(ppx, air + 2, ppz);
    if(block0 != 0 && block1 == 0 && block2 == 0) {
      Entity.setPosition(pp, ppx, air + 3,ppz);
    }
  }
}
