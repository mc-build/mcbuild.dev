import React from "react";
import { McBuildVersion } from "./McBuildVersion";

export default {
  title: "mc-build/McBuildVersion",
  component: McBuildVersion,
  args: {
    prefix: "v",
  },
};
export const McBuildVersionStory = (props) => (
  <McBuildVersion {...props}></McBuildVersion>
);
