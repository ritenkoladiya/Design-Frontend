import React from 'react'

const Input = (props) => {
  // console.log("props : ", props)

  return (
    <div>
      <input className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} name={props.name} />
    </div>
  )
}

export default Input