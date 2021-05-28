import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import ZoomImage from "./zoom-image";

export default {
  component: ZoomImage,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "250px", padding: "25px" }}>
        <Story />
      </div>
    ),
  ],
  title: "ZoomImage",
};

const Template = (args) => <ZoomImage {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  alt: "Image title",
  height: 250,
  src: placeholderImage({ height: 250, width: 400 }),
  width: 400,
};

/**
 * With margin
 */

export const WithMargin = Template.bind({});

WithMargin.args = {
  alt: "Image title",
  height: 250,
  margin: 100,
  src: placeholderImage({ height: 250, width: 400 }),
  width: 400,
};
