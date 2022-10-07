import React from "react";
import Details from "./details";

export default {
  component: Details,
  title: "Details",
};

const Template = (args) => <Details {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  date: "2010-01-01",
  title: "The Title",
};

/**
 * Right aligned
 */

export const RightAligned = Template.bind({});

RightAligned.args = {
  date: "2010-01-01",
  isRightAligned: true,
  title: "The Title",
};
