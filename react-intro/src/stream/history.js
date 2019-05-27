//creating the history object and maintaining it (instead of leaving this to the BrowserRouter)
//so we get access to it easily everywhere in app (e.g. in action creators) to make programmatic
//navigation possible
//pass it as the history prop to the router to use it insteand of creating its own
import { createBrowserHistory } from 'history'; 
export default createBrowserHistory();