import {
  BaseSource,
  type GatherArguments,
  type OnCompleteDoneArguments,
} from "jsr:@shougo/ddc-vim@9.5.0/source";
import type { Item } from "jsr:@shougo/ddc-vim@9.5.0/types";
import { basename, join } from "jsr:@std/path@^1.0.8";
import { exists } from "jsr:@std/fs@^1.0.8";

type Params = {
  commandsDir: string;
  extensions: string[];
};

export class Source extends BaseSource<Params> {
  override getCompletePosition(args: GatherArguments<Params>): Promise<number> {
    // Find the position of / at the beginning or after a space
    const slashMatch = args.context.input.match(/(^|\s)(\/[a-zA-Z0-9_-]*)$/);
    if (!slashMatch) {
      return Promise.resolve(-1);
    }

    // Return the position of / (accounting for leading space if present)
    const leadingLength = slashMatch[1].length;
    return Promise.resolve(args.context.input.length - slashMatch[2].length);
  }

  override async gather({
    denops,
    context,
    sourceParams,
  }: GatherArguments<Params>): Promise<Item[]> {
    const params = sourceParams as Params;

    // Check if input contains / at the beginning or after a space
    // Pattern: (start of line OR space) followed by / and optional word characters
    const slashMatch = context.input.match(/(^|\s)(\/[a-zA-Z0-9_-]*)$/);
    if (!slashMatch) {
      return [];
    }

    // Expand ~ to home directory
    const homeDir = (await denops.call("expand", "~")) as string;
    const commandsDir = params.commandsDir.replace(/^~/, homeDir);

    // Check if directory exists
    if (!(await exists(commandsDir))) {
      return [];
    }

    // Get file list
    const items: Item[] = [];
    try {
      for await (const entry of Deno.readDir(commandsDir)) {
        if (!entry.isFile) continue;

        const fileName = entry.name;
        const ext = fileName.substring(fileName.lastIndexOf("."));

        // Check if file has target extension
        if (params.extensions.includes(ext)) {
          const commandName = basename(fileName, ext);
          const word = "/" + commandName;
          items.push({ word });
        }
      }
    } catch (_e) {
      // Return empty array if directory reading fails
      return [];
    }

    return items;
  }

  override params(): Params {
    return {
      commandsDir: "~/.config/claude/commands",
      extensions: [".md"],
    };
  }
}
