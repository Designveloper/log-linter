/**
 * @fileoverview log context should be setup and clean before running and closing a function
 * @author Hung Vo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



// import processors
module.exports.processors = {

    // add your processors here
};

