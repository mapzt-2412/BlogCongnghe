import * as React from "react"

function IconDark(props,{ isLight }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.602}
      height={17}
      viewBox="0 0 17.602 17"
      {...props}
    >
      <path
        data-name="Path 1158"
        d="M1333.269 466.157a8.845 8.845 0 01-4.27-16.6l.73-.4-.218.8a8.139 8.139 0 0011.5 9.4c.088-.044.174-.091.26-.138l.729-.4-.207.8a8.843 8.843 0 01-8.524 6.535z"
        transform="translate(-1324.398 -449.157)"
        fill={isLight ? "#9E9821" : "#fff"}
      />
    </svg>
  )
}

export default IconDark
