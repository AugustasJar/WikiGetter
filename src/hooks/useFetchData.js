import { useState } from "react";
const useFetchData = () => {
    const [pages, setPages] = useState();
    const [status, setStatus] = useState('idle');
    let url = "https://en.wikipedia.org/w/api.php";
    const fetchData = async (params) => {
      setStatus("fetching");
      try {
        url+="?origin=*";
        Object.keys(params).forEach((key) => {url += '&' + key + '=' + params[key]});
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setPages(data);
        setStatus('completed');
        setTimeout(setStatus('idle'),1000);
    } catch (error) {
        setStatus('error');
        console.log(error);
        };
    }
return [status,pages,fetchData];

}
export default useFetchData;