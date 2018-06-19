interface CacheData {
  [k: string]: string
}

class Cache {
  private data: CacheData = {}

  public clear(key: string): any {
    this.data = {}
  }

  public get(key: string): any {
    return this.data[key]
  }

  public set(key: string, value: string): any {
    this.data[key] = value
  }

  public remove(key: string): any {
    // tslint:disable-next-line:no-dynamic-delete
    delete this.data[key]
  }
}

export default new Cache()
