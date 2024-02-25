import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// const rootPath = process.env.NODE_ENV === 'development'
//   ? join(__dirname, '../../../apps/frontend/dist')
//   : join(__dirname, '../../apps/frontend/dist');

const rootPath = process.env.NODE_ENV === 'development'
  ? join(__dirname, '../../../apps/frontend/dist')
  : join(__dirname, '../../frontend/dist');

console.log('rootPath:', rootPath);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/'),
      exclude: ['api/*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
