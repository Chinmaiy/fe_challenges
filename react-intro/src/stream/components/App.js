import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

/**
 * Obs.: with react/react-router we NOT use anchor tags to navigate between app pages
 * because all the react/redux state data is lost when the new request is made
 * Using a Link component (that renders to an anchor tag) would prevent the browser from
 * fetching again the index.html, the URL changes, the History browser api sees the updated
 * URL and sends it to react router to get matched against Route components that rerender 
 * themselves to show new components
 * Navigation basically just involves showing and hiding different components.
 */
//dummy components
const PageOne = () => {
    return (
        <div>
            PageOne
            <Link to="/pagetwo">Page Two</Link>
        </div>
    );
};

const PageTwo = () => {
    return (
        <div>
            PageTwo
            <button>Click me!</button>
            <Link to="/">Page One</Link>
        </div>
    );
};

/**
 * exact added makes the router's path matching rule be "extractedPath === path"
 * vs. "extractedPath.contains(path)"
 */
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={PageOne}/> 
                <Route path="/pagetwo" component={PageTwo}/>
            </BrowserRouter>
        </div>
    );
};

export default App;