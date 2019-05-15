const getHeaders = (status, headers) => {
  if (status === 429) {
    const retryAfter = headers.get('retry-after');
    return retryAfter ? { 'retry-after': retryAfter } : {};
  }
  return {};
};

module.exports = error => {
  if (!error.networkError || !error.networkError.response) {
    return error;
  }

  const {
    status: statusCode,
    statusText,
    headers: responseHeaders,
  } = error.networkError.response;
  const status = statusCode === 429 ? 429 : 500;
  const headers = getHeaders(status, responseHeaders);
  const message = statusCode === 200 ? 'Not Acceptable' : statusText;
  const fetchError = Object.assign(new Error(message), {
    name: 'HopsGraphQlError',
    original: error.networkError,
    headers,
    status,
  });

  return fetchError;
};
