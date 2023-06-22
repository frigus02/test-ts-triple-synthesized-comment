// Copyright 2022 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const ts = require('typescript');

const FILE = ` 
@decorate()
class Foo {}
`;

const myTransformer = () => {
  return (sf) => {
    ts.setSyntheticLeadingComments(sf.statements[0], [
      {
        text: 'from transformer',
        kind: ts.SyntaxKind.MultiLineCommentTrivia,
        pos: -1,
        end: -1,
      },
    ]);
    return sf;
  };
};

const result = ts.transpileModule(FILE, {
  compilerOptions: {
    noEmitHelpers: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    target: ts.ScriptTarget.ESNext,
  },
  fileName: 'module.ts',
  reportDiagnostics: false,
  transformers: {
    before: [myTransformer],
  }
});

console.log(result.outputText);
