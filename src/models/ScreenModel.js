import {Model} from 'ringa';

export default class ScreenModel extends Model {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor(name) {
    super(name);

    window.addEventListener('resize', this.window_resizeHandler.bind(this));

    this.addProperty('breakpoints', [{
      name: 'tinyMobile',
      maxWidth: 320
    }, {
      name: 'mobile',
      maxWidth: 480
    },{
      name: 'iPadMini',
      maxWidth: 768
    },{
      name: 'iPad',
      maxWidth: 1024
    },{
      name: 'Desktop',
      maxWidth: 10000
    }]);

    this.addProperty('curBreakpoint');
    this.addProperty('curBreakpointIx');

    this.window_resizeHandler();
  }

  //-----------------------------------
  // Events
  //-----------------------------------
  window_resizeHandler() {
    this.curBreakpoint = this.breakpoints.find((bp, ix) => {
      let match = bp.maxWidth > window.innerWidth

      if (match) {
        this.curBreakpointIx = ix;
      }

      return match;
    }).name;
  }
}
