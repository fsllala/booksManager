const baseURL = "http://127.0.0.1:3000";

const newAjaxRequest = (url, method, data)=>{
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: baseURL + url,
      method,
      data,
      headers: {
        Authorization: localStorage.getItem("userInfo")?`Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`:'',
      },
      success: function (res) {
        resolve(res);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}