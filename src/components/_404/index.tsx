import SampleProps from "./types";

const _404 = (props: SampleProps) => {
  return <div>Sample Component with name : {props.name ?? "hulk"}</div>;
};

export default _404;
