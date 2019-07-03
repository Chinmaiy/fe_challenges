import { useState, useEffect } from "react";
import axios from "axios";

//to reuse in any component as a custom hook
const useResources = resource => {
  const [resources, setResources] = useState([]);

  const fetchResource = async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    );

    setResources(response.data);
  };

  useEffect(() => {
    fetchResource(resource);
  }, [resource]); //the second parameter is an array of values (dependencies); if different between renders than the function provided as the first parameter is called

  return resources;
};

export default useResources;
