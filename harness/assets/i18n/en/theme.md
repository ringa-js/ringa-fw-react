##`Theme`

The `Theme` Container is used at the *root of your application* (e.g. the same place you would put the `OverlayContainer`
and `ModalContainer`) to wrap every React Component and provide a single root CSS class upon which every other style 
in the application depends. If for whatever reason you wanted to have multiple themes in your application at once, 
you certainly could by having two root `Theme` objects as long as they were not nested. In this example, the theme 
`div` switches between `'sunbeam'` and `'classic'` quickly depending on what is chosen in the dropdown, simply by
setting a single property on the `ThemeModel` which is attached by default to the `Theme` React Component and accessible
through the standard `depend()` call.

To use a theme, you simply need to include the appropriate CSS in your application or use SASS/SCSS to load the
appropriate theme root `index.scss` file during your build.

Below is an example of how to switch the theme in the application and just how easy it is. All components in the Ringa
framework are built in the same fashion making it easy to change the entire look and feel of your application in one
shot. In addition you can override every single style in the Ringa React Framework easily. See the documentation for
more details (coming soon).

##Example

If your are extending and using `DefaultApplicationRoot` you do not need to do this:

    import Theme from 'ringa-fw-react/src/components/containers/Theme';
    
    // At the root of your application
    render() {
      return <Theme theme="classic"> // By default the theme is classic, but you can swap it out here easily
        {this.props.children} // All the rest of your application here
      </Theme>;
    }
    
    