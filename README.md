# CPaaS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.


# Scripts

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## App folder structure

CORE:
- constants: routes for the core-routing.module, keys for the local storage etc;
- singleton services;
- guards;
- interceptors;
- root pages: e.g. CorePageComponent, NotFoundComponent etc;
- core providers: e.g. local-storage.provider etc;
- core translation module;
- core routing module;

SHARED:
- directives;
- pipes;
- helpers;
- common modules;
- validators;

INTERFACES:
- common interfaces;
- interfaces from feature moduels;

FEATURES:
- lazy-routable modules;


## Additional NPM packages:

- "@ngx-translate/core": "^13.0.0"
- "@ngx-translate/http-loader": "^6.0.0"
- "@biesbjerg/ngx-translate-extract": "^7.0.4"


## Project style guide

Please check the features/sample folder, it contains the boilerplate for feature modules, including folders structure, file namings etc.

1. Implementation of a new feature module should be started basing on features/sample.

2. Use the following shortcuts when addressing files:
- "@app/*" - root folder, e.g. "@app/shared/modules/...";
- "@env/*" - contains environment files, e.g. "@app/environment/environment.prod";
- "@testing/*";

2. Consider adding additional functionality either to core.module or to shared.module, the content of the app.module and core component should be as lean as possible.

3. Use the interfaces folder for storing any global interaces and for reexporting interfaces of the feature modules when required.

4. Use the folowing naming convention for names of files:
- name.module.ts;
- name-routing.module.ts;
- name.component.ts / -.html / .-scss / .-spec.ts;
- name.constant.ts;
- name-routes.constant.ts
- name.interface.ts;
- name.service.ts;
- name.interceptor.ts;
- name.guard.ts;
- name.provider.ts;
- name.pipe.ts;
- name.directive.ts;

5. Use double quotes mark in *.html files only.

6. Use indentation with two spaces.

7. Use the following order when importing in *.ts files:
- angular imports;
- rxjs imports;
- third party imports;
- application level modules;
- other application level elements;
- local modules;
- other local elements;
Use a single line to delimeter imports' blocks.

8. Use the following order in the component class:
- inputs, e.g. @Input() name;
- outputs, e.g. @Output() name;
- public properties;
- private properties;
- constructor;
- ngOnInit() hook;
- other hooks when required;
- methods;
- ngOnDestroy() hook;

8. Use the following order in *.scss files:
- imports, e.g. @import 'filename';
- variables, e.g. $color-primary: #fff;
- mixins;
- keyframes;
- other css code;

9. All methods in a component's class should be marked with corresponding access modifiers, e.g. public onSave().

10. Add interfaces whenever it is possible.

11. Use 'any' interface explicitely, but only in places where it is really expected.

12. Use the following format for todo comments: 'TODO: [text goes here]'.
