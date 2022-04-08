import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudflareStreamComponent } from './cloudflare-stream.component';
import { getDocumentWrapper, DocumentWrapper } from './document-wrapper';

describe('CloudflareStreamComponent', () => {
  let component: CloudflareStreamComponent;
  let fixture: ComponentFixture<CloudflareStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloudflareStreamComponent],
      providers: [{ provide: DocumentWrapper, useFactory: getDocumentWrapper }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudflareStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
