import { useState, useEffect } from "react";
import axios from "axios";

//default timeout 10sec
const useAxiosFetch = (url, timeout = 10000) => {
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios.get(url, {
      cancelToken: source.token,
      timeout: timeout
    }).then(res => {
      if (!unmounted) {
        setData(res.data);
        setIsLoading(false);
      }
    }).catch(function (e) {
      if (!unmounted) {
        console.log(e)
        setHasError(true);
        setErrorMessage(e.message);
        setIsLoading(false);
        if (axios.isCancel(e)) {
          console.log(`request cancelled: ${e.message}`);
        } else {
          console.log(`error happened: ${e.message}`);
        }
      }
    });
    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [url, timeout]);

  return { data, isLoading, hasError, errorMessage };
};

export default useAxiosFetch;