/**
 * @fileoverview must have context
 * @author Hung Vo
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "must have context",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
          //ExpressionStatement(node) {
            //console.log(node)
          //},
            // give me methods
          //FunctionDeclaration(node) {
////console.log('==============')
      ////console.log(JSON.stringify(node.body, null, 2))
      ////context.report(node, 'Do not use template literals');
          //},
          'FunctionDeclaration MemberExpression[object.name="Log"][property.name="setContext"]'(node) {
            console.log(node.object.name + '.' + node.property.name)
                  console.log(node.parent.arguments);
                
          }

        };
    }
}
