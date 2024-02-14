export default function getChunk(data: any = [], size = 1) {
  const arr: any = [];
  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }
  return arr;
}
