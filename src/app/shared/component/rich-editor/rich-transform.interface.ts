export interface IRichTransformInterface {
  transform(content: string): {
    content: string;
    imageIds: string[];
  };

  restore(content: string, url: IUrl[]): string;
}

export interface IUrl {
  id: string;
  path: string;
}
