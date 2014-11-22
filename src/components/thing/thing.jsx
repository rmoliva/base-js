NS('BaseJS.components.thing.Thing');

BaseJS.components.thing.Thing = React.createClass({
  render: function() {
    return (
      <p>{this.props.name}</p>
    );
  }
});