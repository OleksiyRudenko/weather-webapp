# Building the Project

## Installation

Have `nodeJS` and `npm` installed.

Install `parcelJS` globally:
`yarn global add parcel-bundler` or `npm i -g parcel-bundler`.

`yarn install` or `npm install`

`yarn start` or `npm start` to serve app at http://localhost:1234

`yarn build` or `npm build` to build app at `./dist`

## Known Issues

**Issue**: `UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): SyntaxError: 'super' keyword unexpected here`

**Solution**: Upgrade `nodeJS` and `npm`

## Notes and Learnings

### Import Images

```
// images/index.js
import Explore from './explore.png';
import Library from './library.png';
export default { Explore, Library };

// app.js
import images from '../images';
const explore = images.Explore;

import * as icons from '../icons';
`<img src={icons.Search} alt="" />`
```
