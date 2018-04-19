const getRequest = function() {
  let after = window.location.hash.split("?")[1];
  let theRequest = new Object();
  if (after) {
    let strs = after.split("&");
    for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    return theRequest;
  }
}

export default getRequest;