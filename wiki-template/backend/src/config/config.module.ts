import { Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  static forRoot(options: { isGlobal: boolean }) {
    return {
      module: ConfigModule,
      global: options.isGlobal,
    };
  }
}
