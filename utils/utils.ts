export const getRandomFromArray: <T>(array: T[]) => T = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const uniqueFilter: <T>(
  element: T,
  index: number,
  array: T[]
) => boolean = (element, index, array) => index === array.indexOf(element);

export const ensureUnique = <T>(array: T[]) => array.filter(uniqueFilter);

export function downloadObjectAsJson(exportObj: object, fileName: string) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", fileName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
