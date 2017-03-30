import React from 'react';
import {flat as style} from 'react-styling';
import {Title} from 'react-isomorphic-render';

const styles = style`
    header
    text-align: center
`;

export default () => (
    <section className="content">
        <Title>Error</Title>

        <h1 style={styles.header}>
            Some kind of an error happened
        </h1>
    </section>
);
