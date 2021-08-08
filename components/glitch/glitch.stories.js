import React from "react";
import Glitch from "./glitch";

const Child = () => (
  <div style={{ background: "red", height: "100vh", width: "100vw" }} />
);

/**
 * Story configuration
 */

export default {
  component: Glitch,
  parameters: {
    layout: "fullscreen",
  },
  title: "Glitch",
};

const Template = (args) => <Glitch {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  children: <Child />,
};
