import React from "react";
import UndecoratedLink from "./undecorated-link";

export default {
  component: UndecoratedLink,
  title: "UndecoratedLink",
};

const Template = (args) => <UndecoratedLink {...args} />;

/**
 * Default
 */

export const Default = Template.bind({});

Default.args = {
  children: "Link contents",
  href: "/",
  title: "The title",
};
