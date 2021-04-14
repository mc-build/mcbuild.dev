/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.png" {
  const url: string;
  export default url;
}

declare module "*.svg" {
  const svgrComponent: React.FC<{
    width?: number;
    height?: number;
  }>;
  export default svgrComponent;
}
