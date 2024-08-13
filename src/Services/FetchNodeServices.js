import axios from "axios";


var serverURL = "http://localhost:5000";
const getData = async (url) => {
  try {

   

    var response = await axios.get(`${serverURL}/${url}`);
    var result = await response.data;

    return result;
  } catch (e) {
    return null;
  }
};

const postData = async (url, body) => {
  try {

    
    var response = await axios.post(`${serverURL}/${url}`, body);
    var result = await response.data;

    return result;
  } catch (e) {
   
    return null;
  }
};

export { serverURL, getData, postData };
