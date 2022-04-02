export default{
    /**
     * 跳转到注册界面
     */
    go_to_registerView(){
        this.$router.push({
            path: 'registerView',
            query: 'register'
        })
    }
}