import { forwardRef, HTMLProps, useLayoutEffect, useState } from "react";

const MIN_TEXTAREA_HEIGHT = 25;
const AutoHeightTextarea = (
  {
    className,
    minHeight = 0,
    ...rest
  }: HTMLProps<HTMLTextAreaElement> & { minHeight?: number },
  textareaRef: any
) => {
  // const textareaRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const onChange = (event: any) => setValue(event.target.value);

  useLayoutEffect(() => {
    if (textareaRef?.current) {
      // Reset height - important to shrink on delete
      textareaRef.current.style.height = "inherit";
      // Set height
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [value, textareaRef]);
  return (
    <textarea
      onChange={onChange}
      ref={textareaRef}
      className={className}
      maxLength={1000}
      rows={1}
      style={{
        minHeight: minHeight || MIN_TEXTAREA_HEIGHT,
        resize: "none",
      }}
      {...rest}
    />
  );
};

export default forwardRef(AutoHeightTextarea);
