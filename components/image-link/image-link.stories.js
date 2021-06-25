import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import ImageLink from "./image-link";

export default {
  component: ImageLink,
  title: "ImageLink",
};

const Template = (args) => <ImageLink {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  children: (
    <img alt="Linked" src={placeholderImage({ height: 100, width: 200 })} />
  ),
  href: "/",
  title: "The title",
};
