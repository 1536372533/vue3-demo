import "./../plugs/v-shake/shake.css"

export default (app) => {
    //自定义指令
    app.directive("shake",(el,binding,vnode,preVnode) => {
        el.addEventListener('click', () => {
            el.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
            el.addEventListener('animationend',() => {
                el.style.animation =""
            })
        })      
    })


}