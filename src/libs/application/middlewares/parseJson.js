export const parseJson = (req, res, next) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  res.setHeader('Content-Type', 'application/json');

  res.send = (data) => {
    res.end(JSON.stringify(data));
  };

  req.on('end', () => {
    if (body) {
      req.body = JSON.parse(body);
    }
    next();
  });
};
