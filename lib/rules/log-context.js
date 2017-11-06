/**
 * @fileoverview must have context
 * @author Hung Vo
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'must have context',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'FunctionDeclaration > BlockStatement > :first-child': (node) => {
        const text = context.getSourceCode().getText(node);
        if (!/Log\.setContext/.test(text)) {
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer.insertTextBefore(node, `
               Log.setContext({
                filename: '${context.getFilename()}',
                function: '${node.parent.parent.id.name}'
               })
              `);
              return fixed;
            },
          });
        }
      },

      'FunctionExpression > BlockStatement > :first-child': (node) => {
        const text = context.getSourceCode().getText(node);
        if (!/Log\.setContext/.test(text)) {
          const parentNode = node.parent.parent.parent;
          let functionName = '';
          switch (parentNode.type) {
            case 'Property':
              functionName = parentNode.key.name;
              break;
            case 'AssignmentExpression':
              functionName = parentNode.left.name;
              break;
            case 'VariableDeclarator':
              functionName = parentNode.id.name;
              break;
            case 'CallExpression':
              functionName = parentNode.callee.name;
              break;
            default:
              functionName = `unknown_function ${node.loc.start}:${node.loc.end}`;
          }
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer.insertTextBefore(node, `
               Log.setContext({
                 filename: '${context.getFilename()}',
                 function: '${functionName}',
               })
              `);
              return fixed;
            },
          });
        }
      },

      'ArrowFunctionExpression > BlockStatement > :first-child': (node) => {
        const text = context.getSourceCode().getText(node);
        if (!/Log\.setContext/.test(text)) {
          const parentNode = node.parent.parent.parent;
          let functionName = '';
          switch (parentNode.type) {
            case 'Property':
              functionName = parentNode.key.name;
              break;
            case 'AssignmentExpression':
              functionName = parentNode.left.name;
              break;
            case 'VariableDeclarator':
              functionName = parentNode.id.name;
              break;
            case 'CallExpression':
              functionName = parentNode.callee.name;
              break;
            default:
              functionName = `unknown_function ${node.loc.start}:${node.loc.end}`;
          }
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer.insertTextBefore(node, `
               Log.setContext({
                 filename: '${context.getFilename()}',
                 function: '${functionName}',
               })
              `);
              return fixed;
            },
          });
        }
      },
    };
  },
};
