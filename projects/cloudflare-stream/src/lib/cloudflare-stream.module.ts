import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CloudflareStreamComponent } from './cloudflare-stream.component';
import { DocumentWrapper, getDocument } from './document-wrapper';

@NgModule({
  declarations: [CloudflareStreamComponent],
  // Necessaary because we render a <stream /> element
  // and Angular will refuse to render this non-standard
  // element unless we use this.
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: DocumentWrapper, useFactory: getDocument }],
  imports: [],
  exports: [CloudflareStreamComponent],
})
export class CloudflareStreamModule {}
