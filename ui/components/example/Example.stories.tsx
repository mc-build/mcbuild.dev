import React from "react";
import { Example } from "./Example";

export default {
  title: "mc-build/Example",
  component: Example,
  args: {
    color: "red",
  },
  argargTypes: {
    variant: {
      color: {
        type: "color",
      },
    },
  },
};
export const ExampleStory = (props) => <Example {...props}></Example>;
