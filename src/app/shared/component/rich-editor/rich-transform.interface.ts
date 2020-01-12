export interface IRichTransformInterface {
  transform(content: string): {
    content: string;
    urls: string[];
  };

  restore(content: string, url: IUrl[]): string;
}

export interface IUrl {
  url: string;
  width: number;
  height: number;
}
