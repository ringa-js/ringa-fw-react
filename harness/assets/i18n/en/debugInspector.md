##DebugInspector

The `DebugInspector` shows on your screen to provide contextual information on:

* The ancestors of all the components underneath the mouse and whether they extend `RingaComponent` or are standard `React.Component` objects.
* All the attached Ringa `Controller` objects at each point in the stack.
* All the available Ringa `Model` objects available through each `Controller`.

##Try it out now!
<div class="debug" markdown="1">
**Hold down [ALT]+[SHIFT] and move the mouse around the screen.**
</div>
For each object, the inspector shows the type and `id`.

## Where to Install it

**If you are extending and using `DefaultApplicationRoot`, the `DebugInspector` is automatically provided to you.**

However, if you are using a custom layout, we recommend attaching the `DebugInspector` near the root of your
application. Something like this would do:


    import DebugInspector from 'ringa-fw-react/src/components/debugInspector/DebugInspector';
    import Theme from 'ringa-fw-react/src/components/containers/Theme';
    ...
    
    render() {
      return <Theme>
        {this.props.children} // The rest of your application...
        <DebugInspector />
      </Theme>;
    }

##When to Use It

* To find what a control is called in a large application
* To find what `Model` objects are already available for use with `depend()`
* To debug potential duplicate or missing `Model` objects
* To analyze the structure of a new application or an application that you have not visited in a while

##Production and DebugInspector

The `DebugInspector` only turns on when `__DEV__` is defined and truthy in your build.