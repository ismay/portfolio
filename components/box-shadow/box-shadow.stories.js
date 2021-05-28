import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import BoxShadow from "./box-shadow";

const Placeholder = () => (
  <img
    alt="Placeholder"
    src={placeholderImage({ height: 400, width: 1500 })}
    style={{ display: "block", maxWidth: "100%" }}
  />
);

/**
 * Story configuration
 */

export default {
  component: BoxShadow,
  decorators: [
    (Story) => (
      <div style={{ padding: "25px" }}>
        <Story />
      </div>
    ),
  ],
  title: "BoxShadow",
};

const Template = (args) => <BoxShadow {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  children: <Placeholder />,
};
