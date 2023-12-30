import winston from 'winston'
import {join,dirname} from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderName = 'logs'
let newDir = __dirname.split('utils')[0]
const logFolderPath = join(newDir,folderName)

export const createFolder=()=>{
    if(!fs.existsSync(logFolderPath)){
        fs.mkdir(logFolderPath,()=>console.log('log flder created!'))
    }
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
      winston.format.simple(),
    //   winston.format.prettyPrint(),
    ), 
    transports: [
      new winston.transports.Console({level:'error'}),  // learn about it
      new winston.transports.File({ filename: join(logFolderPath,'logfile.log') ,level:'info' }),
      new winston.transports.File({ filename: join(logFolderPath,'error.log') ,level:'error' }),
      new winston.transports.File({ filename: join(logFolderPath,'silly.log') ,level:'silly' })
    ]
  });