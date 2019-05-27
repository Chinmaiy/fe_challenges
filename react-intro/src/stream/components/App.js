import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Route path="/" exact component={StreamList}/>
                <Route path="/streams/new" exact component={StreamCreate}/>
                <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                <Route path="/streams/show" exact component={StreamShow}/>
            </Router>
        </div>
    );
};

export default App;

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
// const PageOne = () => {
//     return (
//         <div>
//             PageOne
//             <Link to="/pagetwo">Page Two</Link>
//         </div>
//     );
// };

// const PageTwo = () => {
//     return (
//         <div>
//             PageTwo
//             <button>Click me!</button>
//             <Link to="/">Page One</Link>
//         </div>
//     );
// };

/**
 * exact added makes the router's path matching rule be "extractedPath === path"
 * vs. "extractedPath.contains(path)"
 * 
 * In a create-react-app dev server when a route is asked for through a request
 * the server checks: 1. dev resources, the public dir and if it does not find anything
 * serves index.html and will NOT respond with a 404 like a "traditional" web server will do.
 * When the react app is loaded through the bundle script, then the BrowserRouter gets the
 * route from the browser History object and passes it to the defined Routes so the app
 * will render accordingly.
 * Should make the "traditional" web server serve index.html instead to function the same.
 * With the HashRouter you should set up the server to ignore anything after the # in the URL
 * and just serve the index.html file. From there the react app will use the URL part after the #
 * to render itself accordingly.
 */
// const App = () => {
//     return (
//         <div>
//             <BrowserRouter>
//                 <Route path="/" exact component={PageOne}/> 
//                 <Route path="/pagetwo" component={PageTwo}/>
//             </BrowserRouter>
//         </div>
//     );
// };

// export default App;