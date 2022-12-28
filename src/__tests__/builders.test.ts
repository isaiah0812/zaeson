import { TestAttributes, createAttributes, createLinks, createSubresourceObject, createSubresourceGroup, createOperation, createOperationList, createSubresourceList, createSubresource, createFieldLIst, createField } from "./testUtils";
import { FieldBuilder, OperationBuilder, ResourceBuilder, SubresourceBuilder, SubresourceGroupBuilder } from "../builders";
import { FieldTypes, HttpMethod, Links, Resource, Subresource, SubresourceObject, SubresourceGroup, Operation, Field } from "../core";

describe('ZaeSON Builder Tests', () => {
  describe('Subresource Builder', () => {
    let baseSubresource: Subresource<TestAttributes>;
    let builder: SubresourceBuilder<TestAttributes>;

    beforeEach(() => {
      baseSubresource = {
        type: 'my-type',
        links: {
          self: new URL('https://example.com')
        }
      };

      builder = new SubresourceBuilder<TestAttributes>(baseSubresource.type, baseSubresource.links.self);
    });

    test('build a subresource', () => {
      const subresource: Subresource<TestAttributes> =
        builder
          .getSubresource();

      expect(subresource).toEqual(baseSubresource);
    });

    test('set type of subresource', () => {
      const subresource: Subresource<TestAttributes> =
        builder
          .type('my-new-type')
          .getSubresource();

      expect(subresource.type).toEqual('my-new-type');
    });

    test('set id of subresource', () => {
      const subresource: Subresource<TestAttributes> =
        builder
          .id('my-id')
          .getSubresource();
      
      expect(subresource.id).toEqual('my-id');
    });

    test('set links of subresource', () => {
      const links = createLinks();
      const subresource: Subresource<TestAttributes> =
        builder
          .links(links)
          .getSubresource();
      
      expect(subresource.links).toEqual(links);
    });

    test('set self link of subresource', () => {
      const link: URL = new URL('https://example.com/self');
      const subresource: Subresource<TestAttributes> =
        builder
          .selfLink(link)
          .getSubresource();
      
      expect(subresource.links.self).toEqual(link);
    });

    test('add a link to a subresource', () => {
      const link = new URL('https://example.com/test')
      const subresource: Subresource<TestAttributes> =
        builder
          .link('test', link)
          .getSubresource();
      
      expect(subresource.links['test']).toEqual(link);
    });

    test('set attributes of a subresource', () => {
      const attributes = createAttributes();
      const subresource: Subresource<TestAttributes> =
        builder
          .attributes(attributes)
          .getSubresource();

      expect(subresource.attributes).toEqual(attributes);
    });
  });

  describe('Resource Builder', () => {
    let baseResource: Resource<TestAttributes>;
    let builder: ResourceBuilder<TestAttributes>;

    beforeEach(() => {
      baseResource = {
        type: 'my-type',
        links: {
          self: new URL('https://example.com')
        },
        subresources: {}
      }

      builder = new ResourceBuilder<TestAttributes>(baseResource.type, baseResource.links.self);
    })

    test('build a resource', () => {
      const resource: Resource<TestAttributes> = builder.getResource();
      
      expect(resource).toEqual(baseResource);
    });

    test('set type of resource', () => {
      const resource: Resource<TestAttributes> =
        builder
          .type('my-new-type')
          .getResource();

      expect(resource.type).toEqual('my-new-type')
    });

    test('set id of resource', () => {
      const resource: Resource<TestAttributes> =
        builder
          .id('my-id')
          .getResource();

      expect(resource.id).toEqual('my-id');
    });

    test('set links of resource', () => {
      const links: Links = createLinks()
      const resource: Resource<TestAttributes> =
        builder
          .links(links)
          .getResource();
        
      expect(resource.links).toEqual(links);
    });

    test('set self link of resource', () => {
      const link = new URL('https://example.com/self');
      const resource: Resource<TestAttributes> =
        builder
          .selfLink(link)
          .getResource();
      
      expect(resource.links.self).toEqual(link);
    });

    test('add a link to a resource', () => {
      const link = new URL('https://example.com/test');
      const resource: Resource<TestAttributes> =
        builder
          .link('test', link)
          .getResource();

      expect(resource.links['test']).toEqual(link);
    });

    test('set attributes of a resource', () => {
      const attributes: TestAttributes = createAttributes();
      const resource: Resource<TestAttributes> =
        builder
          .attributes(attributes)
          .getResource();
      
      expect(resource.attributes).toEqual(attributes);
    });

    test('set subresources of a resource', () => {
      const subresources: SubresourceObject = createSubresourceObject();
      const resource: Resource<TestAttributes> =
        builder
          .subresources(subresources)
          .getResource();

      expect(resource.subresources).toEqual(subresources);
    });

    test('add subresource group to resource', () => {
      const group: SubresourceGroup = createSubresourceGroup('test', 'test-type');
      const resource: Resource<TestAttributes> =
        builder
          .subresourceGroup(group)
          .getResource();

      const [name, subresourceList] = group;
      expect(resource.subresources[name]).toEqual(subresourceList);
    });

    test('set operations of a resource', () => {
      const operations: Operation[] = createOperationList();
      const resource: Resource<TestAttributes> =
        builder
          .operations(operations)
          .getResource();

      expect(resource.operations).toEqual(operations);
    });

    test('add an operation to a resource', () => {
      const operation: Operation = createOperation('test', 'POST');
      const resource: Resource<TestAttributes> =
        builder
          .operation(operation)
          .getResource();
      
      expect(resource.operations).toContain(operation);
    });
  });

  describe('Subresource Group Builder', () => {
    let baseGroup: SubresourceGroup;
    let builder: SubresourceGroupBuilder<TestAttributes>;

    beforeEach(() => {
      baseGroup = ['test', []];
      builder = new SubresourceGroupBuilder(baseGroup[0]);
    });

    test('build a subresource group', () => {
      const group: SubresourceGroup = builder.getSubresourceGroup();

      expect(group).toEqual(baseGroup);
    });

    test('set name of subresource group', () => {
      const group: SubresourceGroup =
        builder
          .name('my-new-name')
          .getSubresourceGroup();

      const [name, _] = group;
      expect(name).toEqual('my-new-name');
    })

    test('set subresource list of subresource group', () => {
      const subresources: Subresource<TestAttributes>[] = createSubresourceList('my-type');
      const group: SubresourceGroup =
        builder
          .subresources(subresources)
          .getSubresourceGroup();

      const [_, subresourceList] = group;
      expect(subresourceList).toEqual(subresourceList);
    });

    test('add a subresource to the subresource list of a subresource group', () => {
      const subresource: Subresource<TestAttributes> = createSubresource('my-type', 'my-id');
      const group: SubresourceGroup =
        builder
          .subresource(subresource)
          .getSubresourceGroup();

      const [_, subresourceList] = group;
      expect(subresourceList).toContain(subresource);
    });
  });

  describe('Operation Builder', () => {
    let baseOperation: Operation;
    let builder: OperationBuilder;

    beforeEach(() => {
      baseOperation = {
        name: 'test',
        method: 'POST',
        href: new URL('https://example.com/test')
      };

      builder = new OperationBuilder(baseOperation.name, baseOperation.method, baseOperation.href);
    });

    test('build an operation', () => {
      const operation: Operation = builder.getOperation()

      expect(operation).toEqual(baseOperation);
    });

    test('set name of an operation', () => {
      const operation: Operation =
        builder
          .name('my-operation')
          .getOperation();

      expect(operation.name).toEqual('my-operation');
    });

    test.each(['PUT', 'DELETE', 'PATCH'] as HttpMethod[])
      ('set method of an operation to %p', (method: HttpMethod) => {
        const operation: Operation =
          builder
            .method(method)
            .getOperation();

        expect(operation.method).toEqual(method);
      });

    test('set href of an operation', () => {
      const href: URL = new URL('https://example.com/my-new-path')
      const operation: Operation =
        builder
          .href(href)
          .getOperation();

      expect(operation.href).toEqual(href);
    });

    test('set content_type of operation', () => {
      const operation: Operation =
        builder
          .content_type('text/html')
          .getOperation();

      expect(operation.content_type).toEqual('text/html');
    });

    test('set fields of an operation', () => {
      const fields: Field[] = createFieldLIst();
      const operation: Operation =
        builder
          .fields(fields)
          .getOperation();

      expect(operation.fields).toEqual(fields);
    });

    test('add a field to an operation', () => {
      const field: Field = createField('test', 'text');
      const operation: Operation =
        builder
          .field(field)
          .getOperation();

      expect(operation.fields).toContain(field);
    });
  });

  describe('Field Builder', () => {
    let baseField: Field;
    let builder: FieldBuilder;

    beforeEach(() => {
      baseField = {
        property: 'test',
        type: 'text'
      };

      builder = new FieldBuilder(baseField.property, baseField.type);
    });

    test('build a field', () => {
      const field: Field = builder.getField();

      expect(field).toEqual(baseField);
    });

    test('set property of a field', () => {
      const field: Field =
        builder
          .property('test')
          .getField();

      expect(field.property).toEqual('test');
    });

    test
      .each(['text', 'number', 'email'] as FieldTypes[])
      ('set type of a field to %p', (type: FieldTypes) => {
        const field: Field =
          builder
            .type(type)
            .getField();

        expect(field.type).toEqual(type);
      });

    test.each(['test', true, 123])
      ('set value of a field to %p', (value: string | boolean | number) => {
        const field: Field =
          builder
            .value(value)
            .getField();

        expect(field.value).toEqual(value);
      });

    test('set pattern of a field', () => {
      const pattern: string = '^test.*$'
      const field: Field =
        builder
          .pattern(pattern)
          .getField();

      expect(field.pattern).toEqual(pattern);
    });

    test('set format of a field', () => {
      const field: Field =
        builder
          .format('integer')
          .getField();

      expect(field.format).toEqual('integer');
    });
  });
});