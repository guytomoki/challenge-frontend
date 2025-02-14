# challenge-frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.


## App design

The app has been implemented using angular's new standalone style without using modules.

It uses as well angular new control flows: https://angular.dev/guide/templates/control-flow

Bootstrap and ng-bootstrap have been used to ease the design of the frontend and its responsiveness.

The PDF.js library has been used to render the pdfs.

Material Icons have been used to display icons.

EN <> FR internationalization has been made using ngx-translate.

After authentication, the JWT token is stored in memory and not in local/session storage.

The language selection is the only information stored in local storage.

When receiving some errors from the backend, e.g. trying to sign although all documents have not been confirmed yet, an event will be emit to a toast component that will display an error message to the user.

When the error relates to the login, it will display the error on the login fields.
