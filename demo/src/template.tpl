<!DOCTYPE html>
<html>
  <head>
    <title>Hops Example</title>
    <% if (process.env.NODE_ENV === 'production') { %>
    <link rel="stylesheet" href="/main-<%= version %>.css" />
    <% } %>
  </head>
  <body>
    <div id="main"><%= markup %></div>
    <script src="/main-<%= version %>.js"></script>
  </body>
</html>
