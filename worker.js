/**
 * BananaTech.in - Cloudflare Worker Static Asset Router
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
