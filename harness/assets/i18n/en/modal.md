##`Modal`

The `Modal` class collection is used to display modal windows in your Ringa application.

Every Modal begins with an instance of `ModalModel`. Each `ModalModel` extends `PositionableModel`, which
is a class that abstracts the properties needed to display an absolutely positioned item on the screen on top
of everything else. `ModalModel` adds various properties that are used primarily for a Modal, like `title`.

For Modals to be displayed, you must have at least one `ModalContainer` in your display heirarchy. If your
Ringa application has a `DefaultApplicationRoot` then you already have a `ModalContainer`.

Modals are controlled through three Ringa events:

* **`ModalContainerController.SHOW_MODAL`**
* **`ModalContainerController.REMOVE_MODAL`**
* **`ModalContainerController.REMOVE_ALL_MODALS`**

If you want great control over modal display, you can use these yourself. However, it is much easier to use
the convenience methods to show and hide modals, like this:

    import { Modal } from 'ringa-fw-react';
    
    const modalModel = Modal.show({ title: 'Hello!' });
    ...
    modalModel.remove();

## `Modal.show(options)`

Use `Modal.show(options)` to display a new Modal in the application. For example:

    class ModalExample {
      render() {
        return this.props.passedModalText;
      }
    }
    ...
    Modal.show({
        title: 'Example 1',
        renderer: ModalExample,
        rendererProps: {
          passedModalText: 'Hello world!'
        },
        position: 'centered',
        draggable: true,
        width: 300,
        height: 100
      });

**Options**

* **`renderer`** a pure function or a React class to render the contents of the modal.
* **`rendererProps`** React properties to pass to the `renderer` instance.
* **`title`** The title of the modal
* **`showCloseButton`** Show the close button? Default is true.
* **`draggable`** When true the Modal is draggable. Default is false.
* **`showHeader`** Show the header with the title and close button? Default is true.
* **`target`** If you want the modal to be "sticky" to a DOM node, pass that in here.
* **`width`** CSS width. Can be a pixel width or something like `em`, `vw`, `calc()` etc.
* **`maxWidth`** as described
* **`height`** CSS height. Can be a pixel width or something like `em`, `vw`, `calc()` etc.
* **`maxHeight`** as described ()includes the header).
* **`blockMouseEvents`** when true, the `ModalContainer` responsible for this modal will block all mouse events from the rest of the application.
* **`classes`** any CSS classes you want to add to the root div of the Modal.
* **`singleton`** if true, any other Modals that were declared as singletons will be closed when this one appears. Default false.
* **`singletonGroup`** if a String, all other Modals that were declared with the same singletonGroup will be closed when this one appears.
* **`forceInViewport`** force the Modal into the viewport. Default is true. Slightly different rules are followed depending on the position type (e.g. `target` vs. `xy`).
* **`position`** one of:
  * `'centered'`: position the Modal in the center of the screen.
  * `'auto'`: default, try to figure out how to position the modal from other properties provided.
  * `'top'`, `'bottom'`, `'left'`, `'right'`: only used if you provide a `target`. This is the first attempted side of the target to display the modal on.
  * `'xy'`: for absolute positioning of your Modal. Calculates position based on `x` and `y` and possibly `offset`.
* **`positionAlternate`** the chosen position of the Modal if the first position causes a portion of the modal to
be offscreen. Only used if `forceInViewport` is `true`.
* **`align`** when using `target` this is the edge of the target to open from.
* **`alignAlternate`** if the first attempted `position` of the Modal causes it to be offscreen and `forceInViewport` is true, this is the next attempted `align`.
* **`shift`** when using `target` this is the edge of the modal to align with the align point in the target.
* **`shiftAlternate`** if the first attempted `position` of the Modal causes it to be offscreen and `forceInViewport` is true, this is the next attempted `shift`.
* **`global`** if multiple `ModalContainer` parents exist, then this will use the one that has `global` set.
* **`mouseDownOutsideHandler`** a function to call when the user clicks outside of the Modal. Can be used to close the Modal when the mouse is clicked outside of it.
* **`mouseLeaveHandler`** a function to call when the mouse leaves the modal.
* **`onPositionUpdateHandler`** a function to call when a new position for the modal is calculated.
* **`closeTimeout`** milliseconds to wait after `remove()` is called on the model before actually removing the modal. Useful for close effects.
* **`openTimeout`** milliseconds to wait after the modal is shown before actually making the modal interactive. Useful for open effects.
* **`$ringaAlternateParentComponent`** If you want this Modal to exist as if another component is its parent for dispatching of Ringa events, use this.




