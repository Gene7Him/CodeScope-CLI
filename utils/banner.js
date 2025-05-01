// utils/banner.js
import chalk from 'chalk';
import boxen from 'boxen';

export function printBanner(title, subtitle) {
  const msg = `${chalk.bold.white(title)}\n${chalk.gray(subtitle)}`;
  console.log(
    boxen(msg, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    })
  );
}
