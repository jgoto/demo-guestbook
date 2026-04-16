import {render, screen, waitFor} from '@testing-library/react';
import { useEffect, useState } from 'react';

function HelloWorld(){
    return(
        <div>Hello Integration Test</div>
    )
}

function AsyncHello(){
    const [test, setTest] = useState('Loading...')

    useEffect(() => {
        const timer = setTimeout(() => {
            setTest('Loaded')
        }, 50);

        return () => clearTimeout(timer);
    },[])
    return (
        <div>{test}</div>
    )
}

describe('Integration Test Harness', () => {
    it('Renders a simple component', () => {
        render(<HelloWorld />);
        expect(
            screen.getByText('Hello Integration Test')
        ).toBeInTheDocument();
    })

    it('Handles async status updates', async () => {
        render(<AsyncHello />);
        expect(
            screen.getByText('Loading...')
        ).toBeInTheDocument();

        await waitFor(() => {
            expect(
                screen.getByText('Loaded')
            ).toBeInTheDocument();
        })
    })
})