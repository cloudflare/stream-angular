import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

const propertyProps = [
  'autoplay',
  'controls',
  'currentTime',
  'muted',
  'loop',
  'volume',
  'preload',
];

@Component({
  selector: 'cf-stream',
  template: `
    <stream
      #streamEl
      [attr.ad-url]="adUrl"
      [attr.src]="src"
      [attr.autoplay]="autoplay"
      [attr.controls]="controls"
      [attr.loop]="loop"
      [attr.preload]="preload"
      [attr.height]="height"
      [attr.width]="width"
      [attr.poster]="poster"
      [attr.muted]="muted"
      (play)="play.emit($event)"
      (abort)="abort.emit($event)"
      (canplay)="canplay.emit($event)"
      (canplaythrough)="canplaythrough.emit($event)"
      (durationchange)="durationchange.emit($event)"
      (ended)="ended.emit($event)"
      (error)="error.emit($event)"
      (loadeddata)="loadeddata.emit($event)"
      (loadedmetadata)="loadedmetadata.emit($event)"
      (loadstart)="loadstart.emit($event)"
      (pause)="pause.emit($event)"
      (play)="play.emit($event)"
      (playing)="playing.emit($event)"
      (progress)="progress.emit($event)"
      (ratechange)="ratechange.emit($event)"
      (seeked)="seeked.emit($event)"
      (seeking)="seeking.emit($event)"
      (stalled)="stalled.emit($event)"
      (suspend)="suspend.emit($event)"
      (timeupdate)="timeupdate.emit($event)"
      (volumechange)="volumechange.emit($event)"
      (waiting)="waiting.emit($event)"
      (stream-adstart)="streamAdStart.emit($event)"
      (stream-adend)="streamAdEnd.emit($event)"
      (stream-adtimeout)="streamAdTimeout.emit($event)"
    ></stream>
  `,
  styles: [],
})
export class StreamAngularComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  streamScript?: HTMLScriptElement;

  @Input() adUrl: string;
  @Input() src: string;
  @Input() height: string;
  @Input() width: string;
  @Input() poster: string;

  @Input() autoplay: boolean;
  @Input() controls: boolean;
  @Input() currentTime: number;
  @Input() muted: boolean;
  @Input() loop: boolean;
  @Input() volume: number;
  @Input() preload: 'auto' | 'metadata' | 'none' | boolean;

  // tslint:disable: no-output-native
  @Output() abort = new EventEmitter<CustomEvent>();
  @Output() canplay = new EventEmitter<CustomEvent>();
  @Output() canplaythrough = new EventEmitter<CustomEvent>();
  @Output() durationchange = new EventEmitter<CustomEvent>();
  @Output() ended = new EventEmitter<CustomEvent>();
  @Output() error = new EventEmitter<CustomEvent>();
  @Output() loadeddata = new EventEmitter<CustomEvent>();
  @Output() loadedmetadata = new EventEmitter<CustomEvent>();
  @Output() loadstart = new EventEmitter<CustomEvent>();
  @Output() pause = new EventEmitter<CustomEvent>();
  @Output() play = new EventEmitter<CustomEvent>();
  @Output() playing = new EventEmitter<CustomEvent>();
  @Output() progress = new EventEmitter<CustomEvent>();
  @Output() ratechange = new EventEmitter<CustomEvent>();
  @Output() seeked = new EventEmitter<CustomEvent>();
  @Output() seeking = new EventEmitter<CustomEvent>();
  @Output() stalled = new EventEmitter<CustomEvent>();
  @Output() suspend = new EventEmitter<CustomEvent>();
  @Output() timeupdate = new EventEmitter<CustomEvent>();
  @Output() volumechange = new EventEmitter<CustomEvent>();
  @Output() waiting = new EventEmitter<CustomEvent>();
  @Output() streamAdStart = new EventEmitter<CustomEvent>();
  @Output() streamAdEnd = new EventEmitter<CustomEvent>();
  @Output() streamAdTimeout = new EventEmitter<CustomEvent>();

  @ViewChild('streamEl') streamEl;

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnChanges(c: SimpleChanges) {
    if (!this.streamEl) {
      return;
    }
    this.syncProperties(
      Object.entries(c).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value.currentValue,
        }),
        {}
      )
    );
  }

  syncProperties(properties) {
    propertyProps.forEach((prop) => {
      if (properties.hasOwnProperty(prop)) {
        this.streamEl.nativeElement[prop] = properties[prop];
      }
    });
  }

  ngAfterViewInit() {
    this.syncProperties(
      propertyProps.reduce((acc, prop) => ({ ...acc, [prop]: this[prop] }), {})
    );
    this.loadStreamScript();
  }

  private loadStreamScript() {
    this.streamScript = document.createElement('script');
    this.streamScript.setAttribute('data-cfasync', 'false');
    this.streamScript.setAttribute('defer', 'true');
    this.streamScript.setAttribute('type', 'text/javascript');
    this.streamScript.setAttribute(
      'src',
      'https://embed.videodelivery.net/embed/r4xu.fla9.latest.js'
    );
    this.renderer2.appendChild(this.doc.body, this.streamScript);
  }

  private cleanUpStreamScript() {
    this.renderer2.removeChild(this.doc.body, this.streamScript);
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.cleanUpStreamScript();
  }
}
