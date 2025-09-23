// config-definition.interface.ts

import { Type } from '@nestjs/common';

export interface ConfigDefinition<T = any> {
  token: string;
  clazz: Type<T>;
}
