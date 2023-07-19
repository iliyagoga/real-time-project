import {makeAutoObservable} from 'mobx'
class Toolstore{
    constructor(){
        this.tool=null
        makeAutoObservable(this)
        
    }
    setTool(tool){
        this.tool=tool

    }
    get tool(){
        return this.tool
    }
}
export default new Toolstore()