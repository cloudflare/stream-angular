import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StreamAngularComponent } from './stream-angular.component';

@NgModule({
  declarations: [StreamAngularComponent],
  // Necessaary because we render a <stream /> element
  // and Angular will refuse to render this non-standard
  // element unless we use this.
  schemas: [NO_ERRORS_SCHEMA],
  imports: [],
  exports: [StreamAngularComponent],
})
export class StreamAngularModule {}
