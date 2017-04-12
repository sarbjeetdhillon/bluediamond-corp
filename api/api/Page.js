import axios from 'axios';

import {setCached} from '../services/cache';

const contentTypes = [
    'page',
    'pageWithSidebar',
    'fullScreenPage'
];

const requestSlugFromType = (req, res, spaceId, typeIndex) => {
    axios.get(
        `${req.apiParams.base}/spaces/${spaceId}/entries?` +
        `include=2&fields.slug=${req.params.slug}&` +
        `access_token=${req.apiParams.token}&content_type=${contentTypes[typeIndex]}`
    )
    .then((response) => {
        if(response.data.items.length) {
            setCached(`page_${req.params.slug}`, response.data);
            res.send(response.data);
        } else if(typeIndex + 1 < contentTypes.length) {
            requestSlugFromType(req, res, spaceId, typeIndex + 1);
        } else {
            res.status(404).send({ok: false, error: 'not found'});
        }
    })
    .catch((err) => {
        console.trace(err);
        res.status(500).send(err.message);
    });
};

export default (api, spaceId) => {
    api.get('/page/:slug', (req, res) => requestSlugFromType(req, res, spaceId, 0));
};
