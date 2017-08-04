import React from 'react'

const FormMessageList = (props) =>
    <ul className="FormMessageList" style={{
        margin: 'auto',
        minHeight: '10px'
    }}>
      {
        props.messages.map(error =>
          <li key={error.id || error.key} >
            {error.message}
          </li>
        )
      }
    </ul>

export default FormMessageList