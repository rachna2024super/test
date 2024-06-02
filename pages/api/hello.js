export default async function handler(req, res) {
  // Only GET requests work with this proxy.
  if (req.method !== 'GET') {
    return MethodNotAllowed(req, res);
  }

  req.url = req.url.replaceAll("/_feather", "/_next");
  const url = new URL(req.url, `https://${process.env.SITE}`);
  const data = await fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
  });
  
  const type = data.headers.get('content-type');

  switch (type) {
    case 'text/html; charset=utf-8': {
      let text = await data.text();
      let modified = text.replace('<head>', `<head><link rel="stylesheet" href="${process.env.CSS_LINK}">`);
      modified = modified.replace('<head>', '<head><meta name="description" content="Tech Enthusiast who loves content and code. ">');
      modified = modified + '<style> .super-badge{ display:none}</style>';
      modified = modified + '<script> window.location.reload(false);';
      modified = modified.replace('googlebot', 'hsbbot');
      modified = modified.replace('robots', 'lol');
      modified = modified.replace('googlebot', 'hsbbot');
      modified = modified.replace('robots', 'lol');
      modified = modified.replaceAll("/_next", "/_feather");
      modified = modified.replaceAll("/_feather/image", "/_next/image");
      modified = modified.replace(process.env.SITE, 'vercel.me');
      modified = modified.replace(process.env.SITE, 'vercel.me');
      modified = modified.replace(process.env.SITE, 'vercel.me');
      res.status(data.status).send(modified);
      break;
    }

    case 'application/javascript; charset=utf-8': {
      let text = await data.text();
      let modified = text.replace('googlebot', 'hsbbot');
      modified = modified.replace('robots', 'lol');
      res.status(data.status).send(modified);
      break;
    }

    case 'text/plain': {
      if (url.pathname.includes('robots.txt')) {
        let text = await data.text();
        let modified = text.replace('Disallow: /', 'Disallow: ');
        res.status(data.status).send(modified);
      } else {
        res.status(data.status).send(await data.text());
      }
      break;
    }

    case 'application/xml': {
      if (url.pathname.includes('sitemap')) {
        const modified = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://vercel.me/</loc></url></urlset>';
        res.status(data.status).send(modified);
      } else {
        res.status(data.status).send(await data.text());
      }
      break;
    }

    default: {
      res.status(data.status).send(await data.text());
      break;
    }
  }
}

function MethodNotAllowed(req, res) {
  res.setHeader('Allow', 'GET');
  res.status(405).send(`Method ${req.method} not allowed.`);
}
