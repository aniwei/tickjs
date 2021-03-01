import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';

import {
  FILE_FIRSTMARK,
  FILE_LASTMARK
} from './shared';
import { File } from './File'

export class Packer {
  public offset: number = 0;
  private fileIndexes: any = 0;
  private fileHeader: any = null;
  public buffer: Uint8Array | null = null;

  constructor (data) {
    this.offset = 0;
    this.buffer = new Uint8Array(data);
  }

  get indexes () {
    if (this.fileIndexes) {
      return this.fileIndexes;
    }

    const indexes = [];

    const header = this.header;
    const count = header.count;

    for (let i = 0; i < count; i++) {
      const length = this.int32();
      const name = this.string(length);
      const offset = this.int32();
      const size = this.int32();

      const buffer = this.buffer.slice(offset, offset + size);

      indexes.push(new File(
        name,
        offset,
        size,
        buffer
      ));
    }

    return this.fileIndexes = indexes;
  }

  get header () {
    if (this.fileHeader) {
      return this.fileHeader;
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
      throw new Error(`Wrong file format`);
    }

    return this.fileHeader = header;
  }

  string (length) {
    const buffer = this.bytes(length);
    let string = '';

    for (let i = 0; i < buffer.length; i++) {
      string += String.fromCharCode(buffer[i]);
    }

    return string;
  }

  int8 () {
    return this.bytes() << 0;
  }

  int16 () {
    const buffer = this.bytes(2);
    return (
      (buffer[0] << 8) +
      (buffer[1] << 0)
    );
  }

  int32 () {
    const buffer = this.bytes(4);
    return (
      (buffer[0] << 24) +
      (buffer[1] << 16) +
      (buffer[2] << 8) +
      (buffer[3] << 0)
    );
  }


  bytes (length = 1) {
		return this.buffer.slice(
      this.offset, 
      this.offset = this.offset + length
    );
  }

  unpack (filepath) {
    if (this.buffer) {
      const header = this.header;
      const indexes = this.indexes;

      const size = indexes.map(file => {
        return file.size
      }).reduce((total = 0, size) => {
        return total + size
      });

      if (header.chunkSize !== size) {
        throw new Error(`Wrong chunk size`);
      }

      indexes.forEach(({ buffer, name }) => {
        fs.writeFileSync(path.join(filepath, name), buffer)
      });
    }
  }
}

module.exports = Unpacker;

