import { usePage } from '@inertiajs/react'
import React from 'react'

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedconversations = page.props.selectedconversations;
    console.log(conversations)
    console.log(selectedconversations)
    return (
    <div>ChatLayout
        <div>{children}</div>
    </div>
  )
}

export default ChatLayout
