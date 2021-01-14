export class TickVersionManager {
  static tickVersionManagerInstance: TickVersionManager | null = null;
  static sharedInstance () {
    if (TickVersionManager.tickVersionManagerInstance === null) {
      TickVersionManager.tickVersionManagerInstance = new TickVersionManager();
    }

    return TickVersionManager.tickVersionManagerInstance
  }

  async forUpdate () {

  }

  command (name, forUpdate = false) {
    return async (...argv) => {
      if (forUpdate) {

      }
    }
  }

}