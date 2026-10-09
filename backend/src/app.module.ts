import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from './movie/movie.module';
import { Movie } from './movie/movie.entity';
import { Admin } from './admin/admin.entity';
import { AdminModule } from './admin/admin.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './subscription/subscription.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'mydatabase',

      entities: [Movie, Admin, Subscription, User],

      synchronize: false,

      ssl: isProduction ? { rejectUnauthorized: true } : false,
    }),

    MoviesModule,
    AdminModule,
    SubscriptionModule,
    UserModule,
  ],
})
export class AppModule {}
