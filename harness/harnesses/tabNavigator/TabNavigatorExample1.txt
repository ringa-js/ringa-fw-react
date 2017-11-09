import React from 'react';
import {TabNavigator, Tab, RingaComponent} from '../../../src/index';

class TabNavigatorExample extends RingaComponent {
  //-----------------------------------
  // Constructor
  //-----------------------------------
  constructor() {
    super();
  }

  //-----------------------------------
  // Lifecycle
  //-----------------------------------
  render() {
    return <TabNavigator>
      <Tab label="Red">
        <img width={300} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/China-Shanghai-YuGarden-the_Lantern_Festival-2012_1828.JPG/336px-China-Shanghai-YuGarden-the_Lantern_Festival-2012_1828.JPG" />
        <img width={300} src="https://wallpaperclicker.com/storage/wallpaper/red-wallpaper-22010068.jpg" />
        <img width={300} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_tikka_powder.jpg/400px-Red_tikka_powder.jpg" />
      </Tab>
      <Tab label="Blue">
        <img width={300} src="http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/04/blue/16903216-1-eng-GB/Blue.jpg" />
        <img width={300} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/290px-Starry_Night_Over_the_Rhone.jpg" />
        <img width={300} src="https://lh3.googleusercontent.com/mCVsAtG1EpSwbaGIkSo1v2WFkwKG_khaAz0iP9F3uuDkxzfYarKAfIIJVuq0FfiC7gCLu5cP=w640-h400-e365" />
      </Tab>
      <Tab label="Green">
        <img width={300} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Limes.jpg/339px-Limes.jpg" />
        <img width={300} src="https://static.pexels.com/photos/38012/pexels-photo-38012.jpeg" />
        <img width={300} src="https://static.pexels.com/photos/212324/pexels-photo-212324.jpeg" />
      </Tab>
    </TabNavigator>;
  }
}

export default TabNavigatorExample;
