import React from "react";
import { Button, ButtonType } from "./Button";

export default {
  title: "mc-build/Button",
  component: Button,
};
export const ButtonStory = (props) => <Button {...props}></Button>;
export const ButtonWithContent = (props) => <Button {...props}>BUTTON</Button>;
export const ButtonsWithContent = () => (
  <>
    <Button type={ButtonType.FULL}>Docs</Button>
    <Button type={ButtonType.EMPTY}>Discord</Button>
  </>
);
