import {makeAutoObservable} from 'mobx'
class Canvasstore{
    constructor(){
        this.canvas=null
        makeAutoObservable(this)
        
    }
    setCanvas(canvas){
        this.canvas=canvas

    }
    get canvas(){
        return this.canvas
    }
}
export default new Canvasstore()