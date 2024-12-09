import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

import {
  MESSAGE_HTTP_BAD_REQUEST,
  MESSAGE_HTTP_INTERNAL_ERROR,
} from '../../utils/common/message-http-error';
import { HttpError } from '../../utils/interfaces/http-error.interface';

@Module({
  imports: [
    GraphQL.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const env = configService.get<string>('NODE_ENV');
        const autoSchemaFile =
          env === 'development' ? join(process.cwd(), 'src/schema.gql') : true;

        const pluginApollo =
          env === 'development'
            ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
            : ApolloServerPluginLandingPageDisabled();

        const config = {
          autoSchemaFile,
          path: '/api/v1',
          playground: false,
          plugins: [pluginApollo],
          formatError: (error: GraphQLError): HttpError => {
            const originalError = error.extensions?.originalError as HttpError;

            let myFullError = {};
            if (env === 'development') {
              myFullError = {
                fullError: error,
              };
            }

            if (!originalError && error.extensions?.code === 'BAD_USER_INPUT') {
              return {
                message: MESSAGE_HTTP_BAD_REQUEST.message,
                error: MESSAGE_HTTP_BAD_REQUEST.error,
                statusCode: MESSAGE_HTTP_BAD_REQUEST.statusCode,
                ...myFullError,
              };
            }

            if (!originalError) {
              return {
                message: MESSAGE_HTTP_INTERNAL_ERROR.message,
                error: MESSAGE_HTTP_INTERNAL_ERROR.error,
                statusCode: MESSAGE_HTTP_INTERNAL_ERROR.statusCode,
                ...myFullError,
              };
            }

            return {
              message: originalError.message,
              error: originalError.error,
              statusCode: originalError.statusCode,
              ...myFullError,
            };
          },
        };
        return config;
      },
    }),
  ],
  providers: [],
  exports: [GraphQL],
})
export class GraphqlModule {}
