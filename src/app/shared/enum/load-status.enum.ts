enum LoadStatusEnum {
  ldle,
  loading,
  error,
  loaded,
  noMore,
}

export class LoadStatus {
  private status: LoadStatusEnum = LoadStatusEnum.ldle;

  public get isLdle(): boolean {
    return this.status === LoadStatusEnum.ldle;
  }

  public get isLoading(): boolean {
    return this.status === LoadStatusEnum.loading;
  }

  public get isError(): boolean {
    return this.status === LoadStatusEnum.error;
  }

  public get isLoaded(): boolean {
    return this.status === LoadStatusEnum.loaded;
  }

  public get isNoMore(): boolean {
    return this.status === LoadStatusEnum.noMore;
  }

  public setLdle() {
    this.status = LoadStatusEnum.ldle;
  }

  public setLoading() {
    this.status = LoadStatusEnum.loading;
  }

  public setError() {
    this.status = LoadStatusEnum.error;
  }

  public setLoaded() {
    this.status = LoadStatusEnum.loaded;
  }

  public setNoMore() {
    this.status = LoadStatusEnum.noMore;
  }
}
