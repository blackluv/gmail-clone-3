gmail-clone
====

### Filters

<!-- JavaScript inside expression -->
<h1>{{ [ firstName, lastName ].join(" ") }}</h1>
<!-- currency filter applied to a multiplication of 2 numbers -->
<div class="total-info">{{ cost * quantity | currency }}</div>
<!-- Using a ternary expression inside the expression -->
<div class="budget">{{ ( total > budget ) ? "Too Expensive" : "You can buy it!" }}</div>


### Directive

app.directive('myCustomElement', function myCustomElement() {
   return {
      restrict: 'EA',
      replace: true,
      scope: true,
      template: [
         "<div>",
         "	<h1>My Custom Element's Heading</h1>",
         "	<p>Some content here!</p>",
         "	<pre>{{ ctrl.expression | json }}</pre>,"
         "</div>"
      ].join(""),
      controllerAs: 'ctrl',
      controller: function ($scope) {
         this.expression = {
            property: "Example"
         }
      },
      link: function (scope, element, attrs) {}
   }
});