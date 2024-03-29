import * as React from "react"

function IconLike(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.width ? props.width + "px" : "20px"}
      height={props.height ? props.height + "px" : "18px"}
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlSpace="preserve"
      {...props}
    >
      <image
        width={props.width ? props.width :20}
        height={props.height ? props.height : 18}
        x={0}
        y={0}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfmCBoLKQ/bscOeAAAC+klEQVR42u3by3XbMBAF0Jcc7cMSlA7YQaQKIlcQZYuNowoiV6B4g7Vc gdWBmApMV2CWgBKyUD7H4eBHDCCMD9/OoE3qejhDi6KBOXPmzMkX3egl7x7fX4eBM550y7nPd1di tAAM1qoXC/nLAC+lMOQVg5VSFDJiMFIKNjvJABo8cuy9GMTCAICl3oqBOBgA8EUIxMOAc1s9EC8D aARAAhhAVz0kiAEMlUMCGcBz1ZBgBtCnHy3blT2CAcXwKjJVJIbBUY9MkChGvRAnY0esMbQ6sCjK +ApDrHYcx2WuiJuhjvg0XuZ5P8IK8TKA1Wi94zk2I8TP0A2xva8MElANqh5Mrc4GCWKA6pCqKhLI oCpiuO6iMEBCGTk7hAESXA26Q35WAolgZO2QREgUg65IHZAYBtkhRg1ckIS/tfQ+ohp0PQa9wrT0 yrxemPyWRi/xEsGAPuDb1GORMehwr7o/X04/tTYxDNAVSUmDDc76rJtUyOcYBtkhHFnh6fLZ13QI 9cJs1eCvx78sLzfBF4A+BPy2HkYvsRl9z87KoK8hXGn1Xu0XANqA31fIFbh3bPMfISW32Je6id1m PUCjN2U+VlhlP0JbBpKzQ36H/S4KFbUjbwNNjt7j+/9rV3lgIEdmSG2ZIbVlhtQWmZAPbwWyeRMQ vcVytGgEQsgnVzpxEE29expULw6CW2LtTlyP6Abb0aLBSRyEvDd2VEYehGr0e0AYhBy8p8v9Y1EQ ez1EQSyDtxMHsQ1eYRD74BUGsQ9eaRBHowuCuAavKIivHkIg7sErCOIevGIgvsErBuIbvHIg3kYX AfEPXiGQsHpUDwkZvCIgIYNXACRs8AqAhA1eCZDARq8cEjp4L+H8eLrVvJKIevBCDrwOIuTgvWT6 qdVN/snpubNvmg4ZijMsgzcV8lAcYhm8iRDVFT65jL3RkyCw/aNRruzczwgnQNSAdTHKD8djhqkQ QPVYFzjBDG6U9zGpxCu76tUaNzhmm2EddvioTpn2PmfOHHn5BeeD6+KnCI1TAAAAJXRFWHRkYXRl OmNyZWF0ZQAyMDIyLTA4LTI2VDA5OjQxOjE1KzAyOjAwQNW+MgAAACV0RVh0ZGF0ZTptb2RpZnkA MjAyMi0wOC0yNlQwOTo0MToxNSswMjowMDGIBo4AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdl UmVhZHlxyWU8AAAAAElFTkSuQmCC"
      />
    </svg>
  )
}

export default IconLike