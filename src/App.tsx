import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';
import {
    Outlet,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const App = () => {
    return (
        <ChakraProvider>
            <div className='App'>
                <header className='App-header'>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </ChakraProvider>
    );
};

export default App;
