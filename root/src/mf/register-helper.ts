type Instance = {
  mount: () => void;
  update: () => void;
  unmount: () => void;
};

type IApplication = {
  name: string;
  instance?: Instance | null;
};

class ApplicationRegister {
  private applications: IApplication[] = [];

  registerApplication(app: IApplication) {
    this.applications.push(app);
  }

  async loadRemoteApplication(app: IApplication): Promise<Instance> {
    try {
      const module = await import(/* @vite-ignore */ app.name);
      if (!module.mount || !module.unmount) {
        throw new Error("Invalid remote application");
      }
      return module;
    } catch (error) {
      console.error(error);
      return { mount: () => {}, update: () => {}, unmount: () => {} };
    }
  }

  render() {
    this.applications.forEach(async (app) => {
      if (!app.instance) {
        app.instance = await this.loadRemoteApplication(app);
        app.instance.mount();
      }
    });
  }

  start() {
    this.render();
  }
}

export default ApplicationRegister;
