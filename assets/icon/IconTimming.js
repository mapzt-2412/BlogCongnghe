import * as React from "react"

function IconTimming(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      {...props}
    >
      <image
        width={16}
        height={16}
        x={0}
        y={0}
        href="data:image/png;base64,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"
      />
    </svg>
  )
}

export default IconTimming