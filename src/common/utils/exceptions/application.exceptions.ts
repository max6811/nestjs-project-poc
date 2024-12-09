import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException } from './exceptions.interface';

@Injectable()
export class ApplicationExceptions implements IException {
  public badRequestException(message: string): void {
    throw new BadRequestException(message);
  }

  public notFoundException(message: string): void {
    throw new NotFoundException(message);
  }

  public internalServerErrorException(message?: string): void {
    throw new InternalServerErrorException(message);
  }

  public forbiddenException(message?: string): void {
    throw new ForbiddenException(message);
  }

  public unauthorizedException(message?: string): void {
    throw new UnauthorizedException(message);
  }
}
