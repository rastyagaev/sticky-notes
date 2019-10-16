Simple post-it application

### Database access

We use firebase for hosting and database and before development or deployment
you need to create an `.env` file with the following contents:

```
REACT_APP_FIREBASE_KEY=<your-firebase-api-key>
REACT_APP_PROJECT_ID=<your-firebase-project-id>
```

### Deployment

We don't have auto-deployment functionality yet, so before deploy you need to build the app and deploy it to firebase. Please install firebase-cli before: https://firebase.google.com/docs/cli#install_the_firebase_cli

```
yarn build
firebase deploy
```
