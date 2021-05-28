import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import ResponsiveImage from "./responsive-image";

export default {
  component: ResponsiveImage,
  title: "ResponsiveImage",
};

const Template = (args) => <ResponsiveImage {...args} />;

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
