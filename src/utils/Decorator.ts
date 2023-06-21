import { DebounceSettings, ThrottleSettings, debounce, throttle } from 'lodash'
declare type MethodDecorator<T = unknown> = (
  target: T,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => PropertyDescriptor | void

export const Debounce =
  <T>(wait: number, options: DebounceSettings = {}): MethodDecorator<T> =>
  (target, propertyKey, descriptor) => {
    Object.assign(descriptor, {
      value: debounce(descriptor.value, wait, options)
    })
    return descriptor
  }

export const Throttle =
  <T>(wait: number, options: ThrottleSettings = {}): MethodDecorator<T> =>
  (target, propertyKey, descriptor) => {
    Object.assign(descriptor, {
      value: throttle(descriptor.value, wait, options)
    })
    return descriptor
  }
