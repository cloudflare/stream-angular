import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
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
  // attr. prefix is required for our attributes since <stream /> is a non-standard
  // element and angular will not bind the attributes without it.
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
  implements OnDestroy, AfterViewInit, OnChanges {
  // place to store reference to the script tag added to the dom
  private streamScript?: HTMLScriptElement;

  @Input() adUrl: string;
  @Input() autoplay: boolean;
  @Input() controls: boolean;
  @Input() currentTime: number;
  @Input() height: string;
  @Input() loop: boolean;
  @Input() muted: boolean;
  @Input() poster: string;
  @Input() preload: 'auto' | 'metadata' | 'none' | boolean;
  @Input() src: string;
  @Input() volume: number;
  @Input() width: string;

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

  ngOnChanges(changes: SimpleChanges) {
    // ngOnChanges fires when the component mounts but before the view
    // is initialized, so we need to bail when this fires for the first
    // time.
    if (!this.streamEl) {
      return;
    }
    // convert SimpleChanges into a Record that has currentValues to be
    // synced onto streamEl
    this.syncProperties(
      Object.keys(changes).reduce(
        (acc, key) => ({
          ...acc,
          [key]: changes[key].currentValue,
        }),
        {}
      )
    );
  }

  /**
   * Method to take an object and sync keys from propertyProps onto
   * the stream element
   */
  private syncProperties(properties: Record<string, any>) {
    // iterate over the propertyProps and assign them to the streamEl
    propertyProps.forEach((prop) => {
      // only assign the property if it is present
      if (properties.hasOwnProperty(prop)) {
        this.streamEl.nativeElement[prop] = properties[prop];
      }
    });
  }

  ngAfterViewInit() {
    // streamEl is first available within ngAfterViewInit, so we need to sync
    // properties onto the element
    this.syncProperties(
      // pluck current propertyProps off of the component instance to sync them to streamEl
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
    this.renderer2.appendChild(this.doc.head, this.streamScript);
  }

  private cleanUpStreamScript() {
    this.renderer2.removeChild(this.doc.head, this.streamScript);
  }

  public ngOnDestroy() {
    this.cleanUpStreamScript();
  }
}
