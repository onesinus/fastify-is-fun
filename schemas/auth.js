module.exports = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            },
            required: [
                'username',
                'password'
            ]
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' }    
                }
            }  
        }      
    }
}