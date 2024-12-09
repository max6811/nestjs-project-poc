import { Injectable, Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { ApplicationExceptions } from '../../../common/utils/exceptions/application.exceptions';

@Injectable()
export class ExcelFilesService {
  constructor(private exception: ApplicationExceptions) {}

  async getGeneratedStyledExcel(user: string): Promise<string> {
    console.log(user);
    return '';
  }
}
