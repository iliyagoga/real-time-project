import {makeAutoObservable} from 'mobx'
class Toolstore{
    _tool=null
    _lineWidth=1
    _fillColor='black'
    _strokeColor='black'
    constructor(){
        makeAutoObservable(this)
        
    }
    setTool(tool){
        this._tool=tool

    }
    get tool(){
        return this._tool
    }
    get lineWidth(){
        return this._lineWidth
    }
    get strokeColor(){
        return this._strokeColor
    }
    get fillColor(){
        return this._fillColor
    }
    setFillColor(color){
        this._fillColor=color
    }
    setStrokeColor(color){
        this._strokeColor=color
    }
    setLineWidth(width){
        this._lineWidth=width
    }
}
export default new Toolstore()