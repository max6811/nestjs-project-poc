import { Context, Query, Resolver } from '@nestjs/graphql';

import { ExcelFilesService } from '../services/excel.services';
import { Logger } from '@nestjs/common';

@Resolver()
export class ExcelFilesResolver {
  constructor(private readonly excelFilesService: ExcelFilesService) {}

  @Query(() => String)
  async downloadExcelFile(@Context() context): Promise<string> {
    Logger.log('start download');
    return this.excelFilesService.getGeneratedStyledExcel(context.user);
  }
}
