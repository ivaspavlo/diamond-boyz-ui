import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(address: string | null, config: string): string {
    if (!address) {
      return ''
    }

    if (!config) {
      return address
    }

    const [prefixLength, suffixLength] = config.split(':');

    let prefix = '';
    let suffix = '';

    if (+prefixLength > 0) {
      prefix = address.substr(0, +prefixLength);
    }

    if (+suffixLength > 0) {
      suffix = address.substr(address.length - (+suffixLength), +suffixLength)
    }

    return `${prefix}...${suffix}`;
  }
}
