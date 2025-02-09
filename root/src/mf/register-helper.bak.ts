type Instance = {
  mount: () => void;
  update: () => void;
  unmount: () => void;
};

type Loader = () => Promise<Instance>;
type RouteMatcher = (path: string) => boolean;

interface IApplication {
  name: string;
  loader: Loader;
  routeMatch: RouteMatcher;
  instance: Instance | null;
}

const applications: IApplication[] = [];

function registerApp(app: IApplication) {
  applications.push(app);
}

function render() {
  const path = window.location.hash.replace("#", "") || "/";

  applications.forEach(async (app) => {
    if (app.routeMatch(path)) {
      if (!app.instance) {
        app.instance = await app.loader();
        app.instance.mount();
      }
    } else {
      if (app.instance) {
        app.instance.unmount();
        app.instance = null;
      }
    }
  });
}

function start() {
  window.addEventListener("hashchange", render);
  render();
}

export { registerApp, start, type IApplication };
