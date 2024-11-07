import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <RouterLink to='/login'>sign in</RouterLink>
        </div>
    );
};

export default App;
