'use strict';


var ut = {};

ut.DIR = {
    IMG: '/img/',
    JS: '/js/'
};

ut.img = function(relPath) {
    return ut.DIR.IMG + relPath;
}