const chalk = require('chalk');
// console.log(chalk.bold.inverse.red(thing), ' \n');

const log = {
  info: function (...args) {
    args.forEach((arg) => {
      console.log(chalk.underline.white(arg));
    });
  },
  convo: function (...args) {
    args.forEach((arg) => {
      console.log(chalk.blue(arg));
    });
  },
}

export default log;