# ddc-source-slash-commands

Slash command (custom prompt) completion source for ddc.vim

## Overview

This plugin provides completion for Claude Code slash commands (also known as "custom prompts" in Codex CLI) in ddc.vim.

When you type `/` in your buffer, it will suggest available slash commands from your commands directory.

## Requirements

- Vim/Neovim with denops.vim
- ddc.vim

## Installation

Using dein.vim

```vim
call dein#add('vim-denops/denops.vim')
call dein#add('Shougo/ddc.vim')
call dein#add('i9wa4/ddc-source-slash-commands')
```

Using lazy.nvim

```lua
{
  'i9wa4/ddc-source-slash-commands',
  dependencies = {
    'vim-denops/denops.vim',
    'Shougo/ddc.vim',
  },
}
```

## Configuration

Basic setup

```vim
call ddc#custom#patch_global('sources', ['slash_commands'])

call ddc#custom#patch_global('sourceOptions', {
  \ 'slash_commands': {
  \   'mark': '[cmd]',
  \   'matchers': ['matcher_head'],
  \   'minAutoCompleteLength': 1,
  \ }})
```

With custom parameters

```vim
call ddc#custom#patch_global('sourceParams', {
  \ 'slash_commands': {
  \   'commandsDir': '~/ghq/github.com/i9wa4/dotfiles/dot.config/claude/commands',
  \   'extensions': ['.md'],
  \ }})
```

## Parameters

- `commandsDir`
    - Default: `~/.config/claude/commands`
    - Directory path containing slash command files
- `extensions`
    - Default: `[".md"]`
    - File extensions to include in completion

## How it works

1. When you type `/` in your buffer, the plugin activates
2. It reads all files from `commandsDir` with specified extensions
3. File names (without extensions) are converted to slash commands
4. For example, `CONTRIBUTING.md` becomes `/CONTRIBUTING`

## License

MIT License
