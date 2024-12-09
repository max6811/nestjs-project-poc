import { HttpStatus } from '@nestjs/common';

export const MESSAGE_HTTP_INTERNAL_ERROR = {
  message: 'Hemos tenido problemas internos.',
  error: 'Internal Server Error',
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
};

export const MESSAGE_HTTP_BAD_REQUEST = {
  message: 'El tipo de dato no es correcto.',
  error: 'Bad Request',
  statusCode: HttpStatus.BAD_REQUEST,
};
