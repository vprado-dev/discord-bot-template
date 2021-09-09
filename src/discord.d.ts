import { Collection } from "discord.js";

declare module "discord.js" {
  export interface Command {
    execute: (interaction: Interaction) => Promise<any>; // Can be `Promise<SomeType>` if using async
    command: {
      name: string;
      category: string;
      description: string;
    };
  }
  export interface Client {
    commands: Collection<unknown, Command>;
  }
}
