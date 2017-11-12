import React from 'react';

import RingaComponent from '../../components/RingaComponent';
import Button from '../../components/input/Button';
import ModalToggleContainer from '../../components/modal/ModalToggleContainer';
import Markdown from '../../components/complex/Markdown';

import DebugInspectModel from './DebugInspectModel';
import DebugInspectController from './DebugInspectController';

import {dependency} from 'react-ringa';
import {InspectorModel, InspectorController} from 'ringa';

import classnames from 'classnames';

let d = (v) => {
  return isNaN(v) ? '' : v;
};

export default class DebugInspector extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(props) {
    super(props);

    // We will force the inspector to be global for now.
    this.attach(new DebugInspectController(undefined, document));
    this.attach(new InspectorController());

    this.depend(dependency(DebugInspectModel, ['inspectComponent', 'inspectee', 'top']),
                dependency(InspectorModel));
  }

  //-----------------------------------
  // Methods
  //-----------------------------------
  renderRingaObject(ringaObject) {
    return <div key={ringaObject.id} className="object" onClick={() => {console.log(ringaObject)}}>{ringaObject.id}</div>;
  }

  ringaObjectSort(a, b) {
    if (typeof a.toString() !== 'string' || typeof b.toString() !== 'string') {
      return a.id.toString().toLowerCase() > b.id.toString().toLowerCase() ? 1 : -1;
    }

    return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1;
  }

  render() {
    let {inspectorModel, inspectComponent, inspectee, top} = this.state;

    let cn = this.calcClassnames('debug-inspector');

    let inspecteeClasses = inspectee ? classnames('inspectee', {
      'inspectee-top': top,
      'inspectee-bottom': !top
    }) : '';

    return <div>
      <ModalToggleContainer show={!!inspectComponent}
                                 onClose={this.inspector_closeHandler}
                                 title="Ringa Inspector"
                                 position="centered"
                                 width={300}
                                 height={400}>
        <div className={cn}>
          <div className="inspector-content">
            <div className="panels">
              <div className="panel ringa-objects">
                <div className="title">Ringa Objects ({inspectorModel.ringaObjects ? inspectorModel.ringaObjects._list.length : 'N/A'})</div>
                <div className="subtitle">Click to console log</div>
                <div className="panel-content">
                  {inspectorModel.ringaObjects ? inspectorModel.ringaObjects._list.sort(this.ringaObjectSort).map(this.renderRingaObject) : 'N/A'}
                </div>
              </div>
            </div>
            <Button label="Throw a random error" onClick={this.throw_onClickHandler} />
          </div>
        </div>
      </ModalToggleContainer>
      {inspectee ? <div className={inspecteeClasses}><Markdown markdown={inspectee.stack.join('\n')} /></div> : null}
    </div>;
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  throw_onClickHandler() {
    throw new Error('Some thrown error!');
  }

  inspector_closeHandler() {
    const {inspectModel} = this.state;

    inspectModel.inspectComponent = undefined;
  }
}
