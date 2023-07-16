import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@/configs/db.config';
import { UserModule } from '@/modules/user.module';
import { CustomExceptionFilter } from '@/helpers/exception-filter/custom-exception-filter';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource), UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
