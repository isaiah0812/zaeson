import { Links, Resource, Subresource, SubresourceObject, SubresourceGroup, Operation, HttpMethod, Field, FieldTypes } from "./core";

export class SubresourceBuilder<T extends object> {
  private subresource: Subresource<T>;

  constructor(type: string, selfLink: URL) {
    this.subresource = {
      type,
      links: {
        self: selfLink
      }
    }
  }

  public getSubresource(): Subresource<T> {
    return this.subresource;
  }

  public type(type: string): SubresourceBuilder<T> {
    this.subresource.type = type;
    return this;
  }

  public id(id: string): SubresourceBuilder<T> {
    this.subresource.id = id;
    return this;
  }

  public links(links: Links): SubresourceBuilder<T> {
    this.subresource.links = links;
    return this;
  }

  public selfLink(link: URL): SubresourceBuilder<T> {
    this.subresource.links.self = link;
    return this;
  }

  public link(name: string, link: URL): SubresourceBuilder<T> {
    this.subresource.links[name] = link;
    return this;
  }

  public attributes(attributes: T): SubresourceBuilder<T> {
    this.subresource.attributes = attributes;
    return this;
  }
}

export class ResourceBuilder<T extends object> {
  private resource: Resource<T>

  constructor(type: string, selfLink: URL) {
    this.resource = {
      type,
      links: {
        self: selfLink
      },
      subresources: {}
    }
  }

  public getResource(): Resource<T> {
    return this.resource;
  }

  public type(type: string): ResourceBuilder<T> {
    this.resource.type = type;
    return this;
  }

  public id(id: string): ResourceBuilder<T> {
    this.resource.id = id;
    return this;
  }

  public links(links: Links): ResourceBuilder<T> {
    this.resource.links = links;
    return this;
  }

  public selfLink(link: URL): ResourceBuilder<T> {
    this.resource.links['self'] = link;
    return this;
  }

  public link(name: string, link: URL): ResourceBuilder<T> {
    this.resource.links[name] = link;
    return this;
  }

  public attributes(attributes: T): ResourceBuilder<T> {
    this.resource.attributes = attributes;
    return this;
  }

  public subresources(subresources: SubresourceObject): ResourceBuilder<T> {
    this.resource.subresources = subresources;
    return this;
  }

  public subresourceGroup(group: SubresourceGroup): ResourceBuilder<T> {
    const [name, subresourceList] = group;
    this.resource.subresources[name] = subresourceList;

    return this;
  }

  public operations(operations: Operation[]): ResourceBuilder<T> {
    this.resource.operations = operations;
    return this;
  }

  public operation(operation: Operation): ResourceBuilder<T> {
    if (!this.resource.operations) {
      this.resource.operations = [];
    }

    this.resource.operations.push(operation);
    return this;
  }
}

export class SubresourceGroupBuilder<T extends object> {
  private _name: string;
  private _subresources: Subresource<T>[];

  constructor(name: string) {
    this._name = name;
    this._subresources = [];
  }

  public getSubresourceGroup(): SubresourceGroup {
    return [this._name, this._subresources];
  }

  public name(name: string): SubresourceGroupBuilder<T> {
    this._name = name;
    return this;
  }

  public subresources(subresources: Subresource<T>[]): SubresourceGroupBuilder<T> {
    this._subresources = subresources;
    return this;
  }

  public subresource(subresource: Subresource<T>): SubresourceGroupBuilder<T> {
    if(!this._subresources) {
      this._subresources = [];
    }

    this._subresources.push(subresource);
    return this;
  }
}

export class OperationBuilder {
  private operation: Operation;

  constructor(name: string, method: HttpMethod, href: URL) {
    this.operation = { name, method, href };
  }

  public getOperation(): Operation {
    return this.operation;
  }

  public name(name: string): OperationBuilder {
    this.operation.name = name;
    return this;
  }

  public method(method: HttpMethod): OperationBuilder {
    this.operation.method = method;
    return this;
  }

  public href(href: URL): OperationBuilder {
    this.operation.href = href;
    return this;
  }

  public content_type(content_type: string): OperationBuilder {
    this.operation.content_type = content_type;
    return this;
  }

  public fields(fields: Field[]): OperationBuilder {
    this.operation.fields = fields;
    return this;
  }

  public field(field: Field): OperationBuilder {
    if (!this.operation.fields) {
      this.operation.fields = [];
    }

    this.operation.fields.push(field);
    return this;
  }
}

export class FieldBuilder {
  private field: Field;

  constructor(property: string, type: FieldTypes) {
    this.field = { property, type };
  }

  public getField(): Field {
    return this.field;
  }

  public property(property: string): FieldBuilder {
    this.field.property = property;
    return this;
  }

  public type(type: FieldTypes): FieldBuilder {
    this.field.type = type;
    return this;
  }

  public value(value: string | boolean | number): FieldBuilder {
    this.field.value = value;
    return this;
  }

  public pattern(pattern: string): FieldBuilder {
    this.field.pattern = pattern;
    return this;
  }

  public format(format: string): FieldBuilder {
    this.field.format = format;
    return this;
  }
}