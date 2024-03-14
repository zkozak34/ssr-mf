import { registerApplication, start } from "single-spa";
import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
console.log(routes);
