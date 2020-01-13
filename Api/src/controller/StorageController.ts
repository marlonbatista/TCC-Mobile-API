import { Request } from 'express';
import * as path from 'path';
import variables from '../configuration/config';
export class StorageController {

  async getFile(req: Request) {
    const filePath = `${variables.folderStorage}/${req.params.filename}`;
    
    return { file: path.resolve(filePath) };
  }

}