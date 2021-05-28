import React from "react";
import Navigation from "./navigation";

export default {
  component: Navigation,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  title: "Navigation",
};

const Template = (args) => <Navigation {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});
