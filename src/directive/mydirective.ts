// export default {
//     mydirective(el:any, binding:any, vnode:any) {
//         mounted() {
//             console.log('Directive mounted');
//             console.log(el, binding, vnode, 'hh');
//         }
//     }
// }

const mydirective = {
    mounted(el: any, binding: any, vnode: any) {
        console.log('Directive mounted');
        console.log(el, binding, vnode, 'hh');
    }
}

export default mydirective;