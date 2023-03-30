import { ReactElement, useEffect, useState } from 'react';
import { Alert, Badge, Spinner } from 'react-bootstrap';
import { analyseSentiment } from './analysis';

interface Props {
    data: string[];
}