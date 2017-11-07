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

    const shouldFix = (codeBlock, functionName) => {
      console.log('checking if this should be fixed:', codeBlock);
      const should = !/Log\.setContext/.test(codeBlock)
          || !/filename.*LOG_CONTEXT_FILEPATH/m.test(codeBlock)
          || !(new RegExp(`function.*'${functionName.replace('.', '.*')}'`, 'm')).test(codeBlock);

      console.log({ should });
      return should;
    };

    const action = (codeBlock) => {
      const shouldReplace = /Log\.setContext/.test(codeBlock);
      console.log('should replace', shouldReplace);
      return shouldReplace ? 'replaceText' : 'insertTextBefore';
    };

    const getFuncname = (func) => {
      const { name, object, property } = func;
      const functionName = name || `${object.name}.${property.name}`;
      return functionName;
    };

    let done = false;

    return {
      'FunctionDeclaration > BlockStatement > :first-child': (node) => {
        console.log('Found Function Declaration');
        const text = context.getSourceCode().getText(node);
        const functionName = node.parent.parent.id.name;
        if (shouldFix(text, functionName)) {
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer[action(text)](
                node,
                `Log.setContext({
                  filename: LOG_CONTEXT_FILEPATH,
                  function: '${functionName}'
                 })
              `,
              );
              return fixed;
            },
          });
        }
      },

      'FunctionExpression > BlockStatement > :first-child': (node) => {
        console.log('Found Function Expression');
        const text = context.getSourceCode().getText(node);
        const parentNode = node.parent.parent.parent;
        let functionName = '';
        switch (parentNode.type) {
          case 'Property':
            functionName = parentNode.key.name;
            break;
          case 'AssignmentExpression':
            functionName = getFuncname(parentNode.left);
            break;
          case 'VariableDeclarator':
            functionName = parentNode.id.name;
            break;
          case 'CallExpression':
            functionName = getFuncname(parentNode.callee);
            break;
          default:
            functionName = `unknown_function ${node.loc.start.line}:${node.loc.start.column}`;
        }
        if (!functionName) {
          functionName = `unknown_function ${node.loc.start.line}:${node.loc.start.column}`;
        }
        if (shouldFix(text, functionName)) {
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer[action(text)](
                node,
                `Log.setContext({
                     filename: LOG_CONTEXT_FILEPATH,
                     function: '${functionName}',
                   })
                  `,
              );
              return fixed;
            },
          });
        }
      },

      'ArrowFunctionExpression > BlockStatement > :first-child': (node) => {
        console.log('Found Arrow Function Expression');
        const text = context.getSourceCode().getText(node);
        const parentNode = node.parent.parent.parent;
        let functionName = '';
        switch (parentNode.type) {
          case 'Property':
            functionName = parentNode.key.name;
            break;
          case 'AssignmentExpression':
            functionName = getFuncname(parentNode.left);
            break;
          case 'VariableDeclarator':
            functionName = parentNode.id.name;
            break;
          case 'CallExpression':
            functionName = getFuncname(parentNode.callee);
            break;
          default:
            functionName = `unknown_function ${node.loc.start.line}:${node.loc.start.column}`;
        }
        if (!functionName) {
          functionName = `unknown_function ${node.loc.start.line}:${node.loc.start.column}`;
        }
        if (shouldFix(text, functionName)) {
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer[action(text)](
                node,
                `Log.setContext({
                     filename: LOG_CONTEXT_FILEPATH,
                     function: '${functionName}',
                   })
                  `,
              );
              return fixed;
            },
          });
        }
      },

      'Program > :not(ImportDeclaration)': (node) => {
        if (done) {
          console.log('already added the LOG_CONTEXT_FILEPATH, not doing anything');
          return;
        }
        console.log('Found node !ImportDeclaration type', node.type);
        const text = context.getSourceCode().getText(node);
        console.log('The text is', text);
        const fileName = context.getFilename().replace(process.cwd(), '');
        const allSource = context.getSourceCode().getText();
        const needFix = !(new RegExp(`const LOG_CONTEXT_FILEPATH.*'${fileName.replace('.', '.*')}'`, 'gm')).test(allSource);
        console.log({ needFix });
        if (needFix) {
          const shouldReplace = /const LOG_CONTEXT_FILEPATH/.test(text);
          const actionNeeded = shouldReplace ? 'replaceText' : 'insertTextBefore';
          console.log('action needed', actionNeeded);
          const newLines = shouldReplace ? '\n' : '\n\n';
          context.report({
            node,
            message: 'Missing context',
            fix: (fixer) => {
              const fixed = fixer[actionNeeded](node, `const LOG_CONTEXT_FILEPATH='${fileName}';${newLines}`);
              return fixed;
            },
          });
          done = true;
        }
      },
    };
  },
};
