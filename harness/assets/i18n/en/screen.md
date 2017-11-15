##`ScreenModel`

The `ScreenModel` provides:

* Customizable Breakpoints via the `breakpoints` property for different Screen resolutions (defaults provided)
* A `curBreakpointIx` for rapid switching of view layouts based on which device you are on
* A `curBreakpoint` property Object if you want to attach more details to each resolution

Example:

    import {dependency} from 'react-ringa';
    import ScreenModel from 'ringa-fw-react/src/models/ScreenModel';

    // When extending RingaComponent
    this.depend(dependency(ScreenModel, 'curBreakpointIx'));

##ScreenController

While you can instantiate your own `ScreenModel` and add it to your own `Controller`, there is a default
`ScreenController` provided:

Example:

    import {dependency} from 'react-ringa';
    import {ScreenController} from 'ringa-fw-react';

    ...

    // In RingaComponent Constructor
    this.attach(new ScreenController());
   
If your application root extends `DefaultApplicationRoot` the `ScreenModel` is already provided.

##Multiple ScreenControllers

There might be special scenarios where some sections of your application need different breakpoints. Nothing is
stopping you from providing multiple `ScreenControllers` attached at different nodes in your tree. By default, as
with all Ringa models, when using `depend()` the first available one within the ancestors is injected. This would
allow you to have entire subsections of your DOM tree driven by a different set of breakpoints.