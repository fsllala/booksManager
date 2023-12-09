const headerUserName = document.getElementById("headerUserName");
headerUserName.innerHTML = template("temp_headerUserInfo", {
  loginUserName:
    JSON.parse(localStorage.getItem("userInfo"))?.username ?? "user",
});
let isBookAdd = true;
let editBookinfo = {};
let isUserAdd = true;
let editUserinfo = {};
// tab切换
$("#userManagementLi").click(function () {
  getAllUsersList();
  changeTab("#userManagementLi", "#userManagementContent");
});
$("#bookManagementLi").click(function () {
  getAllBooksList();
  changeTab("#bookManagementLi", "#bookManagementLiContent");
});


// 退出登录
$(".logOut").click(function () {
  localStorage.removeItem("userInfo");
  window.location.href = "./login.html";
})

// -----------------------------------------书籍管理--------------------------------------------

$(document).ready(function () {
  getAllBooksList();
});
const books_tbody = document.getElementById("books_tbody");
// 获取所有书籍列表
function getAllBooksList() {
  newAjaxRequest("/book/bookList", "get")
    .then((res) => {
      if (res.code === 0) {
        books_tbody.innerHTML = template("temp_bookManagement", {
          bookDataList: res.data,
        });
      } else {
        Qmsg.error(res.message);
      }
    })
    .catch((err) => {
      Qmsg.error(err.responseJSON.message);
    });
}

// 编辑
function editBook(bookInfo) {
  $("#dialogBookTitleText").text("编辑书籍");
  isBookAdd = false;
  editBookinfo = bookInfo;
  const { bookname } = bookInfo;
  newAjaxRequest("/book/getBookInfo", "post", {
    bookname,
  }).then((res) => {
    if (res.code === 0) {
      $("#bookName").val(res.data[0].bookname);
      $("#author").val(res.data[0].author);
      $("#price").val(res.data[0].price);
      $("#type").val(res.data[0].type);
      $("#inventory").val(res.data[0].inventory);
    } else {
      Qmsg.error(res.message);
    }
  });
  $(".bookMask").css("display", "block");
}

// 删除
function deleteBook(bookInfo) {
  const { id } = bookInfo;
  newAjaxRequest(`/book/delete/${id}`, "delete").then((res) => {
    if (res.code == 0) {
      Qmsg.success(res.message);
      getAllBooksList();
    } else {
      Qmsg.error(res.message);
    }
  });
}
// 添加
$("#books_addBtn").click(function () {
  $("#dialogBookTitleText").text("添加书籍");
  isBookAdd = true;
  // 清空输入框
  $("#bookName").val("");
  $("#author").val("");
  $("#price").val("");
  $("#type").val("");
  $("#inventory").val("");
  $(".bookMask").css("display", "block");
});

// dialog_cancel
$("#books_cancelBtn").click(function (event) {
  // 取消默认行为
  event.preventDefault();
  $(".bookMask").css("display", "none");
});

// dialog_confirm
$("#books_confirmBtn").click(function (event) {
  // 取消默认行为
  event.preventDefault();
  if ($("#bookName").val() === "") {
    Qmsg.warning("书名不能为空");
    return;
  }
  if ($("#author").val() === "") {
    Qmsg.warning("作者不能为空");
    return;
  }
  if ($("#price").val() === "") {
    Qmsg.warning("价格不能为空");
    return;
  }
  if ($("#type").val() === "") {
    Qmsg.warning("类型不能为空");
    return;
  }
  if ($("#inventory").val() === "") {
    Qmsg.warning("库存不能为空");
    return;
  }

  // 判读是添加还是编辑
  if (isBookAdd) {
    newAjaxRequest("/book/add", "post", {
      bookname: $("#bookName").val(),
      author: $("#author").val(),
      price: $("#price").val(),
      type: $("#type").val(),
      inventory: $("#inventory").val(),
    }).then((res) => {
      if (res.code === 0) {
        Qmsg.success(res.message);
        getAllBooksList();
        $(".bookMask").css("display", "none");
      } else {
        Qmsg.error(res.message);
      }
    });
  } else {
    newAjaxRequest(`/book/edit/${editBookinfo.id}`, "put", {
      bookname: $("#bookName").val(),
      author: $("#author").val(),
      price: $("#price").val(),
      type: $("#type").val(),
      inventory: $("#inventory").val(),
    }).then((res) => {
      if (res.code === 0) {
        Qmsg.success(res.message);
        getAllBooksList();
        $(".bookMask").css("display", "none");
      } else {
        Qmsg.error(res.message);
      }
    });
  }
});

