# ddc-source-slash-commands

Slash command completion for ddc.vim.

Type `/` at line start or after space to complete Claude Code slash commands.

## Features

- Completion triggers when `/` is at line start or after a space
- Prevents unwanted completion in file paths
- Supports hyphenated command names
- Works with both prefix and fuzzy matching

## Installation

Using dein.vim

```vim
call dein#add('vim-denops/denops.vim')
call dein#add('Shougo/ddc.vim')
call dein#add('Shougo/ddc-matcher_head')  " or tani/ddc-fuzzy for fuzzy matching
call dein#add('i9wa4/ddc-source-slash-commands')
```

Using lazy.nvim

```lua
{
  'i9wa4/ddc-source-slash-commands',
  dependencies = {
    'vim-denops/denops.vim',
    'Shougo/ddc.vim',
    'Shougo/ddc-matcher_head',  -- or tani/ddc-fuzzy for fuzzy matching
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
  \   'isVolatile': v:true,
  \   'forceCompletionPattern': '\/[a-zA-Z0-9_-]*',
  \ }})
```

For fuzzy matching, change `matchers` to `matcher_fuzzy`.

See `:help ddc-source-slash-commands` for more options.

## License

MIT License
