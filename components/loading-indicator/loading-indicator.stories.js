import React from "react";
import LoadingIndicator from "./loading-indicator";

export default {
  component: LoadingIndicator,
  title: "LoadingIndicator",
};

const Template = (args) => <LoadingIndicator {...args} />;

/**
 * Enabled
 */

export const Enabled = Template.bind({});

Enabled.args = {
  isLoading: true,
};

/**
 * Disabled
 */

export const Disabled = Template.bind({});

Disabled.args = {
  isLoading: false,
};
