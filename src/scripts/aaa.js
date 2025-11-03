import axios from 'axios'

function changePage() {
    return {
        change_page: "signup", //設定初始值=使用者一進來的頁面
        email: "",
        nickname: "",
        password: "",

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

                try{
                    const resp = await axios.post('https://todoo.5xcamp.us/users', userData)
                    console.log(resp)
                }catch (err) {
                    alert(err.response.data.message)
                }

                
            }
         
        },

        gotoLogin() {
            this.change_page = "login"
        } ,
        gotoSignUp: function () {
            this.change_page = "signup"
        },

        showLogin() {
            return this.change_page == "login"
        },
        showSignUp: function () {
            return this.change_page == "signup"
        },
        showTask: function () {
            return this.change_page == "task"
        }
    }
}

export { changePage }