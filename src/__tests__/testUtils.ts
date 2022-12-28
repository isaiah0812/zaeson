import { Field, FieldTypes, HttpMethod, Links, Operation, Resource, Subresource, SubresourceObject, SubresourceGroup } from "../core";

export interface TestAttributes {
  prop1: string,
  prop2: boolean
}

export const createAttributes = (): TestAttributes => {
  return { prop1: 'test', prop2: true }
}

export const createSubresource = (type: string, id: string | undefined): Subresource<TestAttributes> => {
  return {
    type,
    id,
    attributes: createAttributes(),
    links: createLinks()
  };
}

export const createSubresourceList = (type: string): Subresource<TestAttributes>[] => {
  const subresourceList: Subresource<TestAttributes>[] = [];
  let i = 0;

  while(i < 3) {
    subresourceList.push(createSubresource(type, `my-id-${i}`));
    i++;
  }

  return subresourceList;
}

export const createSubresourceObject = (): SubresourceObject => {
  const subresourceObject: SubresourceObject = {}
  let i = 0;

  while(i < 3) {
    const [name, subresourceList] = createSubresourceGroup(`group${i}`, `group-${i}`);
    subresourceObject[name] = subresourceList;
    i++;
  }

  return subresourceObject;
}

export const createSubresourceGroup = (name: string, type: string): SubresourceGroup => {
  return [name, createSubresourceList(type)]
}

export const createResource = (type: string, id: string | undefined): Resource<TestAttributes> => {
  return {
    type,
    id,
    attributes: createAttributes(),
    links: createLinks(),
    subresources: {
      test1: createSubresourceList('test1'),
      test2: createSubresourceList('test2')
    },
    operations: createOperationList()
  };
}

export const createLinks = (): Links => {
  return {
    self: new URL('https://example.com/'),
    next: new URL('https://example.com/next'),
    collection: new URL ('https://example.com/collection')
  };
}

export const createOperation = (name: string, method: HttpMethod): Operation => {
  return {
    content_type: 'application/x-www-form-urlencoded',
    name,
    method,
    href: new URL(`https://example.com/${name}`),
    fields: createFieldLIst()
  }
}

export const createOperationList = (): Operation[] => {
  const operationList: Operation[] = [];
  let i = 0;

  while (i < 3) {
    operationList.push(createOperation(`operation-${i}`, 'POST'))
    i++;
  }

  return operationList;
}

export const createFieldLIst = (): Field[] => {
  const fieldList: Field[] = [];
  let i = 0;

  while (i < 3) {
    fieldList.push(createField(`field-${i}`, 'text'));
    i++;
  }

  return fieldList;
}

export const createField = (property: string, type: FieldTypes): Field => {
  return { property, type };
}