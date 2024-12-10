import { Injectable, Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { ApplicationExceptions } from '../../../common/utils/exceptions/application.exceptions';

@Injectable()
export class ExcelFilesService {
  constructor(private exception: ApplicationExceptions) {}

  async getGeneratedStyledExcel(user: string): Promise<string> {
    Logger.log(user);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Factura');

    worksheet.mergeCells('A1:D1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Factura';
    titleCell.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4CAF50' },
    };

    worksheet.getCell('A2').value = 'Cliente:';
    worksheet.getCell('B2').value = 'Juan Pérez';
    worksheet.mergeCells('B2:D2');
    worksheet.getCell('B2').alignment = { horizontal: 'left' };

    worksheet.getCell('A3').value = 'Fecha:';
    worksheet.getCell('B3').value = '2024-12-09';
    worksheet.mergeCells('B3:D3');
    worksheet.getCell('B3').alignment = { horizontal: 'left' };

    worksheet.getRow(5).values = [
      'Producto',
      'Cantidad',
      'Precio Unitario',
      'Total',
    ];
    worksheet.getRow(5).font = { bold: true };
    worksheet.getRow(5).alignment = { horizontal: 'center' };

    worksheet.eachRow((row, rowNumber) => {
      Logger.log(rowNumber);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // const imageId = workbook.addImage({
    //   filename: 'logo.png',
    //   extension: 'png',
    // });
    // worksheet.addImage(imageId, 'E1:G3');

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    Logger.warn('end service...');
    Logger.warn(base64);
    return base64;
  }
}
