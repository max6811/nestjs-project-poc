import { Module } from '@nestjs/common';

import { ExcelFilesResolver } from './resolvers/excel.resolver';
import { ExcelFilesService } from './services/excel.services';

import { ApplicationExceptions } from '../../common/utils/exceptions/application.exceptions';

@Module({
  imports: [],
  controllers: [],
  providers: [ApplicationExceptions, ExcelFilesResolver, ExcelFilesService],
  exports: [],
})
export class AttachmentsModule {}
