import React, {useState} from 'react'
import { SupportEngineStyle } from '../../styles/SupportEngineStyle'
import "../../styles/chat.css";

const Avatar = props => {

    const [hovered,setHovered] = useState(false)

  return (
    <div style={ props.style}>
        <div 
            className='transition-3'
            style={{
                ...SupportEngineStyle.avatarHello,
                ...{ opacity: hovered ? '1' : '0'}
            }}
        > 
            Hi it's Mihai!!
        </div>

        <div
            className='transition-3'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => props.onClick & props.onClick()}
            style={{
                ...SupportEngineStyle.chatWithMeButton,
                ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0'}
            }}
        />
    </div>
  )
}

export default Avatar