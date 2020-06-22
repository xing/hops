const { Mixin } = require('hops-bootstrap');

class GraphQLMockServerMixin extends Mixin {
  enhanceApolloMockServerResponse(res) {
    res.actualSend = res.send;
    res.send = (json) => {
      const { data } = JSON.parse(json);
      data.chirpById.text = 'Hello altered text.';
      res.actualSend(JSON.stringify({ data }));
    };
  }
}

module.exports = GraphQLMockServerMixin;
