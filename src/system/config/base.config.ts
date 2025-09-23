import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BaseConfig {
  private baseProps: string[];

  constructor(public readonly dotEnv: ConfigService) {
    Object.defineProperty(this, 'baseProps', {
      value: Object.keys(this),
      enumerable: false,
    });
  }

  public overrideWithEnv() {
    const properties = Object.keys(this).filter(
      (key) => !this.baseProps.includes(key),
    );
    const prefix = this.constructor.name;
    const shortPrefix = (
      prefix.endsWith('Config') ? prefix.slice(0, -'Config'.length) : prefix
    ).toLowerCase();

    for (const property of properties) {
      this.initEnvValue((this as any)[property], property, prefix, shortPrefix);
    }
  }

  protected initEnvValue(
    property: any,
    name: any,
    prefix: string,
    shortPrefix: string,
  ): void {
    if (Array.isArray(property) || (property && typeof property === 'object')) {
      for (const key of Object.keys(property)) {
        this.initEnvValue(property[key], `${name}.${key}`, prefix, shortPrefix);
      }
    }

    let value: any = this.getEnvValue(name, prefix, shortPrefix);
    if (value === undefined || value === null) {
      return;
    }

    if (value === 'false') {
      value = false;
    } else if (value === 'true') {
      value = true;
    }

    if (typeof value === 'boolean') {
      (this as any)[name] = value;

      return;
    }

    value = value
      .toString()
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (typeof property === 'number' && Number.isInteger(property)) {
      value = parseInt(value, 10);
    } else if (typeof property === 'number') {
      value = parseFloat(value);
    }

    // If the default value of the property is `null` and the type is not
    // `string`, TypeError will happen.
    (this as any)[name] = value;
  }

  protected getEnvValue(
    property: string,
    prefix: string,
    shortPrefix: string,
  ): string | null {
    const underscoreProperty = property.replace(/\./g, '_');

    const candidates = [
      `${shortPrefix}.${property}`,
      `${shortPrefix}_${underscoreProperty}`,
      `${prefix}.${property}`,
      `${prefix}_${underscoreProperty}`,
    ];

    for (const key of candidates) {
      const value = this.dotEnv.get(key);
      if (value !== undefined) {
        return value;
      }
    }

    return null;
  }
}
