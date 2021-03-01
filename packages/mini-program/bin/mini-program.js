#!/usr/bin/env node
const commander = require('commander');

const { 
  CLI,
  Commands
} = require('../dist/CLI');

commander
  .command(Commands.INIT)
  .action(cli)
