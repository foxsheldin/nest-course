import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      /* FIXME: Лучше использовать асинхронные методы работы с файлами
      Есть нюансы при их реализации */
      const fileName = `${uuid.v4()}.${file.mimetype.split('/')[1]}`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
