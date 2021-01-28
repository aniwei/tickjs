import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';


import { 
  projectRCFile,
  projectDist
} from '../shared/path';

export async function exists () {
  return (
    fs.existsSync(projectRCFile()) && 
    fs.existsSync(projectDist())
  )
}