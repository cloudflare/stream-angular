import { Injectable } from '@angular/core';

/**
 * We have to export this interface so the module can be compiled
 * with the AOT flag enabled.
 *
 * https://github.com/angular/angular/issues/14050
 */

@Injectable()
export class DocumentWrapper extends Document {}

export function getDocument(): DocumentWrapper {
  return document;
}
