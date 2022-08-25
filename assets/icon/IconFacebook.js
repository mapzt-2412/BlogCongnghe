import * as React from "react"

function IconFacebook(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      {...props}
    >
      <image
        width={32}
        height={32}
        x={0}
        y={0}
        href="data:image/png;base64,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"
      />
    </svg>
  )
}

export default IconFacebook