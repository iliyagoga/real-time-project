import canvasstore from "../store/canvasstore"

const download=()=>{
    const cavas=canvasstore.getCanvas()
    const img=cavas.toDataURL()
      const link = document.createElement('a');
      link.href = img;
      link.setAttribute(
        'download',
        `screen.png`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
}
export default download