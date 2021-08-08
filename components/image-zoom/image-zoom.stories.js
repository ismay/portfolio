import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import ImageZoom from "./image-zoom";

export default {
  component: ImageZoom,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "250px" }}>
        <Story />
      </div>
    ),
  ],
  title: "ImageZoom",
};

const Template = (args) => <ImageZoom {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  alt: "Image title",
  amount: 1,
  height: 250,
  index: 1,
  src: placeholderImage({ height: 250, width: 400 }),
  width: 400,
};

/**
 * With margin
 */

export const WithMargin = Template.bind({});

WithMargin.args = {
  alt: "Image title",
  amount: 1,
  height: 250,
  index: 1,
  margin: 25,
  src: placeholderImage({ height: 250, width: 400 }),
  width: 400,
};
