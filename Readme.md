# Ringa JS React Framework

This library is the foundational components for the React Ringa framework.

This portion of Ringa JS is released under the AGPL 3.0. If you intend to make money commercially off of this software, please purchase the commercial license. For more information see [License and Purchase Information](http://www.ringajs.com/purchase).

`ringa` and `react-ringa` are freely available under the MIT license without purchase for use in non-commercial software.

# Installing

`npm install`

# Development

The development harness allows you to play around with the components and quickly develop them:

`npm start`

# Compile for distribution

When running the build, you will compile the core components for production.

`npm run build`

# Release

This runs the tests, builds the final core components uglified JS artifact, and then releases it to NPM:

* `npm run release:patch` (0.0.+)
* `npm run release:minor` (0.+.0)
* `npm run release:major` (+.0.0)

License
=======

AGPL 3.0 for free. MIT License for commercial paying users.