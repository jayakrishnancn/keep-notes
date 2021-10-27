import { forwardRef, HTMLProps, useLayoutEffect, useState } from "react";

const AutoHeightTextarea = (
  { className, ...rest }: HTMLProps<HTMLTextAreaElement>,
  textareaRef: any
) => {
  const MIN_TEXTAREA_HEIGHT = 20;
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
      rows={1}
      style={{
        minHeight: MIN_TEXTAREA_HEIGHT,
        resize: "none",
      }}
      {...rest}
    />
  );
};

export default forwardRef(AutoHeightTextarea);
