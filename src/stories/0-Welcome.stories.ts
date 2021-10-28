import { CloudflareStreamComponent } from 'projects/cloudflare-stream/src/public-api';
import { IStory } from '@storybook/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { actions } from './actions';
import {
  DocumentWrapper,
  getDocument,
} from '../../projects/cloudflare-stream/src/lib/document-wrapper';

const defaultVideoId = '644822f93dcddab3e9441587d184ca2f';

const moduleMetadata = {
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: DocumentWrapper, useFactory: getDocument }],
};

export default {
  title: 'Stream Player',
  decorators: [withKnobs],
  component: CloudflareStreamComponent,
};

export const src = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: text('src', defaultVideoId),
    controls: true,
  },
  moduleMetadata,
});

export const muted = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    muted: boolean('muted', true),
  },
  moduleMetadata,
});

export const preload = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    preload: boolean('preload', true),
  },
  moduleMetadata,
});

export const autoplay = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    autoplay: boolean('autoplay', true),
    muted: boolean('muted', true),
    ...actions,
  },
  moduleMetadata,
});

export const controls = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: boolean('controls', true),
  },
  moduleMetadata,
});

export const loop = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    loop: boolean('loop', true),
  },
  moduleMetadata,
});

export const currentTime = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    currentTime: number('currentTime', 0, {
      min: 0,
      max: 111,
      range: true,
      step: 1,
    }),
  },
  moduleMetadata,
});

export const volume = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    volume: number('volume', 0, {
      min: 0,
      max: 1,
      range: true,
      step: 0.1,
    }),
  },
  moduleMetadata,
});

export const fixedDimensions = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    width: '400px',
    height: '400px',
  },
  moduleMetadata,
});

export const poster = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    poster: text(
      'poster',
      'https://videodelivery.net/644822f93dcddab3e9441587d184ca2f/thumbnails/thumbnail.jpg?time=109s&height=1200'
    ),
  },
  moduleMetadata,
});

export const primaryColor = (): IStory => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    primaryColor: text('primaryColor', 'orange'),
  },
  moduleMetadata,
});

export const adUrl = () => ({
  component: CloudflareStreamComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    adUrl: text(
      'adUrl',
      'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator='
    ),
  },
  moduleMetadata,
});

adUrl.story = {
  decorators: [
    withKnobs({
      // Necessary to prevent adUrl from being escaped
      // https://github.com/storybookjs/storybook/issues/4445
      escapeHTML: false,
    }),
  ],
};
