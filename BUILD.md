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

## PostCSS plug-ins

**Plug-ins**
 * `cssnano` - adjustable minificator
 * `postcss-assets` - image handling
 * `postcss-cssnext` - future features today
 * [`rucksack-css`](https://www.rucksackcss.org/) - easening
 * [style linting](https://www.sitepoint.com/improving-the-quality-of-your-css-with-postcss/)
 * `css-mqpacker` - css inliner
 * `autoprefixer`

**Collections**
 * [sitepoint](https://www.sitepoint.com/7-postcss-plugins-to-ease-you-into-postcss/)
 * [habra](https://habrahabr.ru/post/265449/)
