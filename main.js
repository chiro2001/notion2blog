// 这里改成你的域名
const MY_DOMAIN = "www.chiro.work"
// 这里改成你的notion的主页
const START_PAGE = "https://www.notion.so/chiro2001/Chiro-s-Blog-a5a50b7b9f3c4515a89816ded0f3445f"

addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST,PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function handleOptions(request) {
  if (request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        "Allow": "GET, HEAD, POST, PUT, OPTIONS",
      }
    })
  }
}

async function fetchAndApply(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request)
  }
  let url = new URL(request.url)
  let response
  if (url.pathname.startsWith("/app") && url.pathname.endsWith("js")) {
    response = await fetch(`https://www.notion.so${url.pathname}`)
    let body = await response.text()
    try {
      response = new Response(body.replace(/www.notion.so/g, MY_DOMAIN)
        .replace(/notion.so/g, MY_DOMAIN)
        // .replace(new RegExp(`${MY_DOMAIN}/image`, "g"), "www.notion.so/image")
        // .replace(new RegExp(`image/https%3A%2F%2Fs3-`, "g"), "www.notion.so/image")
        , response)
      // response = new Response(response.body, response)
      response.headers.set('Content-Type', "application/x-javascript")
      console.log("get rewrite app.js")
    } catch (err) {
      console.log(err)
    }

  } else if ((url.pathname.startsWith("/api"))) {
    response = await fetch(`https://www.notion.so${url.pathname}`, {
      body: request.body, // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
    })
    response = new Response(response.body, response)
    response.headers.set('Access-Control-Allow-Origin', "*")
  } else if (url.pathname === `/`) {
		let pageUrlList = START_PAGE.split("/")
    let redrictUrl = `https://${MY_DOMAIN}/${pageUrlList[pageUrlList.length-1]}`
    return Response.redirect(redrictUrl, 301)
  } else if ((url.pathname.startsWith("/image"))) {
    response = await fetch(`https://www.notion.so${url.pathname}${url.search}`, {
      body: request.body, // must match 'Content-Type' header
      headers: {
        'content-type': 'image',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
      },
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
    response = new Response(response.body, response)
    // response = new Response(url, response);
    response.headers.set('Access-Control-Allow-Origin', "*");
  } else if (url.pathname === `/favicon.ico`) {
    response = await fetch(`https://bed-1254016670.cos.ap-guangzhou.myqcloud.com/blog_favicon.ico`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
      },
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
  } else {
    response = await fetch(`https://www.notion.so${url.pathname}`, {
      body: request.body, // must match 'Content-Type' header
      headers: request.headers,
      method: request.method, // *GET, POST, PUT, DELETE, etc.
    })
  }

  return response
}