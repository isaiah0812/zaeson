interface ISubresource {
  type: string;
  id?: string;
  links: Links;
}

export interface Subresource<T extends object> extends ISubresource {
  attributes?: T;
}

export type SubresourceGroup = [string, ISubresource[]];

export interface SubresourceObject {
  [name: string]: ISubresource[];
}

export interface Resource<T extends object> extends Subresource<T> {
  subresources: SubresourceObject;
  operations?: Operation[];
}

export type HttpMethod = 
  'GET'       |
  'HEAD'      |
  'POST'      |
  'PUT'       |
  'DELETE'    |
  'CONNECT'   |
  'OPTIONS'   |
  'TRACE'     |
  'PATCH';

export interface Operation {
  name: string;
  method: HttpMethod;
  href: URL;
  content_type?: string;
  fields?: Field[]
}

export type FieldTypes = 
  'hidden'          |
  'text'            |
  'search'          |
  'tel'             |
  'url'             |
  'email'           |
  'password'        |
  'datetime'        |
  'date'            |
  'month'           |
  'week'            |
  'time'            |
  'datetime-local'  |
  'number'          |
  'range'           |
  'color'           |
  'checkbox'        |
  'radio'           |
  'file';

export interface Field {
  property: string;
  type: FieldTypes;
  value?: string | boolean | number;
  pattern?: string;
  format?: string;
}

export interface Links {
  self: URL;
  next?: URL;
  previous?: URL;
  first?: URL;
  last?: URL;
  collection?: URL;
  [link: string]: URL | undefined;
}