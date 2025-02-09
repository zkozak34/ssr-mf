import { type App, type Component, type CreateAppFunction } from "vue";

type EntryVueOptions = {
  name: string;
  createApp: CreateAppFunction<Element>;
  component: Component;
  domElement: HTMLElement | string;
  instanceModifier: (instance: App) => void;
};

class EntryVue {
  private readonly name: string;
  private readonly createApp: CreateAppFunction<Element>;
  private readonly component: Component;
  private domElement: HTMLElement | string;
  private readonly instanceModifier: (instance: App) => void;
  private instance: App | null = null;

  constructor(options: EntryVueOptions) {
    this.name = options.name;
    this.createApp = options.createApp;
    this.component = options.component;
    this.domElement = options.domElement;
    this.instanceModifier = options.instanceModifier;
  }

  public mount(): App {
    if (typeof this.domElement === "string") {
      this.domElement = document.querySelector(this.domElement) as HTMLElement;
      if (!this.domElement) {
        throw new Error(
          `Element for ${this.name} with selector "${this.domElement}" not found`
        );
      }
    }
    this.instance = this.createApp(this.component);
    this.instanceModifier(this.instance);
    return this.instance;
  }

  public update() {
    if (this.instance) {
      this.instance.unmount();
      this.instance = this.mount();
    }
  }

  public unmount() {
    if (this.instance) {
      this.instance.unmount();
      this.instance = null;
    }
    if (this.domElement && this.domElement instanceof HTMLElement) {
      this.domElement.innerHTML = "";
    }
  }
}

export default EntryVue;
