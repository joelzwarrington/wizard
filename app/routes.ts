import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('games', 'routes/games.tsx'),
  route('games/new', 'routes/games/new.tsx'),
  route('games/:id', 'routes/games/game.tsx')
] satisfies RouteConfig
