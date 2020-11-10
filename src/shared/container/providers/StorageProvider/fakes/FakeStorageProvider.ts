import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private userAvatar: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.userAvatar.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const find = this.userAvatar.findIndex(avatar => avatar === file);
    this.userAvatar.splice(find, 1);
  }
}
