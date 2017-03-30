import React from 'react';
import {Title} from 'react-isomorphic-render';
import {flat as style} from 'react-styling';

const styles = style`
    header
    text-align: center
`;

export default () => (
    <div>
        <Title>Page not found</Title>

        <h1 style={styles.header}>
            Page not found
        </h1>
    </div>
);
