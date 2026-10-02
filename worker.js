/**
 * BananaTech.in - Cloudflare Worker Static Asset Router
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Try to fetch the static asset directly
    let response = await env.ASSETS.fetch(request);

    // 2. If not found and no file extension in URL, try clean URL (e.g. /services -> /services.html)
    if (response.status === 404 && !url.pathname.includes('.')) {
      const cleanPath = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;
      const htmlUrl = new URL(`${cleanPath}.html${url.search}`, url.origin);
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (htmlResponse.status === 200) {
        return htmlResponse;
      }
    }

    // 3. Fallback to 404.html if page not found
    if (response.status === 404) {
      const notFoundUrl = new URL('/404.html', url.origin);
      const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl, request));
      if (notFoundResponse.status === 200) {
        return new Response(notFoundResponse.body, {
          status: 404,
          headers: notFoundResponse.headers
        });
      }
    }

    return response;
  }
};