// 搜索
$("#books_searchBtn").click(function () {
  newAjaxRequest("/book/getBookInfo", "post", {
    bookname: $("#searchBooKInput").val(),
  }).then((res) => {
    if (res.code === 0) {
      Qmsg.success(res.message);
    } else {
      Qmsg.error(res.message);
    }
    books_tbody.innerHTML = template("temp_bookManagement", {
      bookDataList: res.data,
    });
  });
});

// -----------------------------------------用户管理--------------------------------------------

// 获取所有用户列表
const user_tbody = document.getElementById("user_tbody");
function getAllUsersList() {
  newAjaxRequest("/userList", "get")
    .then((res) => {
      if (res.code === 0) {
        user_tbody.innerHTML = template("temp_userManagement", {
          userDataList: res.data,
        });
      } else {
        Qmsg.error(res.message);
      }
    })
    .catch((err) => {
      Qmsg.error(err.responseJSON.message);
    });
}

// 编辑
function editUser(userInfo) {
  $("#dialogUserTitleText").text("编辑用户");
  isUserAdd = false;
  editUserinfo = userInfo;
  const { username } = userInfo;
  newAjaxRequest("/user/getUserInfo", "post", {
    username,
  }).then((res) => {
    if (res.code === 0) {
      $("#username").val(res.data[0].username);
      $("#password").val(res.data[0].password);
      $("#name").val(res.data[0].name);
      $("#sex").val(res.data[0].sex);
      $("#age").val(res.data[0].age);
      $(".userMask").css("display", "block");
    } else {
      Qmsg.error(res.message);
    }
  });
}

// 删除
function deleteUser(userInfo) {
  const { id } = userInfo;
  newAjaxRequest(`/user/${id}`, "delete").then((res) => {
    if (res.code == 0) {
      Qmsg.success(res.message);
      getAllUsersList();
    } else {
      Qmsg.error(res.message);
    }
  });
}
// 添加
$("#users_addBtn").click(function (event) {
  $("#dialogUserTitleText").text("添加用户");
  isUserAdd = true;
  // 清空输入框
  $("#username").val("");
  $("#password").val("");
  $("#name").val("");
  $("#sex").val("");
  $("#age").val("");
  $(".userMask").css("display", "block");
});

// dialog_cancel
$("#users_cancelBtn").click(function (event) {
  // 取消默认行为
  event.preventDefault();
  $(".userMask").css("display", "none");
});

// dialog_confirm
$("#users_confirmBtn").click(function (event) {
  // 取消默认行为
  event.preventDefault();
  if ($("#username").val() === "") {
    Qmsg.warning("用户名不能为空");
    return;
  }
  if ($("#password").val() === "") {
    Qmsg.warning("密码不能为空");
    return;
  }
  if ($("#name").val() === "") {
    Qmsg.warning("姓名不能为空");
    return;
  }
  if ($("#sex").val() === "") {
    Qmsg.warning("性别不能为空");
    return;
  }
  if ($("#age").val() === "") {
    Qmsg.warning("年龄不能为空");
    return;
  }

  // 判读是添加还是编辑
  if (isUserAdd) {
    newAjaxRequest("/register", "post", {
      username: $("#username").val(),
      password: $("#password").val(),
      name: $("#name").val(),
      sex: $("#sex").val(),
      age: $("#age").val(),
    }).then((res) => {
      if (res.code === 0) {
        Qmsg.success(res.message);
        getAllUsersList();
        $(".userMask").css("display", "none");
      } else {
        Qmsg.error(res.message);
      }
    });
  } else {
    newAjaxRequest(`/user/${editUserinfo.id}`, "put", {
      username: $("#username").val(),
      password: $("#password").val(),
      name: $("#name").val(),
      sex: $("#sex").val(),
      age: $("#age").val(),
    }).then((res) => {
      if (res.code === 0) {
        Qmsg.success(res.message);
        getAllUsersList();
        $(".userMask").css("display", "none");
      } else {
        Qmsg.error(res.message);
      }
    });
  }
});

// 搜索
$("#users_searchBtn").click(function () {
  newAjaxRequest("/user/getUserInfo", "post", {
    username: $("#searchUserInput").val(),
  }).then((res) => {
    if (res.code === 0) {
      Qmsg.success(res.message);
    } else {
      Qmsg.error(res.message);
    }
    user_tbody.innerHTML = template("temp_userManagement", {
      userDataList: res.data,
    });
  });
});

/**
 * tab切换
 * @param {String} liItem li切换
 * @param {String} conItem content切换
 */
function changeTab(liItem, conItem) {
  // li
  $(".li-content").each(function () {
    $(this).removeClass("li-active");
  });

  $(liItem).addClass("li-active");
  // content
  $(".tab-content").each(function () {
    $(this).removeClass("active-tab-content");
  });

  $(conItem).addClass("active-tab-content");
}
