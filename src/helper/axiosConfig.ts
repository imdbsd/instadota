import axios, {AxiosResponse} from 'axios';
import {paths} from '../OpenDota.typedef';

type Path = keyof paths;
type PathMethod<T extends Path> = keyof paths[T];
type RequestParams<
  P extends Path,
  M extends PathMethod<P>
> = paths[P][M] extends {
  parameters: any;
}
  ? paths[P][M]['parameters']
  : undefined;
type ResponseType<
  P extends Path,
  M extends PathMethod<P>
> = paths[P][M] extends {
  responses: {200: {schema: {[x: string]: any}}};
}
  ? paths[P][M]['responses'][200]['schema']
  : undefined;

const OpenDotaInstance = axios.create({
  baseURL: 'https://api.opendota.com/api',
});

export const OpenDotaAPI = OpenDotaInstance;

const replacePath = (url: string, path: {[key: string]: any}): string => {
  let replacedUrl = url;
  const keys = Object.keys(path);

  keys.forEach((key) => {
    const value = path[key];
    replacedUrl = replacedUrl.replace(`{${key}}`, value);
  });

  return replacedUrl;
};

export const apiCall = <P extends Path, M extends PathMethod<P>>(
  url: P,
  method: M,
  params: RequestParams<P, M> extends undefined ? {} : RequestParams<P, M>
): Promise<ResponseType<P, M>> => {
  const pathParam: {[key: string]: any} | undefined =
    typeof params === 'object' &&
    'path' in params &&
    typeof params.path === 'object' &&
    params.path
      ? params.path
      : undefined;
  console.log(params);
  console.log('pathParam: ', pathParam);
  const query =
    typeof params === 'object' && 'query' in params ? params.query : undefined;
  // @ts-ignore
  return OpenDotaInstance({
    url: pathParam ? replacePath(url, pathParam) : url,
    method: method as string,
    params: query,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
