export default {
    install(Vue, options) {
        Vue.prototype.$message = function({text, error = false}) {
            let color = error ? '#01579b' : '#26a69a'
            window.M.toast({ html: text }).el.style.backgroundColor = color
        }
    }
}