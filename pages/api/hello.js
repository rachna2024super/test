export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return MethodNotAllowed(req, res);
  }

  try {
    const url = new URL(req.url, `https://${process.env.SITE}`);
    const data = await fetch(url.toString(), {
      method: req.method,
      headers: req.headers,
    });

    const type = data.headers.get('content-type');

    let text = await data.text();

    switch (type) {
      case 'text/html; charset=utf-8':
        text = text.replace('<head>', `<head><link rel="stylesheet" href="${process.env.CSS_LINK}">`);
        text = text.replace('<head>', '<head><meta name="description" content="Tech Enthusiast who loves content and code.">');
        text = text.replace('</body>', '<style> .super-badge{ display:none}</style></body>');
        text = text.replace('</body>', '<script> window.location.reload(false);</script></body>');
        text = text.replace(/googlebot/g, 'hsbbot');
        text = text.replace(/robots/g, 'lol');
        text = text.replace(new RegExp(process.env.SITE, 'g'), 'vercel.me');
        res.status(data.status).send(text);
        break;

      case 'application/javascript; charset=utf-8':
        text = text.replace(/googlebot/g, 'hsbbot');
        text = text.replace(/robots/g, 'lol');
        res.status(data.status).send(text);
        break;

      case 'text/plain':
        if (url.pathname.includes('robots.txt')) {
          text = text.replace('Disallow: /', 'Disallow: ');
          res.status(data.status).send(text);
        } else {
          res.status(data.status).send(text);
        }
        break;

      case 'application/xml':
        if (url.pathname.includes('sitemap')) {
          const modified = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://vercel.me/</loc></url></urlset>';
          res.status(data.status).send(modified);
        } else {
          res.status(data.status).send(text);
        }
        break;

      default:
        res.status(data.status).send(text);
        break;
    }
  } catch (error) {
    console.error('Error during proxying:', error);
    res.status(500).send('Internal Server Error');
  }
}

function MethodNotAllowed(req, res) {
  res.setHeader('Allow', 'GET');
  res.status(405).send(`Method ${req.method} not allowed.`);
}
