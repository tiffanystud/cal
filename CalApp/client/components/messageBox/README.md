# message-box component guide
When you want to use this component, it needs a few custom-keys to function properly.
These keys should be set when creating the component and BEFORE appending it.
Therefore you should use document.createElement rather than just typing the component straight into innerHTML. (This is also the most efficient way, considering a chat will most likely have more than one message)

Example:
`let component = document.createElement("message-box");`
`component.message = message;`
`root.appendChild(component);`

## Necessary custom keys
component.message - Represents the entire message-object of the specific message. Component uses needs this to display message content and time/date

component.users - Custom object containing two keys. The objects of the two users relevant to the specific message.
Object structure:
{
    sender: senderObj,
    receiver: receiverObj
}
Since the message object only includes userIds, you need to fetch relevant user objects from db BEFORE setting this object.


## Message specific keys
These keys should only be set if the sender of the message is the user that is currently logged in. These keys will determine the positioning and coloring of the component.

component.alignRight - Does not have to have a specific value, just be set to anything that is truthy. This key insures that the component aligns to the right.

component.bg - Needs to be a string. This key determines the backgroundColor of the component. Could be set to anything related to color. A CSS color, hex-code, rgb etc.
Examples:
component.bg = "gold";
component.bg = "#000000";
component.bg = "rgb(0, 0, 0)";