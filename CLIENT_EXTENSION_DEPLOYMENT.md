# Client Extension Deployment Guide

This guide explains how to build, deploy, and verify the `my-react-app` client extension in the local Liferay workspace.

## Project Location

Client extension:

```text
client-extensions/my-react-app
```

Local Liferay bundle configured in `gradle.properties`:

```text
C:\Deepanshu\New Setup Liferay\Server\liferay-dxp
```

## 1. Start Liferay

Start the local Liferay server first.

If using the bundled Tomcat, run:

```powershell
C:\Deepanshu\New Setup Liferay\Server\liferay-dxp\tomcat-*\bin\startup.bat
```

Then open:

```text
http://localhost:8080
```

Wait until Liferay is fully started before deploying.

## 2. Check Client Extension Configuration

For a React app deployed as a Liferay custom element, `client-extension.yaml` should contain the JavaScript and CSS files that Liferay must load.

Example:

```yaml
assemble:
    - from: dist
      into: static

my-react-app:
    type: customElement
    cssURLs:
        - assets/index.css
    htmlElementName: my-react-app
    friendlyURLMapping: my-react-app
    instanceable: false
    name: My React App
    portletCategoryName: category.client-extensions
    urls:
        - assets/index.js
    useESM: true
```

Important fields:

- `type: customElement`: registers this as a custom element widget.
- `htmlElementName: my-react-app`: Liferay renders this tag on the page.
- `urls`: JavaScript file to load.
- `cssURLs`: CSS file to load.
- `name`: display name shown inside Liferay.

## 3. Build and Deploy

From the workspace root, run:

```powershell
.\gradlew.bat client-extensions:my-react-app:deploy
```

This command:

- installs frontend dependencies if needed,
- runs the React build,
- packages the client extension,
- deploys the zip into the local Liferay bundle.

Successful output should include:

```text
BUILD SUCCESSFUL
```

The deployed file should be created here:

```text
C:\Deepanshu\New Setup Liferay\Server\liferay-dxp\osgi\client-extensions\my-react-app.zip
```

## 4. Verify in Liferay

Open:

```text
http://localhost:8080
```

Then:

1. Go to a site page.
2. Edit the page.
3. Add a widget/application.
4. Look under the Client Extensions category.
5. Add `My React App`.
6. Publish the page.

## 5. If the Widget Is Blank

Try these checks in order.

### Refresh the Browser

Use a hard refresh:

```text
Ctrl + F5
```

### Remove and Add the Widget Again

Sometimes Liferay keeps the older page fragment instance. Remove `My React App`, add it again, and publish.

### Check the Generated Client Extension Config

The generated config inside the deployed zip should contain:

```text
urls=assets/index.js
cssURLs=assets/index.css
htmlElementName=my-react-app
```

### Check Browser Console

Open browser developer tools and check:

- Console tab for JavaScript errors.
- Network tab for missing `index.js`, `index.css`, images, or SVG files.

Common issue:

```text
404 /assets/index.js
```

This usually means the Vite base path or `client-extension.yaml` URLs are wrong.

## 6. React Custom Element Requirement

For Liferay custom elements, the React app should mount inside the custom element tag instead of only using:

```javascript
document.getElementById('root')
```

The app should define:

```javascript
customElements.define('my-react-app', MyReactApp)
```

This is required because Liferay renders:

```html
<my-react-app></my-react-app>
```

## 7. Node Version Note

This workspace uses a Gradle-managed Node runtime. Vite required Node `20.19.0` or newer, so the root `build.gradle` sets:

```gradle
allprojects {
	plugins.withId("com.liferay.node") {
		node {
			nodeVersion = "20.19.0"
		}
	}
}
```

If the build fails with a Node/Vite version error, check this setting first.

## Useful Commands

List Gradle tasks:

```powershell
.\gradlew.bat tasks --all
```

Deploy only this client extension:

```powershell
.\gradlew.bat client-extensions:my-react-app:deploy
```

Build the React app only:

```powershell
cd client-extensions\my-react-app
npm run build
```

Check deployed client extensions:

```powershell
Get-ChildItem "C:\Deepanshu\New Setup Liferay\Server\liferay-dxp\osgi\client-extensions"
```
