require('dotenv').config();

export default {
    web: {
        port: process.env.PORT || 3000
    },
    services: {
        rendering: {
            port: 3002
        },
        api: {
            port: 3003,
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
        }
    },
    webpack: {
        devserver: {
            port: 3001
        }
    }
};