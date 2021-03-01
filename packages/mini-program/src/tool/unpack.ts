
import path from 'path';
import { File } from './File';
import {
  FILE_FIRSTMARK,
  FILE_LASTMARK
} from './shared';

class Unpacker {
  public offset: number = 0;
  public buffer: Uint8Array | null;
  public fs: any | null = null;
  private bufferIndexes: any;
  private bufferHeader: any;

  constructor (data, fs) {
    this.offset = 0;
    this.buffer = (data instanceof Uint8Array) ? data : new Uint8Array(data);
    this.fs = fs;
  }

  get indexes () {
    if (this.bufferIndexes) {
      return this.bufferIndexes;
    }

    const indexes: any[] = [];
    const header = this.header;
    const count = header.count;

    for (let i = 0; i < count; i++) {
      const length = this.int32();
      const name = this.string(length);
      const offset = this.int32();
      const size = this.int32();

      const buffer = this.buffer?.slice(offset, offset + size);

      indexes.push(new File(
        name,
        offset,
        size,
        buffer
      ));
    }

    return this.bufferIndexes = indexes;
  }

  get header () {
    if (this.bufferHeader) {
      return this.bufferHeader;
    }

    const header = { 
      firstMark: this.int8(),
      info: this.int32(),
      indexSize: this.int32(),
      chunkSize: this.int32(),
      lastMark: this.int8(),
      count: this.int32()
    };
    
    if (
      header.firstMark !== FILE_FIRSTMARK ||
      header.lastMark !== FILE_LASTMARK
    ) {
      throw new TypeError(`Wrong file format`);
    }

    return this.bufferHeader = header;
  }

  string (length) {
    const buffer = this.bytes(length);
    let string = '';

    if (buffer) {
      for (let i = 0; i < buffer.length; i++) {
        string += String.fromCharCode(buffer[i]);
      }
    }

    return string;
  }

  int8 () {
    const buffer = this.bytes();

    if (buffer) {
      return buffer[0] << 0;
    }

    return 0;
  }

  int16 () {
    const buffer = this.bytes(2);

    if (buffer) {
      return (
        (buffer[0] << 8) +
        (buffer[1] << 0)
      );
    }

    return 0;
  }

  int32 () {
    const buffer = this.bytes(4);

    if (buffer) {
      return (
        (buffer[0] << 24) +
        (buffer[1] << 16) +
        (buffer[2] << 8) +
        (buffer[3] << 0)
      );
    }

    return 0;
  }


  bytes (length = 1) {
		return this.buffer?.slice(
      this.offset, 
      this.offset = this.offset + length
    );
  }

  async unpack (dest) {
    if (this.buffer) {
      const header = this.header;
      const indexes = this.indexes;

      const size = indexes.map(file => {
        return file.size
      }).reduce((total = 0, size) => {
        return total + size
      });

      console.log(indexes)

      if (header.chunkSize !== size) {
        throw new Error(`Wrong chunk size.`);
      }

      for (let i = 0; i < indexes.length; i++) {
        const { buffer, name } = indexes[i];
        const filename = path.join(dest, name);
        const { dir } = path.parse(filename);

        await this.fs.mkdirp(dir);
        await this.fs.writeFile(filename, buffer);
      }
    }
  }
}

export async function unpack ({
  dest, 
  content,
  fs
}) {
  const unpacker = new Unpacker(content, fs);
  return await unpacker.unpack(dest);
}


