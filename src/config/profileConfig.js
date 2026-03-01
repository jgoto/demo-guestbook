export const profileFields = [
    {
        name: 'email',
        label: 'email',
        type: 'text',
        readOnly: true,
        source: 'user',
        display: value => value
    },
    {
        name: 'first_name',
        label: 'First Name',
        type: 'text',
        required: true 
    },
    {
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
        required: true
    },
    {
        name: 'nickname',
        label: 'Nickname',
        type: 'text'
    }
]