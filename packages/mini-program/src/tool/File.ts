export class File {
  public name;
  public size;
  public offset;
  public buffer;

  constructor (name, offset, size, buffer) {
    this.name = name;
    this.size = size;
    this.offset = offset;
    this.buffer = buffer;
  }
}