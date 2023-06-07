import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "post") return res.status(405);
  res.send(convert(req.body.image));
};

const colors = [
  [240, 240, 240],
  [242, 178, 51],
  [229, 127, 216],
  [153, 178, 242],
  [222, 222, 108],
  [127, 204, 25],
  [242, 178, 204],
  [76, 76, 76],
  [153, 153, 153],
  [76, 153, 178],
  [178, 102, 229],
  [51, 102, 204],
  [127, 102, 76],
  [87, 166, 78],
  [204, 76, 76],
  [17, 17, 17],
];

async function convert(img: string, size?: [number, number]) {
  let image = await loadImage(img);
  let width: number, height: number;
  if (size) {
    [width, height] = size;
    if (image.height > image.width)
      width = (image.width / image.height) * height;
    else if (image.width > image.height)
      height = (image.height / image.width) * width;
  } else {
    ({ width, height } = image);
  }
  let canvas = createCanvas(width, height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  let cc_values = _convert(ctx);

  return (
    cc_values
      .join("")
      .match(new RegExp(`.{${width}}`, "g"))
      ?.join("\n") ?? ""
  );
}

function _convert(ctx: CanvasRenderingContext2D) {
  let values = [];
  let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let pixels = imgData.data;
  //   console.log(colors_hues);
  for (var i = 0; i < pixels.length; i += 4) {
    let pixel = [pixels[i], pixels[i + 1], pixels[i + 2]] as [
      number,
      number,
      number
    ];
    let r = getClosestColor(pixel);
    values.push(r.toString(16));
    [pixels[i], pixels[i + 1], pixels[i + 2]] = colors[r];
    pixels[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  return values;
}

/*
      A simple algorithm that gives reasonably good results:
      Add the squared difference of each color component (red, green, blue)
      between the color you are looking for and the color in your list of colors
      and choose the color where the sum of those squared differences is minimal. 
  
      https://softwareengineering.stackexchange.com/a/159832
  */
function getClosestColor([r1, g1, b1]: [number, number, number]) {
  let current: number | undefined;
  let pos = -1;
  for (let i = 0; i < colors.length; i++) {
    let [r2, g2, b2] = colors[i];
    let r = r1 - r2,
      g = g1 - g2,
      b = b1 - b2;
    let difference = r * r + g * g + b * b;
    if (!current || difference < current) {
      current = difference;
      pos = i;
    }
  }
  return pos;
}
