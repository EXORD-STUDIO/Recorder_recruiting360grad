<script>
  import { Router, Link, Route } from 'svelte-routing'

  export let url = ''
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/blog">Blog</Link>
  </nav>
  <div>
    <Route path="/blog">Blog</Route>
    <Route path="/about">About</Route>
    <Route path="/">Huhu</Route>
  </div>
</Router>
