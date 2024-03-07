import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PassportConfigModuleModule } from './passport-config-module/passport-config-module.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRoot(DataSourceConfig),
        UsersModule,
        ProjectsModule,
        AuthModule,
        PassportConfigModuleModule,
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {}
