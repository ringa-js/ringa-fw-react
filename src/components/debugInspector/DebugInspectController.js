import {Controller, iif} from 'ringa';
import {domNodeToNearestReactComponent, domNodeToNearestReactComponentDomNode, walkReactParents} from 'react-ringa';
import InspectModel from './DebugInspectModel';

/**
 * The DebugInspectController monitors mouse movements using capture and then inspects the item you have selected.
 */
export default class DebugInspectController extends Controller {
  /**
   * Constructs the DebugInspectController. Constructed and attached in App.js.
   */
  constructor(name, bus, options = {}) {
    super(name, bus, options);

    this.options.componentToHTML = this.options.componentToHTML || DebugInspectController.defaultComponentToHTML;

    if (__DEV__) {
      this.addModel(new InspectModel());

      let isDebugEvent = (event) => {
        return event.altKey && event.shiftKey;
      };

      let inspectingDOMNode;

      let highlight = (event, inspectModel) => {
        let target = domNodeToNearestReactComponentDomNode(event.target);

        if (inspectingDOMNode === target) {
          return;
        } else if (inspectingDOMNode) {
          inspectingDOMNode.className = inspectingDOMNode.className.replace(' inspecting', '');
        }

        let cn = target.className;

        if (cn.indexOf('inspecting') === -1) {
          target.className += ' inspecting';
        }

        inspectingDOMNode = event.target;

        let component = domNodeToNearestReactComponent(inspectingDOMNode);

        if (component) {
          let components = walkReactParents(component);

          /**
           * The componentPreprocess allows the end application to decide which order, any filterings, etc.
           * that may need to be applied to the walked react components, allowing filtering of HOCs etc. or
           * merging of HOCs with their wrapped component, making the debugging display cleaner.
           *
           * This is especially useful if you are using the debug inspector in a Material UI application.
           */
          if (this.options.componentPreprocess) {
            components = this.options.componentPreprocess(components);
          }

          let controllersByClass = {};
          let componentsByClass = {};
          let injectionsByKey = {};
          let modelsByName = {};

          let arr = ['###<span class="component">`React.Component`</span> / <span class="ringacomponent" markdown="1">`RingaComponent`</span> / <span class="controller" markdown="1">`Controller`</span> / <span class="model" markdown="1">`Model`</span>. Click to console log.'];

          components.forEach((component, ix) => {

            componentsByClass[component.constructor.name] = component;

            let cn = component.id ? 'ringacomponent' : 'component';

            let defaultWrapper = (text) => {
              return `#### **${ix + 1} <span class="${cn}">${text}</span>**`;
            };

            let newHTMLElements = this.options.componentToHTML(component, ix, defaultWrapper, componentsByClass, injectionsByKey, modelsByName);

            if (newHTMLElements === null) {
              newHTMLElements = DebugInspectController.defaultComponentToHTML(component, ix, defaultWrapper, componentsByClass, injectionsByKey, modelsByName);
            }

            if (newHTMLElements && newHTMLElements.length) {
              arr.push('<div class="inspectee-group" markdown="1">');
              arr = arr.concat(newHTMLElements);
              arr.push('</div>');
            }
          });

          inspectModel.inspectee = {
            stack: arr,
            all: {
              componentsByClass,
              controllersByClass,
              injectionsByKey,
              modelsByName
            }
          };

          /**
           * Do we display the inspector at the top or bottom?
           */
          inspectModel.top = event.pageY > window.innerHeight / 2;

          this.lastComponent = component;
        }

        event.stopPropagation();
      };

      let unhighlight = (event, inspectModel) => {
        if (inspectingDOMNode) {
          inspectingDOMNode.className = inspectingDOMNode.className.replace(' inspecting', '');
        }

        inspectModel.inspectee = inspectingDOMNode = null;
      };

      let stopPropagation = (event) => {
        event.stopPropagation();
      };

      let inspect = (event, inspectModel) => {
        console.log(inspectModel.inspectee.all);

        inspectModel.inspectComponent = this.lastComponent;

        event.stopPropagation();
      };

      this.addListener('mousemove', iif(isDebugEvent, highlight, unhighlight), true);
      this.addListener('mousedown', iif(isDebugEvent, stopPropagation), true);
      this.addListener('mouseup', iif(isDebugEvent, inspect), true);
      this.addListener('click', iif(isDebugEvent, stopPropagation), true);

      console.log('Ringa Inspector is now running. Use ALT + SHIFT to begin inspection.');
    }
  }

  static defaultComponentToHTML(component, ix, defaultWrapper, controllersByClass, injectionsByKey, modelsByName) {
    let controllerStrs = '';
    let arr = [];

    if (component.$ringaControllers) {
      // Controllers
      controllerStrs = component.$ringaControllers.map(controller => {
        controllersByClass[controller.constructor.name] = controller;

        for (let key in controller.injections) {
          injectionsByKey[key] = controller.injections[key];
        }

        let models = [];

        if (controller.modelWatcher) {
          controller.modelWatcher.models.forEach(model => {
            modelsByName[model.name] = model;
            models.push(model);
          });
        }

        return ` - **<span class="controller">${controller.constructor.name}(name='${controller.name || 'no name'}')</span>** Models: ${models.map(m => `<span class="model">${m.constructor.name} (id='${m.id || 'no id'}', name='${m.name || 'no name'})'</span>`).join(', ')}`;
      });
    }

    if (component.constructor.name) {
      arr.push(defaultWrapper(`${component.constructor.name}${component.id ? ` (id='${component.id}')` : ''}`));
      arr = arr.concat(controllerStrs);
    }

    return arr;
  }
}
