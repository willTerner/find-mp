declare module "*.module.scss" {
    const content: { [className: string]: string };
    export default content;
}
  
declare module '*.png' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
}

  