export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import * as nextImage from "next/image";
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    const { width, height } = props;
    const ratio = (height / width) * 100;
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: "relative",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          {...props}
        />
      </div>
    );
  },
});
