import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CashFlowsModule } from './cash-flows/cash-flows.module';
import { CategoriesModule } from './categories/categories.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_CONNECT), UsersModule, AuthModule, CashFlowsModule, CategoriesModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
