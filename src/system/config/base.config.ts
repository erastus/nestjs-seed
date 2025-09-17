import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseConfig {
  constructor(public readonly dotEnv: ConfigService) {}
}
