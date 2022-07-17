import { Canvas, createCanvas, Image, loadImage } from "canvas";

export function createXpBar(
  style: string,
  color_a: string,
  color_b: string = "#000000"
): Promise<Canvas> {
  return new Promise(async (resolve, reject) => {
    try {
      let [width, height] = [664, 29];
      let paint = (bar: Image, color: string) => {
        let canvas = createCanvas(width, height);
        let ctx = canvas.getContext("2d");

        ctx.drawImage(bar, 0, 0);
        ctx.globalCompositeOperation = "color";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        return canvas;
      };
      let send = async (canvas: Canvas) => {
        let ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(await loadImage("/assets/card/xpbar/blank.png"), 0, 0);
        resolve(canvas);
      };

      let xp_bar = await loadImage("/assets/card/xpbar/" + style + ".png");
      let canvas = paint(xp_bar, color_a);
      let ctx = canvas.getContext("2d");

      if (style.includes("dual")) {
        let xp_bar2 = await loadImage("/assets/card/xpbar/" + style + "2.png");
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(xp_bar2, 0, 0);

        let canvas2 = paint(xp_bar2, color_b);
        let ctx2 = canvas2.getContext("2d");

        ctx2.globalCompositeOperation = "destination-out";
        ctx2.drawImage(xp_bar, 0, 0);

        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(canvas2, 0, 0);
        send(canvas);
      } else send(canvas);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
