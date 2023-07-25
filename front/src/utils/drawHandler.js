import { observer } from "mobx-react-lite"
import Brush from "../tools/Brush";
import Circle from '../tools/Circle'
import Rect from "../tools/Rect";
import Line from "../tools/Line";
import Rubber from "../tools/Rubber";
import canvasstore from "../store/canvasstore";
const drawHandler=(msg)=>{    
    const figure=(msg.figure)
    const ctx= canvasstore.canvas.getContext('2d')
    if(canvasstore.username!=msg.username){
      switch(figure.type){
        case 'brush':
          Brush.draw2(ctx,figure.x, figure.y,figure.color, figure.width, figure.c)
          break
        case 'circle':
          Circle.draw2(ctx,figure.x, figure.y, figure.w,figure.colorS, figure.colorF, figure.width)
          break
        case 'rect':
          Rect.draw2(ctx,figure.x, figure.y, figure.w, figure.h, figure.colorS, figure.colorF, figure.width)
          break
        case 'rubber':
          Rubber.draw2(ctx,figure.x, figure.y,figure.c, figure.width)
          break
        case 'line':
          Line.draw2(ctx,figure.x, figure.y, figure.sx, figure.sy,figure.color, figure.width)
          break
      }
    }
  }
  export default drawHandler