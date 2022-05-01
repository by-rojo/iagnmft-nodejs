type DefaultContext<Type> = {
  [P in keyof Type]?: Type[P]
}
