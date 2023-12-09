$(".loginBtn").click(() => {
  const usernameVal = $(".username").val();
  const passwordVal = $(".password").val();

  if (!usernameVal || !passwordVal) {
    Qmsg.warning("用户名或密码不能为空");
    return;
  }
  const loading = Qmsg.loading("登录中...");
  newAjaxRequest("/login","post", {
      username: usernameVal,
      password: passwordVal,
    })
    .then((res) => {
      console.log(res)
      if (res.code === 0) {
        Qmsg.success(res.message);
        // 将用户信息存入本地
        localStorage.setItem("userInfo", JSON.stringify({username: res.username, token: res.token}));
        // 跳转到首页并清空输入框
        window.location.href = "./index.html";
        $(".username").val("");
        $(".password").val("");
      }else{
        Qmsg.error(res.message);
      }
    })
    .catch((err) => {
      // Qmsg.error(err.responseJSON.message);
      console.log(err)
    })
    .finally(() => {
      loading.close();
    });
});
