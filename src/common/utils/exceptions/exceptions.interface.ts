export interface IException {
  badRequestException(message: string): void;
  notFoundException(message: string): void;
  internalServerErrorException(message: string): void;
  forbiddenException(message: string): void;
  unauthorizedException(message: string): void;
}
