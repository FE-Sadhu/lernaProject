'use strict';
const mob = require('mob');
require('mokss');
module.exports = moa;
const _ = require('underscore');

console.log(_); // 在 mob 引的 underscore，但提升到了根目录，所以 moa 也可以用这个依赖

function moa() {
    // TODO
    mob() // 实时感知 mob 的变化大撒大撒
    // console.log(mob)
}

moa()