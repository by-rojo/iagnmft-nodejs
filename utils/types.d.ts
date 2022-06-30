type GenericObject = {
  [P in keyof Type]?: Type[P]
}
