'use strict';


var ut = {};

ut.DIR = {
    IMG: {
      BASE: '/img/',
      SPRITE: '/img/sprite/'
    },
    JS: '/js/'
};

ut.img = function(relPath) {
    return ut.DIR.IMG.BASE + relPath;
}

ut.spr = function(relPath) {
  return ut.DIR.IMG.SPRITE + relPath;
}
