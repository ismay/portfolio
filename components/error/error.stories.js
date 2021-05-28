import React from "react";
import Error from "./error";

export default {
  component: Error,
  title: "Error",
};

const Template = (args) => <Error {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  message: "Something went wrong",
  statusCode: "500",
};
