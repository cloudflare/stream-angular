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
import { DocumentWrapper } from './document-wrapper';

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
  selector: 'cloudflare-stream',
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
export class CloudflareStreamComponent
  implements OnDestroy, AfterViewInit, OnChanges {
  // place to store reference to the script tag added to the dom
  private streamScript?: HTMLScriptElement;

  /**
   * URL to a VAST advertising tag. If specified, the player will attempt to display ads speficied by the VAST ad schema.
   */
  @Input() adUrl: string;
  /**
   * Tells the browser to immediately start downloading the video and play it as soon as it can. Note that mobile browsers generally do not support this attribute, the user must tap the screen to begin video playback. Please consider mobile users or users with Internet usage limits as some users don’t have unlimited Internet access before using this attribute.
   *
   * To disable video autoplay, the autoplay attribute needs to be removed altogether as this attribute. Setting autoplay="false" will not work; the video will autoplay if the attribute is there in the <stream> tag.
   *
   * In addition, some browsers now prevent videos with audio from playing automatically. You may add the mute attribute to allow your videos to autoplay. For more information, [go here](https://webkit.org/blog/6784/new-video-policies-for-ios/).
   */
  @Input() autoplay: boolean;
  /**
   * Shows the default video controls such as buttons for play/pause, volume controls. You may choose to build buttons and controls that work with the player.
   */
  @Input() controls: boolean;
  /**
   * Returns the current playback time in seconds. Setting this value seeks the video to a new time.
   */
  @Input() currentTime: number;
  /**
   * The height of the video’s display area, in CSS pixels.
   */
  @Input() height: string;
  /**
   * A Boolean attribute; if included the player will automatically seek back to the start upon reaching the end of the video.
   */
  @Input() loop: boolean;
  /**
   * A Boolean attribute which indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced.
   */
  @Input() muted: boolean;
  /**
   * A URL for an image to be shown before the video is started or while the video is downloading. If this attribute isn’t specified, a thumbnail image of the video is shown.
   */
  @Input() poster: string;
  /**
   * This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. You may choose to include this attribute as a boolean attribute without a value, or you may specify the value preload="auto" to preload the beginning of the video. Not including the attribute or using preload="metadata" will just load the metadata needed to start video playback when requested.
   *
   * The <video> element does not force the browser to follow the value of this attribute; it is a mere hint. Even though the preload="none" option is a valid HTML5 attribute, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligable.
   */
  @Input() preload: 'auto' | 'metadata' | 'none' | boolean;
  /**
   * Either the video id or the signed url for the video you’ve uploaded to Cloudflare Stream should be included here.
   */
  @Input() src: string;
  /**
   * Sets volume from 0.0 (silent) to 1.0 (maximum value)
   */
  @Input() volume: number;
  /**
   * The width of the video’s display area, in CSS pixels.
   */
  @Input() width: string;

  // tslint:disable: no-output-native
  /**
   * Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
   */
  @Output() abort = new EventEmitter<CustomEvent>();
  /**
   * Sent when enough data is available that the media can be played, at least for a couple of frames.
   */
  @Output() canplay = new EventEmitter<CustomEvent>();
  /**
   * Sent when the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
   */
  @Output() canplaythrough = new EventEmitter<CustomEvent>();
  /**
   * The metadata has loaded or changed, indicating a change in duration of the media. This is sent, for example, when the media has loaded enough that the duration is known.
   */
  @Output() durationchange = new EventEmitter<CustomEvent>();
  /**
   * Sent when playback completes.
   */
  @Output() ended = new EventEmitter<CustomEvent>();
  /**
   * Sent when an error occurs. (e.g. the video has not finished encoding yet, or the video fails to load due to an incorrect signed URL)
   */
  @Output() error = new EventEmitter<CustomEvent>();
  /**
   * The first frame of the media has finished loading.
   */
  @Output() loadeddata = new EventEmitter<CustomEvent>();
  /**
   * The media’s metadata has finished loading; all attributes now contain as much useful information as they’re going to.
   */
  @Output() loadedmetadata = new EventEmitter<CustomEvent>();
  /**
   * Sent when loading of the media begins.
   */
  @Output() loadstart = new EventEmitter<CustomEvent>();
  /**
   * Sent when the playback state is changed to paused (paused property is true).
   */
  @Output() pause = new EventEmitter<CustomEvent>();
  /**
   * Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
   */
  @Output() play = new EventEmitter<CustomEvent>();
  /**
   * Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking.
   */
  @Output() playing = new EventEmitter<CustomEvent>();
  /**
   * Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element’s buffered attribute.
   */
  @Output() progress = new EventEmitter<CustomEvent>();
  /**
   * Sent when the playback speed changes.
   */
  @Output() ratechange = new EventEmitter<CustomEvent>();
  /**
   * Sent when a seek operation completes.
   */
  @Output() seeked = new EventEmitter<CustomEvent>();

  /**
   * Sent when a seek operation begins.
   */
  @Output() seeking = new EventEmitter<CustomEvent>();
  /**
   * Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
   */
  @Output() stalled = new EventEmitter<CustomEvent>();
  /**
   * Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
   */
  @Output() suspend = new EventEmitter<CustomEvent>();
  /**
   * The time indicated by the element’s currentTime attribute has changed.
   */
  @Output() timeupdate = new EventEmitter<CustomEvent>();
  /**
   * Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
   */
  @Output() volumechange = new EventEmitter<CustomEvent>();
  /**
   * Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
   */
  @Output() waiting = new EventEmitter<CustomEvent>();
  /**
   * Fires when ad-url attribute is present and the ad begins playback
   */
  @Output() streamAdStart = new EventEmitter<CustomEvent>();
  /**
   * Fires when ad-url attribute is present and the ad finishes playback
   */
  @Output() streamAdEnd = new EventEmitter<CustomEvent>();
  /**
   * Fires when ad-url attribute is present and the ad took too long to load.
   */
  @Output() streamAdTimeout = new EventEmitter<CustomEvent>();

  @ViewChild('streamEl') streamEl;

  constructor(
    private renderer2: Renderer2,
    @Inject(DocumentWrapper) private doc: DocumentWrapper
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
      propertyProps.reduce(
        (acc, prop) =>
          // skip values that are undefined
          this[prop] === undefined ? acc : { ...acc, [prop]: this[prop] },
        {}
      )
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

  ngOnDestroy() {
    this.cleanUpStreamScript();
  }
}
