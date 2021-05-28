import placeholderImage from "@cloudfour/simple-svg-placeholder";
import React from "react";
import Cell from "./cell";
import Grid from "./grid";

const Placeholder = () => (
  <img
    alt="Placeholder"
    src={placeholderImage({ height: 1000, width: 2000 })}
    style={{ display: "block", maxWidth: "100%" }}
  />
);

/**
 * Story configuration
 */

export default {
  component: Grid,
  title: "Grid",
};

const Template = (args) => <Grid {...args} />;

/**
 * One column
 */

export const Columns1 = Template.bind({});

Columns1.args = {
  children: [1, 2].map((key) => (
    <Cell key={key} columns={1}>
      <Placeholder />
    </Cell>
  )),
};

Columns1.storyName = "1 Column";

/**
 * Two Columns
 */

export const Columns2 = Template.bind({});

Columns2.args = {
  children: [1, 2, 3].map((key) => (
    <Cell key={key} columns={2}>
      <Placeholder />
    </Cell>
  )),
};

Columns2.storyName = "2 Columns";

/**
 * Three Columns
 */

export const Columns3 = Template.bind({});

Columns3.args = {
  children: [1, 2, 3, 4, 5].map((key) => (
    <Cell key={key} columns={3}>
      <Placeholder />
    </Cell>
  )),
};

Columns3.storyName = "3 Columns";
