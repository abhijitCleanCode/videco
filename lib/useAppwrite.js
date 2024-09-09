import { useState, useEffect } from "react";
import { Alert } from "react-native";

// custom hook so name starts with use
const useAppwrite = (fn) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const response = await fn();
  
          setData(response);
        } catch (error) {
          Alert.alert('Error', error.message)
        } finally {
          setIsLoading(false);
        }
      }

    useEffect(() => {
      fetchData();
    }, [])

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useAppwrite

//---------------------------------------------------- PRO TIP
/*
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch data as soon as screen loads
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getAllPosts();

        setData(response);
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])
*/

// we will a create a custom hook of this functionality because we have to fetched data in lot of different pages for different users
// only things changes is fn: getALlPosts()

// so, useAppwrite.js exists