import * as React from "react"

function IconShare(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={props.width ? props.width + "px" : "19px"}
      height={props.height ? props.height + "px" : "21px"}
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlSpace="preserve"
      {...props}
    >
      <image
        width={props.width ? props.width : 19}
        height={props.height ? props.height : 21}
        x={0}
        y={0}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfmCBoHKQ/Sqzr6AAAFb0lEQVR42t2cv3biOBTGv/1T7HZOt9s5TxDTTTfQzTkUgScY06oBnoD4 CYBG52wFeYKQImfLON10aJ8gfgRtN9ttMYAt+8oWYEua+Sp8kR3/IulKulcC+EH0k+sXoMVD9HGH 6HAp8A9Sln1nIDzG9IRQVIpHtv1OQHiEDQlxlMCECeqLn12/uoIxw74WA4iw5zH1hUc1wjeIDYtu 2aRs8qZG+MwYA4irteJJjfA+Xs+8paf2FV9qZHPtHV6A8Bjh2TdFavPyAgSLi+6aFi886CM8wp78 QmKLNwD3GCEgSxT6ya+uMQCMSKvA+DAp2fEET+T40scJxIemdUfYJAb53IplGEMSpT7mH30ACQjb likvzjJs6+/0ASQibM8GFkU+gARtPMQHkJSwRQYW70AkYZvyoHjJA3XU8BBEfeGTQiyVMkty7H/L PzoeEHmMpbaPZEggAERYaKYwhQHRIQjvY9nU8muVsdv8wtHIzkMszlh/0HosXjgB4Q+YXu10JVZO QfhI03HP1UQd+62C8BAb9Ft51JbtVIO1zs4DLDBr6WFE8OEXSxgx/m6oiwwTfDXyYgSGlRoxcLMS a6yYBPgIm1o3IDGno40dgxi52R3m+dqDB5hpfNoJ1zqIgZsVmLOUuHOEj4hOjTGFwFu5e1sCMXCz EglbtfX3OgExcrMrJLpm4gWIkZtNMadj6t6A1M5mvynDvL61dwjCo9PLZfq80Tlu1joIj3FfijtJ 7PBc/p+e72YtgvBYu6ApNZDL3WznIEZ+Z4cJk7bd7FkgPMKr0XpBQNp2s2eAGGM0qwM3awzCA+xb Wfh05GZ1qi6sNi1gdOhmdSrVyAW5vKo6dbM6lWtketFTcnXuZnVSaoSHeNeWTIEGD2XFzeqkhkxH mlIJbtiADXCDRPukFW7dYZSb1h1ZZnJcXDKJBy6LUdkclT24gwDKNRISJbbqGpmtyDQA/S9wBtIn SlQzRY9EqcAvEEqyYslcv/RlIEHFErp+6WaQlChxX7F8dv3SzSCSKBHzfvGSx2RPeoNjKSHT4Z/4 RJQZDf97+XLAeCCdLxANfx+Kl6/uQExHdnlIggU1z7I8360BAfjrlWF/iysQVWWvlVz0lFx97PlS k6m1CcJS7K5+5gzvfGYbhFohvrcyTlue0He7Zre4xLouipJBNuaYEjuLXnKKwgQG+d40rVL0WA8T chjNtdDtnW5XdZHGuvhhhuQ4vXcVfzcGAXiAGJ8rjWeH53IezygyucW8u0ZmEI3nASIEiAAISL0n chs8bTs/0hzOzjDpwi23n7FylGDoJodosoGpZbfcXVbXJAmX6I8aeQNi7JYTusfwEFHhsJhoaopd 73yIsDzXLWucvsBjeVuzRRDA0C2vjwE+PsNC2yQL5RyA1O4vyZVhAoGnxvoTGFD1Ym+/VoilNrZ8 lDSaqkoMqtMdq7tMr95XmqPclmvF6gZmlrIe5g2zZRMF1XSUpR10uV6+DP/Cb/hw5WP+GP57DFF9 k6MNzEZuuV6l5uVobzwTbIDxVeHwQJ3ROdzkz3boIanpMRIrjDHGSlNGiUE7P/WmdcuF8YKHmsNi N3njcn7sgmVYE2ZZHPZYhgFZKwU45yCg82Tr0mExSR4W8wyEUlqxUIfFAv9BzpavIJGBRUlM+QCS Ejazw2LCL5CMsIUoJCd4gCdyRVMAcT6OAACnf7IiQ4IMQKjZWylYL7/w4fQ08EiChA2/O6CMPz40 LWB7wdReqikpL0CYvCDlV9ry6UUfAbT9RKeUDVSDFzUCAJrZFK0M47LJGxAmjVEExtU4ijdNCziM F/2GQimF4RkI0Big0+ZXvAOpCZmusXMaMr0YJzrsfZEQEE0piP8BCAC/JhW3ExQAAAAldEVYdGRh dGU6Y3JlYXRlADIwMjItMDgtMjZUMDc6NDE6MTUrMDA6MDAQOnoJAAAAJXRFWHRkYXRlOm1vZGlm eQAyMDIyLTA4LTI2VDA3OjQxOjE1KzAwOjAwYWfCtQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1h Z2VSZWFkeXHJZTwAAAAASUVORK5CYII="
      />
    </svg>
  )
}

export default IconShare
