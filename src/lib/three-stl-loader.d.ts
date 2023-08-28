declare module 'three-stl-loader' {
  import * as THREE from 'three';

  export default class STLLoader {
    constructor(manager?: THREE.LoadingManager);
    load(
      url: string,
      onLoad: (geometry: THREE.BufferGeometry) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
    setPath(path: string): this;
    setResourcePath(resourcePath: string): this;
    setResponseType(responseType: string): this;
    setWithCredentials(withCredentials: boolean): this;
  }
}
