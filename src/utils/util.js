/* 
    @param vnode   vue的虚拟dom
    @return node   node 节点
*/
export const translateVnode = (vnode) => {     
    let h = document.createElement.bind(document)
    let t = document.createTextNode.bind(document)

    function _translate(_root) {

        let _rootDom = _root.tag ? h(_root.tag) : ""

        if (_root.children) {
            _root.children.map(v => {
                return _translate(v)
            }).forEach(nd => {
                _rootDom.appendChild(nd)
            })
        }

        if (_root.text) {
            return t(_root.text)
        } else if (_root.data) {

            if (_root.data.attrs) {
                for (let k in _root.data.attrs) {
                    _rootDom.setAttribute(k, _root.data.attrs[k])
                }
            } 

            if (_root.data.staticClass) {
                _rootDom.className = _root.data.staticClass
            }

            if (_root.data.staticStyle) {
                for (let k in _root.data.staticStyle) {
                    _rootDom.style[k] = _root.data.staticStyle[k]
                }
            }
            
            return _rootDom
        }
        return _rootDom
    }

    return _translate(vnode)
}


