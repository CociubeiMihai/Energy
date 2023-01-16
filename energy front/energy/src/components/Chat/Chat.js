import React from 'react'
import { SupportEngineStyle } from '../../styles/SupportEngineStyle'
import "../../styles/chat.css";


const Chat = props => {
    return(
        <div
        className='transition-5'
            style={{
                ...SupportEngineStyle.supportWindow,
                ...{opacity: props.visible ? '1' : '0'}
            }}
        >

        </div>
    )
}

export default Chat;