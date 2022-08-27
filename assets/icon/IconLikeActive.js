import * as React from "react"

function IconLikeActive(props) {
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
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAANlBMVEUAAAAjS4YjS4YjS4Yj S4YjS4YjS4YjS4YjS4YjS4YjS4YjS4YjS4YjS4YjS4YjS4YjS4b///+cvNmvAAAAEHRSTlMAECDP 7zDfYL+fcEBQj4CvVKPZWwAAAAFiS0dEEeK1PboAAAAHdElNRQfmCBoLKQ/bscOeAAAB6ElEQVRo 3u3Z23KEIBAEUFRUvO78/9cmrgkITFygpnmJ8xRTwZPYHbFWpZ55JnOatoLR6R5vEKGVw0Arp4FV fg2k4gyioYJBNFYwyFQwSFcwiGoY8pcrNmiqYNBcwaClgkE1jK6CIZu7b8yQ3IP71Wq/FLwLh/fE DZB7dN+1x3L/75HR2IMNZqjVO8IYl0iEcuf2QbfF4wwXiUzu7H7uItlhxiWSFWa4SEjimZs3XCQS ue+scYmkW26mSTJa3rhEcj/6lbBrzryhukTkqPjHP8fwRpNufD8qf6qGZo1LJCnz3p43E449o/1B f/dLjeRndv+aXL7rI35+GZEco0uQrEiOWQuQvEjO82UjmZGUIamzP8iDPMjH2WogQwVktKtnHOLO 28OQ3i4eFAyZ7OIRhlye/xoY4h4LNwVDbH/Pp2UI4vr7UjDEBEsRiN9fEOL3F4ME/cUgQX8xSNBf CBL2F4KYeJ04EvUXgUT9BSBxfwFI3F8AEvdXHmH6K48YdpEswvVXHOH6K42w/ZVG2P5KI2x/hRG+ v4nIvKSN+evXSkGyJ3xXe4OYgtOfM6YjU8Hp36ObdGQpRaJXETdI6fXSbQ7S6gKCe91xh6i+RGHe 29wiqs++Ypr7+P4eUWqdhgzCzGmfaz/zH+YLLl3RoA/p1vEAAAAldEVYdGRhdGU6Y3JlYXRlADIw MjItMDgtMjZUMDk6NDE6MTUrMDI6MDBA1b4yAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA4LTI2 VDA5OjQxOjE1KzAyOjAwMYgGjgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwA AAAASUVORK5CYII="
      />
    </svg>
  )
}

export default IconLikeActive