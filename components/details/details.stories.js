import React from "react";
import Details from "./details";

export default {
  component: Details,
  title: "Details",
};

const Template = (args) => <Details {...args} />;

/**
 * Minimal
 */

export const Minimal = Template.bind({});

Minimal.args = {
  date: "2010-01-01",
  title: "The Title",
};

/**
 * With medium
 */

export const WithMedium = Template.bind({});

WithMedium.args = {
  date: "2010-01-01",
  medium: "Photography",
  title: "The Title",
};

/**
 * With dimensions
 */

export const WithDimensions = Template.bind({});

WithDimensions.args = {
  date: "2010-01-01",
  dimensions: "10 x 10 cm",
  title: "The Title",
};

/**
 * All
 */

export const All = Template.bind({});

All.args = {
  date: "2010-01-01",
  dimensions: "10 x 10 cm",
  medium: "Photography",
  title: "The Title",
};

/**
 * Right aligned
 */

export const RightAligned = Template.bind({});

RightAligned.args = {
  date: "2010-01-01",
  dimensions: "10 x 10 cm",
  isRightAligned: true,
  medium: "Photography",
  title: "The Title",
};
