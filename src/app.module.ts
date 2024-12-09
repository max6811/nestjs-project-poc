import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { GraphqlModule } from './common/modules/graphql/graphql.module';
import { AttachmentsModule } from './modules/attachments/attachment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      ],
    }),
    GraphqlModule,
    AttachmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
