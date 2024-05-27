export const bind: MethodDecorator = (target, name, descriptor: PropertyDescriptor) => {
  target.constructor[name] = descriptor.value.bind(this)
  return descriptor
}
