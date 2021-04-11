import React from "react";
import { McBuildTitle } from "./McBuildTitle";

export default {
  title: "mc-build/McBuildTitle",
  component: McBuildTitle,
  args: {
    color: "red",
  },
  argTypes: {
    variant: {
      color: {
        type: "color",
      },
    },
  },
};
export const McBuildTitleStory = (props) => <McBuildTitle {...props}></McBuildTitle>;
