import { Context, Query, Resolver } from '@nestjs/graphql';

import { ExcelFilesService } from '../services/excel.services';

@Resolver()
export class ExcelFilesResolver {
  constructor(private readonly excelFilesService: ExcelFilesService) {}

  @Query(() => String)
  async downloadExcelFile(@Context() context): Promise<string> {
    return this.excelFilesService.getGeneratedStyledExcel(context.user);
  }
}
