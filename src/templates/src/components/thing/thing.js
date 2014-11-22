NS('BaseJS.components.thing.Thing');

BaseJS.components.thing.Thing = React.createClass({displayName: 'Thing',
  render: function() {
    return (
      React.createElement("p", null, this.props.name)
    );
  }
});