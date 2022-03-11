import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CloudflareStreamComponent } from '../projects/cloudflare-stream/src/public-api';
import {
  DocumentWrapper,
  getDocument,
} from '../projects/cloudflare-stream/src/lib/document-wrapper';

const parameters = {
  src: '5d5bc37ffcf54c9b82e996823bffbb81',
  volume: 1,
  currentTime: 0,
  controls: true,
};

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Stream',
  component: CloudflareStreamComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    volume: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    currentTime: {
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 1,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [{ provide: DocumentWrapper, useFactory: getDocument }],
    }),
  ],
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<CloudflareStreamComponent> = (
  props: CloudflareStreamComponent
) => ({
  props,
});

export const Default = Template.bind({});
Default.args = {
  ...parameters,
};

export const Muted = Template.bind({});
Muted.args = {
  ...parameters,
  muted: true,
};

export const Preload = Template.bind({});
Preload.args = {
  ...parameters,
  preload: true,
};

export const Autoplay = Template.bind({});
Autoplay.args = {
  ...parameters,
  muted: true,
  autoplay: true,
};

export const Loop = Template.bind({});
Loop.args = {
  ...parameters,
  loop: true,
};
