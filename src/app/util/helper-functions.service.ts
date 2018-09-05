import { Injectable } from '@angular/core';

@Injectable()
export class HelperFunctionsService {

  constructor() { }

  checkEmpty(object: {}): boolean {
    return Object.keys(object).length > 0
  }
}
