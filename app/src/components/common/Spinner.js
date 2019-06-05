import React from 'react';
import { Loader } from 'semantic-ui-react';
import Container from '../Container';

const Spinner = () => (
    <Container>
        <Loader active inline size="large">Loading...</Loader>
    </Container>
);

export default Spinner;