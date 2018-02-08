# Application Architecture


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Intro](#intro)
- [Framework](#framework)
- [Bootstrapping](#bootstrapping)
- [Specialized App Components](#specialized-app-components)
  - [Services](#services)
  - [UI Controllers](#ui-controllers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Intro

App comprises:
- View
- UI Controllers
- Functional Controllers
- Services
- Proprietary Data Providers

View Elements are managed by UI Controllers only.
Functional Controllers are app component bootstrappers and
activity medias.
Controllers may interact with other Controllers and Services.
Services respond to data requests from Controllers and other Services
and store data supplied by Controllers.
Services employ Data Providers and external services
like `IndexedDB`, `localStorage`, foreign resources
over API, static and/or non-persistent sources.

[_-- TOC --_](#table-of-contents)

## Framework

`AppComponent` is an abstract class featuring properties and methods
common for all components (Services, Controllers)

`AppServiceComponent` is an abstract class featuring properties
and methods common for all Services.

`AppControllerComponent` is an abstract class featuring properties
and methods common for all Controllers (Functional or general use
controllers and their derivatives).

`AppUiControllerComponent` is an abstract class featuring properties
and methods specific to Controllers managing View elements.

[_-- TOC --_](#table-of-contents)

## Bootstrapping

`AppController` is a Functional Controller that bootstraps the App:
 - consumes global configuration object
 - creates required components
 - supplies components with configuration and dependencies
 - supplies UI Controllers with immediate references to View elements

[_-- TOC --_](#table-of-contents)

## Specialized App Components

### Services

[_-- TOC --_](#table-of-contents)

### UI Controllers

[_-- TOC --_](#table-of-contents)
