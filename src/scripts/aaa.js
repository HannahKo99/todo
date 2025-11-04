import axios from "axios"

function changePage() {
  return {
    change_page: "signup", //設定初始值=使用者一進來的頁面
    email: "",
    nickname: "",
    password: "",
    isLogin: false,

    init() {
      console.log("init")

      const token = localStorage.getItem("todoToken")

      if (token) {
        this.isLogin = true
      }

      if (this.isLogin) {
        console.log(this.isLogin);

        this.gotoTask()
      } else {        
        this.gotoSignUp()
      }
    },

    // isLogin() {
    //     const token = localStorage.getItem("todoToken")
    //     return token != ""
    // },

    async doLogin() {
      const { email, password } = this

      if (email != "" && password != "") {
        //打API
        const userData = {
          user: {
            email: email,
            password: password,
          },
        }

        try {
          const resp = await axios.post("https://todoo.5xcamp.us/users/sign_in", userData)
          const token = resp.headers.authorization
            console.log(resp);
            
          if (token) {
            localStorage.setItem("todoToken", token)
            this.isLogin = true
          }
          this.resetForm()
          this.gotoTask()
        } catch (err) {
          console.log(err)
        }
      }
    },

    async doSignUp() {
      // const email = this.email
      // const nickname = this.nickname
      // const password = this.password
      //解構
      const { email, nickname, password } = this

      if (email != "" && nickname != "" && password != "") {
        //打API
        const userData = {
          user: {
            email: email,
            nickname: nickname,
            password: password,
          },
        }

        try {
          await axios.post("https://todoo.5xcamp.us/users", userData)
          this.resetForm()
          //刪除填入資料
          this.gotoLogin()
        } catch (err) {
          alert(err.response.data.message)
        }
      }
    },

    resetForm() {
      this.email = ""
      this.password = ""
      this.nickname = ""
    },

    gotoLogin() {
      this.change_page = "login"
    },
    gotoSignUp: function () {
      this.change_page = "signup"
    },

    gotoTask() {
      this.change_page = "task"
    },

    showLogin() {
      return this.change_page == "login"
    },
    showSignUp: function () {
      return this.change_page == "signup"
    },
    showTask: function () {
      return this.change_page == "task"
    },

    async Logout() {
      console.log("123")

      const token = localStorage.getItem("todoToken")
      console.log(token)

      if (token) {
        const config = {
          headers: {
            Authorization: token,
          },
        }

        try {
          await axios.delete("https://todoo.5xcamp.us/users/sign_out", config)

          localStorage.removeItem("todoToken")
          this.isLogin = false
          this.gotoLogin()
        } catch (err) {
          console.log(err)
        }
      }
    },
  }
}

export { changePage }
