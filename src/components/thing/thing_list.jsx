NS('BaseJS.components.thing.ThingList');

BaseJS.components.thing.ThingList = React.createClass({
  render: function() {
    return (
      <h1>My Things:</h1>,
      <BaseJS.components.thing.Thing name="Hello World!" />
    );
  }
);