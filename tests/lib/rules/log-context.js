/**
 * @fileoverview must have context
 * @author Hung Vo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/log-context"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("log-context", rule, {

    valid: [ {
      code: `

      function isSignatureValid(request) {
  Log.setContext({
    filename: filename,
    function: 'isSignatureValid'
  });

  Log.info('Request from fb'.h1);
  Log.info(headers['x-hub-signature'], JSON.stringify(body, null, 2));
  shaObj.setHMACKey(APP_SECRET, 'TEXT');
  shaObj.update(jsonString);
  return signatureHeader;
}`
    }

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "function() {Log.info('123')}",
            errors: [{
                message: "Missing log context",
                type: "Log_context_missing"
            }]
        }
    ]
});