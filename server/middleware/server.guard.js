import xss from 'xss';
export const xss_protection = (request, response, next) => {
  for (let key in request.query) {
    request.query[key] = xss(request.query[key]);
  }
  for (let key in request.body) {
    request.body[key] = xss(request.body[key]);
  }
  for (let key in request.params) {
    request.params[key] = xss(request.params[key]);
  }
  next();
}