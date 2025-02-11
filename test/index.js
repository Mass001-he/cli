const { program } = require('commander');

program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log('options====>', options);
console.log('limit====>', limit);
console.log(program.args[0].split(options.separator, limit));
