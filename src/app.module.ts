import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyCardsModule } from './key-cards/key-cards.module';
import { KeyCard } from './key-cards/entities/key-card.entity';
import { Batch } from './key-cards/entities/batch.entity';
import { APP_GUARD } from '@nestjs/core';
import { KeyCardGuard } from './guards/key-card.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1.14.200.102',
      port: 3307,
      username: 'shangyin',
      password: '111111qq',
      database: 'shangyin',
      entities: [KeyCard, Batch],
      synchronize: true, // 开发环境使用，生产环境不建议
    }),
    KeyCardsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局卡密验证守卫
    {
      provide: APP_GUARD,
      useClass: KeyCardGuard,
    },
  ],
})
export class AppModule {}
