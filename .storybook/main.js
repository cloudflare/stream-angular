module.exports = {
  "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook"
  ],

  "framework": {
    name: "@storybook/angular",
    options: {}
  },

  docs: {}
}