const fetchWrapper = async (url, params, additionalHeaders = {}) => {
  const { method, data } = params;
  let fetchRequest = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...additionalHeaders
    }
  };
  if (method) {
    fetchRequest.method = method;
  }
  if (data) {
    const jsonBody = JSON.stringify(data);
    fetchRequest.body = jsonBody;
  }

  let token = getAuthToken();
  if (token) {
    fetchRequest.headers.Authorization = `${token}`;
    // fetchRequest.headers.Authorization = `Bearer ${token}`;
  }

  try {
    let response = await fetch(url, fetchRequest);
    const { status } = response;
    if (response.ok) {
      return response.headers.get("content-type").includes("json")
        ? response.json()
        : response;
    } else {
      throw Error(`Response not OK, status: ${status}`);
    }
  } catch (err) {
    throw Error(err);
  }
};

function getAuthToken() {
  const name = "access-token";
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

export default fetchWrapper;
