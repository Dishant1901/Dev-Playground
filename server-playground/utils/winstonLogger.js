import winston from 'winston'
import {join,dirname} from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
import os from 'os'
//
const homedir = os.homedir()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const folderName = 'playground-logs'
// let newDir = __dirname.split('utils')[0]
// const logFolderPath = join(newDir,folderName)

const logfolder = join(homedir,folderName)
export const createFolder=()=>{
    if(!fs.existsSync(logfolder)){
        fs.mkdir(logfolder,()=>console.log('log flder created!'))
    }
    // console.log(homedir)
}

const my_levels = {
    ERROR:0,
    INFO:1,
    SILLY:2,
}

// using winston for logging
export const logger = winston.createLogger({
    // level:my_levels,
    format: winston.format.combine(
      winston.format.timestamp(),
      // winston.format.simple(),
      winston.format.prettyPrint(),
    ), 
    transports: [
      // new winston.transports.Console({level:'error'}),  // learn about it
      new winston.transports.File({ filename: join(logfolder,'logfile.log') ,level:'info' }),
      new winston.transports.File({ filename: join(logfolder,'error.log') ,level:'error' }),
      new winston.transports.File({ filename: join(logfolder,'silly.log') ,level:'silly' })
    ]
  });