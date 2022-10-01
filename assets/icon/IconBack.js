import * as React from "react"

function IconNext(props) {
    const renderColor = () => {
        if(props.page === 1){
            return "#FFA300";
        }else if(props.page === 2){
            return "#D75533";
        }else if(props.page === 3){
            return "#F9386A";
        }else if(props.page === 4){
            return "#0072D8";
        }
        else {
            return "#ffffff";
        }
    }
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      {...props}
    >
      <path d="M127.19 280.63H495v-61.25H127.19V127.5L5 250l122.19 122.5z" 
      fill= {renderColor()}
       />
    </svg>
  )
}

export default IconNext