import * as React from "react"

function IconComment(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.width ? props.width + "px" : "21px"}
      height={props.height ? props.height + "px" : "21px"}
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlSpace="preserve"
      {...props}
    >
      <image
        width={props.width ? props.width : 21}
        height={props.height ? props.height : 21}
        x={0}
        y={0}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfmCBoLKQ/bscOeAAACD0lEQVR42u3azW3CMBwF8AdigIzACNmgZQLaCRquvlSdoGKC9uRrYALY oB2BEcIG2aA9IMpX7DhuiP/P8rsgIRLeT3YU4wBEktHhRWcoMA9dBkCFtfr2hugcG0xDG/6yUKvu B40BQBQDKPWTF0QXohgA8O4FwUPo3jfJ/SDT0L37yDh0gQRJEOGZGN5fYT1Yh697QvZ+CwWf6F7O Es3UShBpSRBpSRBpmfz/FMNEZ42L+0pVZBDkzSsAXeFNbWOYWlNsdBEDBAA+dBYHJEMRBwSIZEQQ yzWSIAKTINKSINKSINKSINKSINKSINKSINISDaR1X0sXeAldsgeILlCGrugW69TiYVghTAwLhIth vkbmPn9sCRnTiJAxpN5HVnFAaixjgHxjdnwK1SXuT6xqLFDfnVGrnd+BrpAaM9+vGCZuU0s8ww1C wHCBUDDaISSMNggNww4hYtggVAwzhIxhuiE2MvRP6LK2NI0I3Wg0QygZtxBSxjWElnEJIWacQ6gZ Jwg54wihZxwgETCACaCeQ5foI112UXahy/YF8dhtEglRW3yGrmvOqNvH9SNekQ3YL3PchV52hAwf XaJwgcjbMr2KWrhtaYuHuFIIIG4UCogLhQTSTqGBtFGIIHYKFcRGIYOYKXQQE4UQ0kyhhDRRSCG3 FFrINYUYckmhhpxTyCEnivhfiC7RJfahO/RFyX8BSal+1+1gOsQAAAAldEVYdGRhdGU6Y3JlYXRl ADIwMjItMDgtMjZUMDk6NDE6MTUrMDI6MDBA1b4yAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA4 LTI2VDA5OjQxOjE1KzAyOjAwMYgGjgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJ ZTwAAAAASUVORK5CYII="
      />
    </svg>
  )
}

export default IconComment
