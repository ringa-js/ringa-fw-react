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
  constructor(name, bus, options) {
    super(name, bus, options);

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
        let controllersByClass = {};
        let componentsByClass = {};
        let injectionsByKey = {};
        let modelsByName = {};

        let arr = ['##Ringa Inspect', '###React Component Heirarchy / Attached Controllers / Provided Models'];

        components.forEach((component, ix) => {
          componentsByClass[component.constructor.name] = component;

          let controllerStrs = '';

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

              return ` - **${controller.constructor.name}:${controller.name}** (${models.map(m => `${m.constructor.name}:${m.name}`).join(', ')})`;
            });
          }

          if (component.constructor.name) {
            arr.push(`#### **${ix + 1} ${component.constructor.name}**:${component.id}`);
            arr = arr.concat(controllerStrs);
          }
        });

        arr.push('Click to console log');

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
    this.addListener('mouseup',   iif(isDebugEvent, inspect), true);
    this.addListener('click',     iif(isDebugEvent, stopPropagation), true);

    console.log('Ringa Inspector is now running. Use ALT + SHIFT to begin inspection.');
  }
}