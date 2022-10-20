import * as React from "react"

function IconChatBox(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0C.9 0 .01.9.01 2L0 20l4-4h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2zm0 2h16v12H3.17L2 15.17V2zm10 8H4v2h8v-2zM4 7h12v2H4V7zm12-3H4v2h12V4z"
        fill="#fff"
      />
    </svg>
  )
}

export default IconChatBox
