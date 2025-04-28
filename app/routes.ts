import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('games/new', 'routes/games/new.tsx')
] satisfies RouteConfig
