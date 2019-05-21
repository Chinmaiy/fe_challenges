export default () => {
    return 123;
};

/**
 * Some rules about reducers:
 * 
 * Reducers MUST NOT return undefined.
 * Redux runs each of the reducers one time at initialization time and 
 * it can check that the above rule is followed + reducers can specify some default state value.
 * 
 * Reducers produce state to be used in the app using ONLY previous state and the action i.e.
 * its inputs i.e. reducers are pure.
 * 
 * Reduceres should not mutate its input 'state' argument, but return a "new" state object <=
 * how the redux makes the check for differences between previous and next state (i.e. by reference !==)
 */