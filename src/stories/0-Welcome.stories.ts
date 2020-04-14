import { StreamAngularComponent } from 'projects/cloudflare/stream-angular/src/public-api';
import { IStory } from '@storybook/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { actions } from './actions';

const defaultVideoId = '644822f93dcddab3e9441587d184ca2f';

const moduleMetadata = {
  schemas: [NO_ERRORS_SCHEMA],
};

export default {
  title: 'Stream Player',
  decorators: [withKnobs],
  component: StreamAngularComponent,
};

export const src = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: text('src', defaultVideoId),
    controls: true,
  },
  moduleMetadata,
});

export const muted = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    muted: boolean('muted', true),
  },
  moduleMetadata,
});

export const preload = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    preload: boolean('preload', true),
  },
  moduleMetadata,
});

export const autoplay = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    autoplay: boolean('autoplay', true),
    ...actions,
  },
  moduleMetadata,
});

export const controls = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: boolean('controls', true),
  },
  moduleMetadata,
});

export const loop = (): IStory => ({
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    loop: boolean('loop', true),
  },
  moduleMetadata,
});

export const currentTime = (): IStory => ({
  component: StreamAngularComponent,
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
  component: StreamAngularComponent,
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
  component: StreamAngularComponent,
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
  component: StreamAngularComponent,
  props: {
    ...actions,
    src: defaultVideoId,
    controls: true,
    poster: `https://videodelivery.net/644822f93dcddab3e9441587d184ca2f/thumbnails/thumbnail.jpg?time=109s&height=1400`,
  },
  moduleMetadata,
});
