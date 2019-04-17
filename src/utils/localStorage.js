import Auth from '../Auth/Auth';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState == null){
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error loading state: " + err);
    return undefined;
  }
}

export const saveState = (userState) => {
  try {
    const auth = new Auth();
    if (auth.isAuthenticated()){
      const serializedState = JSON.stringify(userState);
      localStorage.setItem('user', serializedState);
    } 
  } catch (err) {
    console.log("Error saving state: " + err);
  }
}