import { registerApplication, start } from "single-spa";
import apps from "./apps.json"

apps.forEach(app => {
  let entryPointUrl = app.host + app.filename;

  registerApplication(app.name,() => System.import(entryPointUrl),isRoute(app.route),  {
    name: app.name,
    host: app.host,
    route: app.route,
  } )
})

start({urlRerouteOnly: true});

function isRoute(route) {
  let regex = new RegExp(route);
  return () => regex.test(location.pathname);
}
